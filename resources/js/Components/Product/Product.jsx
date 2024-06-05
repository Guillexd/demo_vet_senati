import { dateCalculator, fetchHelper, formatId, getLocaleDate, getStringDate, showSWToDelete } from '../../utils/utils';
import { toast } from 'react-toastify';
import Spinner from '../presentational/Spinner';
import ToastifyErrorList from '../ToastifyErrorList';
import { useState } from 'react';
import { flushSync } from 'react-dom';

export default function Product({ productI, setProduct, setOption, setOpenModal, setHelper, setMustLoad, setMustAnimate, setImage, transitionName, setTransitionName, setIsDeleted }) {

  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    showSWToDelete('¿Quieres eliminar este producto?', () => {
      setIsDeleted(true)
      setMustAnimate(false)
      const loadingToastId = toast(<Spinner message={`Eliminando a ${productI.name}`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', '/products/destroy', { id: productI.id })
        .then((data) => {
          setMustLoad(false)
          if (data.errors) {
            setIsDeleted(false)
            return toast.update(loadingToastId, { render: <><ToastifyErrorList data={data.errors} /></>, type: toast.TYPE.ERROR, autoClose: 3000, hideProgressBar: false, })
          }
          if (data.message) {
            setIsDeleted(false)
            return toast.update(loadingToastId, { render: <>{data.message}</>, type: toast.TYPE.INFO, autoClose: 3000, hideProgressBar: false })
          }
          toast.update(loadingToastId, { render: `Producto ${productI.name} ha sido eliminado.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
          setHelper((prev) => prev + 1)
        })
        .catch((err) => {
          setIsDeleted(false)
          toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
        })
    })
  }

  return (
    <>
      <img className='w-full h-60 object-cover' src={productI.product_image_url} alt={productI.name}
        onClick={() => {
          if (document.startViewTransition) {
            document.startViewTransition(() => {
              flushSync(() => {
                setTransitionName(`${productI.name}-${productI.id}`)
                setImage({
                  url: productI.product_image_url,
                  label: productI.name,
                })
              })
            });
          } else {
            flushSync(() => {
              setTransitionName(`${productI.name}-${productI.id}`)
              setImage({
                url: productI.product_image_url,
                label: productI.name,
              })
            })
          }
        }}
        style={{ viewTransitionName: !transitionName && `${productI.name}-${productI.id}` }}
      />
      <div className='px-8 pt-5 flex flex-col justify-between flex-1'>
        <div>
          <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>Nombre: {productI.name}</div>
          <p className='text-gray-900 font-semibold'>Precio: S/. {productI.price}</p>
          <p className='text-gray-900 font-semibold'>Stock: {productI.stock} u.</p>
          <p className='text-gray-900 font-semibold'>Código: {formatId('P', productI.id)}</p>
          {
            productI.serie && (
              <p className='text-gray-900 font-semibold'>Serie: {productI.serie}</p>
            )
          }
          <p className='mt-2 text-gray-700'>Precio de compra: S/. {productI.purchase_price}</p>
          <p className='text-gray-700'>Utilidad: S/. {productI.utility}</p>
          <p className='text-gray-900'>
            Fecha de vencimiento: {productI.due_date ? (
              <>
                <br />
                {getStringDate(productI.due_date)}
              </>
            ) : '--'}
          </p>

          <p className='my-1 text-gray-700'>Fecha: {getLocaleDate(productI.created_at)}</p>
          {
            productI.description?.length > 50
              ?
              <div>
                <button className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-1 rounded-lg'
                  onClick={() => setOpen(true)}
                >
                  Descripción
                </button>
                <article className={`${open ? '-translate-y-0' : 'translate-y-full'} z-10 ease-in duration-150 absolute flex top-0 left-0 w-full h-full bg-vetgreen-100 text-black font-medium rounded-lg`}>
                  <button className='fixed bg-red-900 text-white font-semibold px-3 py-1 rounded-lg top-1 right-0 me-5 mt-1 animate-bounce'
                    onClick={() => setOpen(false)}
                  >
                    Cerrar
                  </button>
                  <p className='overflow-auto p-3 pt-10'>{productI.description}</p>
                </article>
              </div>
              :
              <p className='text-gray-700 font-semibold'> <strong>Descripción:</strong> {productI.description || '---'}</p>
          }
        </div>
        <div className='my-3 flex gap-2 pb-4'>
          <button className='bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400'
            onClick={() => {
              setOption('Actualizar')
              setOpenModal(true)
              setProduct(productI)
            }}
          >Editar</button>
          <button className='bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500'
            onClick={handleDelete}
          >Eliminar</button>
        </div>
        <p className='text-gray-600 font-medium text-sm absolute bottom-1 right-6'>Agregado {dateCalculator(productI.created_at)}</p>
      </div></>
  )
}
