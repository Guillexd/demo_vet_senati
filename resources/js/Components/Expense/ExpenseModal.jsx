import { useEffect, useReducer, useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { fetchHelper } from '../../utils/utils';
import ToastifyErrorList from '../ToastifyErrorList';
import Spinner from '../presentational/Spinner';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'

const REDUCER_ACTION_TYPE = {
  id: 'MODIFY_ID',
  reason: 'MODIFY_REASON',
}

function reducer(state, action) {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.id:
      return { ...state, id: action.payload }
      break;
    case REDUCER_ACTION_TYPE.reason:
      return { ...state, reason: action.payload }
      break;
    default:
      return state;
  }
}

export default function ExpenseModal({ expense, option, open, setOpen, setMustLoad, setHelper, actions = true, mustBeToast = true, onChangeComponent }) {

  const options = {
    method: option === 'Crear' ? 'POST' : 'PUT',
    url: !(option === 'Actualizar') ? '/expenses/store' : '/expenses/update',
    sucessMessage: option === 'Crear' ? 'Razón agregada' : 'Razón actualizada',
    loadingMessage: !(option === 'Actualizar') ? 'Agregando razón' : 'Actualizando razón',
  }

  const [state, dispatch] = useReducer(reducer, expense)
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
        toast.update(loadingToastId, { render: options.sucessMessage, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
        if (actions) {
          setMustLoad(false)
          setHelper((prev) => prev + 1)
        }
        setOpen(false)
        if (typeof onChangeComponent === 'function') {
          onChangeComponent(data);
        }
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
      const payload = expense.hasOwnProperty(key) ? expense[key] : ''
      dispatch({
        type: actionType,
        payload: payload,
      })
    }
  }, [expense])

  return (
    <>
      <Modal option={option} open={open} setOpen={setOpen} isLoading={isLoading} handleSubmit={handleSubmit} icon={faAnglesUp} text={'Razón'}>
        <div className='relative border border-gray-600 rounded w-full col-span-full order-1'>
          <textarea
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            rows='4'
            value={state.reason}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.reason,
                payload: e.target.value
              })
            }}
          ></textarea>
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Razón de egreso
          </label>
        </div>
      </Modal>
      {
        mustBeToast
        &&
        <Modal.ToastifyModal />
      }
    </>
  )
}
