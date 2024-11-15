import { fetchHelper, formatId, showSWToDelete } from '../../utils/utils';
import { toast } from 'react-toastify';
import Spinner from '../presentational/Spinner';
import ToastifyErrorList from '../ToastifyErrorList';
import ButtonStatus from '../ButtonStatus';

export default function Service({ serviceI, setService, setOption, setOpenModal, setHelper, setMustLoad, setMustAnimate, rol, setIsDeleted }) {

  const handleDelete = () => {
    showSWToDelete('¿Quieres eliminar este servicio?', () => {
      setIsDeleted(true)
      setMustAnimate(false)
      const loadingToastId = toast(<Spinner message={`Eliminando a ${serviceI.name}`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', '/services/destroy', { id: serviceI.id })
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
          toast.update(loadingToastId, { render: `Servicio ${serviceI.name} ha sido eliminado.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
          setHelper((prev) => prev + 1)
        })
        .catch((err) => {
          setIsDeleted(false)
          toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
        })
    })
  }

  return (
    <section className={`${(!serviceI.isActive) && 'bg-gray-300'}`}>
      <div className={`flex flex-wrap flex-col lg:flex-row my-3 p-2 md:p-0 md:px-5`}>
        {
          rol == 1
          &&
          <ButtonStatus isActive={serviceI.isActive} id={serviceI.id} name={serviceI.name} model={'services'} setHelper={setHelper} setMustLoad={setMustLoad} css={'bottom-2 right-2'} />
        }
        <p className='uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center md:text-start md:w-5/12 m-auto'>Nombre: {serviceI.name}</p>
        <p className='text-gray-900 font-semibold text-center m-auto'>Código: {formatId('S', serviceI.id)}</p>
        <p className='text-gray-900 font-semibold text-center m-auto'>Precio: S/{serviceI.price}</p>
        {
          rol == 1
          &&
          <div className='flex justify-center items-center gap-2 lg:me-10'>
            <button className='bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400'
              onClick={() => {
                setOption('Actualizar')
                setOpenModal(true)
                setService(serviceI)
              }}
            >Editar</button>
            <button className='bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500'
              onClick={handleDelete}
            >Eliminar</button>
          </div>
        }
      </div>
    </section>
  )
}
