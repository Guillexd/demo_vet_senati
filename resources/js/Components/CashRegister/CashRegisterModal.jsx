import { useEffect, useReducer, useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { fetchHelper } from '../../utils/utils';
import ToastifyErrorList from '../ToastifyErrorList';
import Spinner from '../presentational/Spinner';
import { faCashRegister } from '@fortawesome/free-solid-svg-icons'

const REDUCER_ACTION_TYPE = {
  id: 'MODIFY_ID',
  initial_amount: 'MODIFY_INITIAL_AMOUNT',
}

function reducer(state, action) {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.id:
      return { ...state, id: action.payload }
      break;
    case REDUCER_ACTION_TYPE.initial_amount:
      return { ...state, initial_amount: action.payload }
      break;
    default:
      return state;
  }
}

export default function CashRegisterModal({ cashRegister, option, open, setOpen, setMustLoad, setHelper }) {

  const options = {
    method: option === 'Crear' ? 'POST' : 'PUT',
    url: !(option === 'Actualizar') ? '/cash_registers/store' : '/cash_registers/update',
    sucessMessage: option === 'Crear' ? 'Caja agregada' : 'Caja actualizada',
    loadingMessage: !(option === 'Actualizar') ? 'Agregando caja' : 'Actualizando caja',
  }

  const [state, dispatch] = useReducer(reducer, cashRegister)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    const loadingToastId = toast(<Spinner message={options.loadingMessage} />, { autoClose: 10000, hideProgressBar: true, });

    fetchHelper(options.method, options.url, state)
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
    for (const key in REDUCER_ACTION_TYPE) {
      const actionType = REDUCER_ACTION_TYPE[key]
      const payload = cashRegister.hasOwnProperty(key) ? cashRegister[key] : ''
      dispatch({
        type: actionType,
        payload: payload,
      })
    }
  }, [cashRegister])

  return (
    <>
      <Modal option={option} open={open} setOpen={setOpen} isLoading={isLoading} handleSubmit={handleSubmit} icon={faCashRegister} text={'Caja'}>
        <div className='relative border rounded w-full col-span-full order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            placeholder='Email address'
            value={state.initial_amount}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.initial_amount,
                payload: e.target.value
              })
            }}
            required autoFocus />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Monto inicial
          </label>
        </div>
      </Modal>
      <Modal.ToastifyModal />
    </>
  )
}
