import { useEffect, useReducer, useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { fetchHelper } from '../../utils/utils';
import ToastifyErrorList from '../ToastifyErrorList';
import Spinner from '../presentational/Spinner';
import { faEye, faEyeSlash, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../utils/Icon'

const REDUCER_ACTION_TYPE = {
  id: 'MODIFY_ID',
  name: 'MODIFY_NAME',
  email: 'MODIFY_EMAIL',
  rol_id: 'MODIFY_ROL',
  dni: 'MODIFY_DNI',
  phone: 'MODIFY_PHONE',
  direction: 'MODIFY_DIRECTION',
  password: 'MODIFY_PASSWORD',
  password_confirmation: 'MODIFY_PASSWORD_CONFIRMATION',
}

function reducer(state, action) {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.id:
      return { ...state, id: action.payload }
      break;
    case REDUCER_ACTION_TYPE.name:
      return { ...state, name: action.payload }
      break;
    case REDUCER_ACTION_TYPE.email:
      return { ...state, email: action.payload }
      break;
    case REDUCER_ACTION_TYPE.rol_id:
      return { ...state, rol_id: action.payload }
      break;
    case REDUCER_ACTION_TYPE.dni:
      return { ...state, dni: action.payload }
      break;
    case REDUCER_ACTION_TYPE.phone:
      return { ...state, phone: action.payload }
      break;
    case REDUCER_ACTION_TYPE.direction:
      return { ...state, direction: action.payload }
      break;
    case REDUCER_ACTION_TYPE.password:
      return { ...state, password: action.payload }
      break;
    case REDUCER_ACTION_TYPE.password_confirmation:
      return { ...state, password_confirmation: action.payload }
      break;
    default:
      return state;
  }
}

export default function UserModal({ user, option, open, setOpen, setMustLoad, setHelper }) {

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const options = {
    method: option === 'Crear' ? 'POST' : 'PUT',
    url: !(option === 'Actualizar') ? '/users/store' : '/users/update',
    sucessMessage: option === 'Crear' ? 'Usuario agregado' : 'Usuario actualizado',
    loadingMessage: !(option === 'Actualizar') ? 'Agregando usuario' : 'Actualizando usuario',
  }

  const [state, dispatch] = useReducer(reducer, user)
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

  const capitalizeFirstLetterOfEachWord = (sentence) => sentence ? sentence.split(' ').map(word => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '').join(' ') : '';

  useEffect(() => {
    for (const key in REDUCER_ACTION_TYPE) {
      const actionType = REDUCER_ACTION_TYPE[key]
      const payload = user.hasOwnProperty(key) ? user[key] : ''
      dispatch({
        type: actionType,
        payload: payload,
      })
    }
  }, [user])

  const setInfo = async () => {
    if (state.dni.length < 8) {
      return
    }

    let api = await axios.get(`/inquiry/dni?dni=${state.dni}`)

    if (api.data.original.hasOwnProperty('nombres')) {
      dispatch({
        type: REDUCER_ACTION_TYPE.name,
        payload: capitalizeFirstLetterOfEachWord(api.data.original.nombres) + ' ' + capitalizeFirstLetterOfEachWord(api.data.original.apellidoPaterno) + ' ' + capitalizeFirstLetterOfEachWord(api.data.original.apellidoMaterno)
      })
    } else {
      toast.error('DNI inválido o no encontrando', {
        autoClose: 1500
      })
    }
  }

  return (
    <>
      <Modal option={option} open={open} setOpen={setOpen} isLoading={isLoading} handleSubmit={handleSubmit} icon={faUser} text={'Usuario'}>
        <div className='relative border border-gray-600 rounded w-full order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-700 placeholder:text-gray-700 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.name}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.name,
                payload: e.target.value
              })
            }}
            required />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-700 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Nombre
          </label>
        </div>

        <div className='relative border border-gray-600 rounded w-full order-2'>
          <select
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-700 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.rol_id}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.rol_id,
                payload: e.target.value
              })
            }}
            required>
            <option value='1'>Administrador</option>
            <option value='2'>Empleado</option>
          </select>
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-700 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Rol del usuario
          </label>
        </div>

        <div className='relative border border-gray-600 rounded w-full order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-700 placeholder:text-gray-700 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.email}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.email,
                payload: e.target.value
              })
            }}
            required />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-700 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Correo electrónico
          </label>
        </div>

        <div className='relative border border-gray-600 rounded w-full'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-700 placeholder:text-gray-700 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.dni}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.dni,
                payload: e.target.value
              })
            }}
            required />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-700 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            DNI
          </label>
          <div className='absolute top-1 right-2 h-full cursor-pointer' onClick={setInfo}>
            <Icon icon={faMagnifyingGlass} css={'transition-all text-black hover:scale-125'} size='25px' />
          </div>
        </div>

        <div className='relative border border-gray-600 rounded w-full order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-700 placeholder:text-gray-700 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.phone}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.phone,
                payload: e.target.value
              })
            }}
            required />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-700 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Teléfono
          </label>
        </div>

        <div className='relative border border-gray-600 rounded w-full order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-700 placeholder:text-gray-700 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.direction}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.direction,
                payload: e.target.value
              })
            }}
            required />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-700 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Dirección
          </label>
        </div>

        {
          option != 'Actualizar' &&
          <>
            <div className='relative border border-gray-600 rounded w-full order-2'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-700 placeholder:text-gray-700 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                value={state.password}
                onChange={(e) => {
                  dispatch({
                    type: REDUCER_ACTION_TYPE.password,
                    payload: e.target.value
                  })
                }}
                required />
              <label
                className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-700 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
              >
                Contraseña
              </label>
              <div className='absolute top-1 right-2 hover:scale-125 cursor-pointer transition-all'
                onClick={() => setShowPassword(prev => !prev)}
              >
                <Icon icon={showPassword ? faEye : faEyeSlash} size='25px' css='text-gray-600' />
              </div>
            </div>

            <div className='relative border border-gray-600 rounded w-full order-2'>
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-700 placeholder:text-gray-700 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                value={state.password_confirmation}
                onChange={(e) => {
                  dispatch({
                    type: REDUCER_ACTION_TYPE.password_confirmation,
                    payload: e.target.value
                  })
                }}
                required />
              <label
                className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-700 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
              >
                Repetir contraseña
              </label>
              <div className='absolute top-1 right-2 hover:scale-125 cursor-pointer transition-all'
                onClick={() => setShowPasswordConfirm(prev => !prev)}
              >
                <Icon icon={showPasswordConfirm ? faEye : faEyeSlash} size='25px' css='text-gray-600' />
              </div>
            </div>
          </>
        }
      </Modal>
      <Modal.ToastifyModal />
    </>
  )
}
