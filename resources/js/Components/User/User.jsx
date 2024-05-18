import { dateCalculator, fetchHelper, getLocaleDate, showSWToDelete } from '../../utils/utils';
import { toast } from 'react-toastify';
import Spinner from '../presentational/Spinner';
import ToastifyErrorList from '../ToastifyErrorList';

export default function User({ userI, setUser, setOption, setOpenModal, setHelper, setMustLoad, setMustAnimate, setIsDeleted }) {

  const handleDelete = () => {
    showSWToDelete('¿Quieres eliminar este usuario?', () => {
      setIsDeleted(true)
      setMustAnimate(false)
      const loadingToastId = toast(<Spinner message={`Eliminando a ${userI.name}`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', '/users/destroy', { id: userI.id })
        .then((data) => {
          setMustLoad(false)
          if (data.errors) {
            setIsDeleted(false)
            return toast.update(loadingToastId, { render: <><ToastifyErrorList data={data.errors} /></>, type: toast.TYPE.ERROR, autoClose: 3000, hideProgressBar: false, })
          }
          toast.update(loadingToastId, { render: `Usuario ${userI.name} ha sido eliminado.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
          setHelper((prev) => prev + 1)
        })
        .catch((err) => {
          toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
        })
    })
  }

  return (
    <div className='px-8 pt-5 flex flex-col justify-between flex-1'>
      <div>
        <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>Nombre: {userI.name}</div>
        <p className='text-gray-900 font-semibold'>Rol: {userI.rol.name}</p>
        <p className='mt-2 text-gray-700'>Correo: {userI.email}</p>
        <p className='text-gray-700'>DNI: {userI.dni}</p>
        <p className='text-gray-700'>Teléfono: {userI.phone}</p>
        <p className='text-gray-700'>Dirección: {userI.direction}</p>
        <p className='text-gray-700'>Fecha: { getLocaleDate(userI.created_at) }</p>
        <p className='text-gray-900'>{ dateCalculator(userI.created_at) }</p>
      </div>
      <div className='my-3 flex gap-2'>
        <button className='bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400'
          onClick={() => {
            setOption('Actualizar')
            setOpenModal(true)
            setUser(userI)
          }}
        >Editar</button>
        <button className='bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500'
          onClick={handleDelete}
        >Eliminar</button>
      </div>
    </div>
  )
}


{/* <div className='lg:flex-shrink-0 lg:h-full'>
        <img className='lg:h-full w-full object-cover lg:w-48 blur-sm' src='https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1' alt='Imagen de ejemplo' />
      </div>
      <div className='px-8 pt-5 flex flex-col justify-between'>
        <div>
          <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>Nombre: {userI.name}</div>
          <p className='text-gray-500'>Rol: {userI.rol.name}</p>
          <p className='mt-2 text-gray-400'>Correo: {userI.email}</p>
          <p className='text-gray-400'>DNI: {userI.dni}</p>
          <p className='text-gray-400'>Teléfono: {userI.phone}</p>
          <p className='text-gray-400'>Dirección: {userI.direction}</p>
        </div>
        <div className='mb-3 self-end flex gap-2'>
          <button className='bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400'
            onClick={() => {
              setOption('Actualizar')
              setOpenModal(true)
              setUser(userI)
            }}
          >Editar</button>
          <button className='bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500'
            onClick={handleDelete}
          >Eliminar</button>
        </div>
      </div> */}