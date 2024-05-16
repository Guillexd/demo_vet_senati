import { useEffect, useReducer, useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { fetchHelper } from '../../utils/utils';
import ToastifyErrorList from '../ToastifyErrorList';
import Spinner from '../presentational/Spinner';
import { faBone } from '@fortawesome/free-solid-svg-icons'

const REDUCER_ACTION_TYPE = {
  id: 'MODIFY_ID',
  name: 'MODIFY_NAME',
  price: 'MODIFY_PRICE',
  purchase_price: 'MODIFY_PURCHASE_PRICE',
  stock: 'MODIFY_STOCK',
  utility: 'MODIFY_UTILITY',
  serie: 'MODIFY_SERIE',
  product_image: 'MODIFY_PRODUCT_IMAGE',
  description: 'MODIFY_DESCRIPTION',
  due_date: 'MODIFY_DUE_DATE',
}

function reducer(state, action) {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.id:
      return { ...state, id: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.name:
      return { ...state, name: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.price:
      return { ...state, price: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.purchase_price:
      return { ...state, purchase_price: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.stock:
      return { ...state, stock: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.utility:
      return { ...state, utility: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.serie:
      return { ...state, serie: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.product_image:
      return { ...state, product_image: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.description:
      return { ...state, description: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.due_date:
      return { ...state, due_date: action.payload || '' }
      break;
    default:
      return state;
  }
}

export default function ProductModal({ product, option, open, setOpen, setMustLoad, setHelper }) {

  const options = {
    method: option === 'Crear' ? 'POST' : 'POST',
    url: !(option === 'Actualizar') ? '/products/store' : '/products/update',
    sucessMessage: option === 'Crear' ? 'Producto agregado' : 'Producto actualizado',
    loadingMessage: !(option === 'Actualizar') ? 'Agregando producto' : 'Actualizando producto',
  }

  const [state, dispatch] = useReducer(reducer, product)
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    const loadingToastId = toast(<Spinner message={options.loadingMessage} />, { autoClose: 30000, hideProgressBar: true, });

    fetchHelper(options.method, options.url, state, true)
      .then((data) => {
        if (data.errors) {
          return toast.update(loadingToastId, { render: <><ToastifyErrorList data={data.errors} /></>, type: toast.TYPE.ERROR, autoClose: 3000, hideProgressBar: false, })
        }
        if (data.message) {
          return toast.update(loadingToastId, { render: <>{data.message}</>, type: toast.TYPE.INFO, autoClose: 3000, hideProgressBar: false })
        }
        toast.update(loadingToastId, { render: options.sucessMessage, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
        setMustLoad(false)
        setHelper((prev) => prev + 1)
        setOpen(false)
      })
      .catch((err) => {
        console.log(err);
        toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    const productImageInput = document.getElementById('product_image')
    productImageInput.value = ''
    for (const key in REDUCER_ACTION_TYPE) {
      const actionType = REDUCER_ACTION_TYPE[key]
      const payload = product.hasOwnProperty(key) ? product[key] : ''
      dispatch({
        type: actionType,
        payload: payload,
      })
    }
  }, [product])

  useEffect(() => {
    if (Number(state.price) && Number(state.purchase_price)) {
      dispatch({
        type: 'MODIFY_UTILITY',
        payload: (parseFloat(state.price) - parseFloat(state.purchase_price)).toFixed(2),
      })
    }
  }, [state.price, state.purchase_price])

  return (
    <>
      <Modal option={option} open={open} setOpen={setOpen} isLoading={isLoading} handleSubmit={handleSubmit} icon={faBone} text={'Producto'}>
        <div className='relative border rounded w-full col-span-1 order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.name}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.name,
                payload: e.target.value
              })
            }}
            required autoFocus />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Nombre
          </label>
        </div>

        <div className='relative border rounded w-full col-span-1 order-1'>
          <input
            type='number'
            min={0}
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.stock}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.stock,
                payload: e.target.value
              })
            }}
            required />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Stock
          </label>
        </div>

        <div className='w-full col-span-full order-1 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-x-6'>
          <div className='relative border rounded w-full order-1'>
            <input
              type='number'
              step='any'
              min={0}
              className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
              value={state.price}
              onChange={(e) => {
                dispatch({
                  type: REDUCER_ACTION_TYPE.price,
                  payload: e.target.value
                })
              }}
              required />
            <label
              className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
            >
              Precio
            </label>
          </div>

          <div className='relative border rounded w-full order-1'>
            <input
              type='number'
              step='any'
              min={0}
              className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
              value={state.purchase_price}
              onChange={(e) => {
                dispatch({
                  type: REDUCER_ACTION_TYPE.purchase_price,
                  payload: e.target.value
                })
              }}
              required />
            <label
              className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
            >
              Precio de compra
            </label>
          </div>

          <div className='relative border rounded w-full order-1'>
            <input
              type='number'
              step='any'
              min={0}
              className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
              value={state.utility}
              onChange={(e) => {
                dispatch({
                  type: REDUCER_ACTION_TYPE.utility,
                  payload: e.target.value
                })
              }}
              required />
            <label
              className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
            >
              Utilidad
            </label>
          </div>
        </div>

        <div className='relative border rounded w-full col-span-full order-1'>
          <input type='file' className='hidden' id='product_image' accept='image/*'
            onChange={(e) => {
              const file = e.target.files && e.target.files[0]
              dispatch({
                type: REDUCER_ACTION_TYPE.product_image,
                payload: file
              })
            }}
          />
          <label htmlFor='product_image' className='cursor-pointer block w-full py-2 text-center text-white bg-gray-800 rounded transition duration-200 ease-in-out hover:bg-gray-600'>
            --- Seleccionar foto (opcional) ---
          </label>
        </div>

        {
          state.product_image && (
            <img src={URL.createObjectURL(state.product_image)} alt='mascota' className='order-1 w-3/5 col-span-full mx-auto rounded-lg' />
          )
        }

        <div className='relative border rounded w-full order-1 col-span-full sm:col-span-1'>
          <input
            type='datetime-local'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.due_date}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.due_date,
                payload: e.target.value
              })
            }}
          />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Fecha de vencimiento (opcional)
          </label>
        </div>

        <div className='relative border rounded w-full col-span-full sm:col-span-1 order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.serie}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.serie,
                payload: e.target.value
              })
            }}
             />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Serie (opcional)
          </label>
        </div>

        <div className='relative border rounded w-full col-span-full order-1'>
          <textarea
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            rows='4'
            value={state.description}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.description,
                payload: e.target.value
              })
            }}
          ></textarea>
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Descripción (opcional)
          </label>
        </div>
      </Modal>
      <Modal.ToastifyModal />
    </>
  )
}
