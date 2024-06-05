import { useEffect, useReducer, useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { fetchData, fetchHelper } from '../../utils/utils';
import ToastifyErrorList from '../ToastifyErrorList';
import Spinner from '../presentational/Spinner';
import { faMagnifyingGlass, faPeopleRoof } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../utils/Icon';

const REDUCER_ACTION_TYPE = {
  id: 'MODIFY_ID',
  name: 'MODIFY_NAME',
  identity_document_id: 'MODIFY_IDENTITY_DOCUMENT_ID',
  document_number: 'MODIFY_DOCUMENT_NUMBER',
  first_phone: 'MODIFY_FIRST_PHONE',
  second_phone: 'MODIFY_SECOND_PHONE',
  direction: 'MODIFY_DIRECTION',
}

function reducer(state, action) {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.id:
      return { ...state, id: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.name:
      return { ...state, name: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.identity_document_id:
      return { ...state, identity_document_id: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.document_number:
      return { ...state, document_number: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.first_phone:
      return { ...state, first_phone: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.second_phone:
      return { ...state, second_phone: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.direction:
      return { ...state, direction: action.payload || '' }
      break;
    default:
      return state;
  }
}

export default function CustomerModal({ customer, option, open, setOpen, setMustLoad, setHelper, actions = true, mustBeToast = true }) {

  const options = {
    method: option === 'Crear' ? 'POST' : 'PUT',
    url: !(option === 'Actualizar') ? '/customers/store' : '/customers/update',
    sucessMessage: option === 'Crear' ? 'Cliente agregado' : 'Cliente actualizado',
    loadingMessage: !(option === 'Actualizar') ? 'Agregando cliente' : 'Actualizando cliente',
  }

  const [state, dispatch] = useReducer(reducer, customer)
  const [isLoading, setIsLoading] = useState(false)
  const [optionsDoc, setOptionsDoc] = useState([])

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
      })
      .catch((err) => {
        console.log(err);
        toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
      })
      .finally(() => setIsLoading(false))
  }

  const capitalizeFirstLetterOfEachWord = (sentence) => sentence ? sentence.split(' ').map(word => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '').join(' ') : '';

  useEffect(() => {
    (async () => {
      const info = await fetchData('/identity-documents/list')
      setOptionsDoc(info)
    })()
  }, [])

  useEffect(() => {
    for (const key in REDUCER_ACTION_TYPE) {
      const actionType = REDUCER_ACTION_TYPE[key]
      const payload = customer.hasOwnProperty(key) ? customer[key] : ''
      dispatch({
        type: actionType,
        payload: payload,
      })
    }
  }, [customer])

  const setInfo = async () => {
    if (state.document_number.length < 8 || state.document_number.length > 11) {
      return
    }
    let api
    if (state.identity_document_id == 1) {
      api = await axios.get(`/inquiry/dni?dni=${state.document_number}`)
    } else if (state.identity_document_id == 2) {
      api = await axios.get(`/inquiry/ruc?ruc=${state.document_number}`)
    }

    if (api.data.original.hasOwnProperty('razonSocial')) {
      dispatch({
        type: REDUCER_ACTION_TYPE.name,
        payload: api.data.original.razonSocial
      })
    } else if (api.data.original.hasOwnProperty('nombres')) {
      dispatch({
        type: REDUCER_ACTION_TYPE.name,
        payload: capitalizeFirstLetterOfEachWord(api.data.original.nombres) + ' ' + capitalizeFirstLetterOfEachWord(api.data.original.apellidoPaterno) + ' ' + capitalizeFirstLetterOfEachWord(api.data.original.apellidoMaterno)
      })
    } else {
      toast.error('DNI o RUC inválido o no encontrando', {
        autoClose: 1500
      })
    }
  }

  return (
    <>
      <Modal option={option} open={open} setOpen={setOpen} isLoading={isLoading} handleSubmit={handleSubmit} icon={faPeopleRoof} text={'Cliente'}>

        <div className='relative border border-gray-600 rounded w-full order-1'>
          <select
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.identity_document_id}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.identity_document_id,
                payload: e.target.value
              })
            }}
            required>
            <option value=''></option>
            {
              optionsDoc.map((el, i) => <option value={el.id} key={i}>{el.abbreviation}</option>)
            }
          </select>
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Tipo de documento (opcional)
          </label>
        </div>

        <div className='relative border border-gray-600 rounded w-full order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent pl-3 pr-10 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600 placeholder:text-gray-600 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.document_number}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.document_number,
                payload: e.target.value
              })
            }}
          />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Documento de identidad (opcional)
          </label>
          {
            state.identity_document_id == 1 || state.identity_document_id == 2
              ?
              <div className='absolute top-1 right-2 h-full cursor-pointer' onClick={setInfo}>
                <Icon icon={faMagnifyingGlass} css={'transition-all text-black hover:scale-125'} size='25px' />
              </div>
              :
              null
          }
        </div>

        <div className='relative border border-gray-600 rounded w-full col-span-full order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600 placeholder:text-gray-600 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.name}
            onClick={() => navigator?.clipboard?.writeText(state.name)}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.name,
                payload: e.target.value
              })
            }} />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Nombre (opcional)
          </label>
        </div>
        <div className='relative border border-gray-600 rounded w-full order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600 placeholder:text-gray-600 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.first_phone}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.first_phone,
                payload: e.target.value
              })
            }}
          />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Primer teléfono (opcional)
          </label>
        </div>

        <div className='relative border border-gray-600 rounded w-full order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600 placeholder:text-gray-600 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.second_phone}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.second_phone,
                payload: e.target.value
              })
            }}
          />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Segundo teléfono (opcional)
          </label>
        </div>

        <div className='relative border border-gray-600 rounded w-full order-1 sm:col-span-2'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600 placeholder:text-gray-600 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.direction}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.direction,
                payload: e.target.value
              })
            }}
          />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Dirección (opcional)
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
