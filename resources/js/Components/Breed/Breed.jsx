import { fetchHelper, showSWToDelete } from '../../utils/utils';
import { toast } from 'react-toastify';
import Spinner from '../presentational/Spinner';
import ToastifyErrorList from '../ToastifyErrorList';

export default function Breed({ breedI, setBreed, setOption, setOpenModal, setHelper, setMustLoad, setMustAnimate, setIsDeleted }) {

  const handleDelete = () => {
    showSWToDelete('¿Quieres eliminar esta raza?', () => {
      setIsDeleted(true)
      setMustAnimate(false)
      const loadingToastId = toast(<Spinner message={`Eliminando a ${breedI.name}`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', '/breeds/destroy', { id: breedI.id })
        .then((data) => {
          setMustLoad(false)
          if (data.errors) {
            return toast.update(loadingToastId, { render: <><ToastifyErrorList data={data.errors} /></>, type: toast.TYPE.ERROR, autoClose: 3000, hideProgressBar: false, })
          }
          if (data.message) {
            setIsDeleted(false)
            return toast.update(loadingToastId, { render: <>{data.message}</>, type: toast.TYPE.INFO, autoClose: 3000, hideProgressBar: false })
          }
          toast.update(loadingToastId, { render: `Raza ${breedI.name} ha sido eliminado.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
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
        <img src='/image/breed.svg' alt={breedI.name} className='h-20 mx-auto' />
        <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center'>Nombre: {breedI.name}</div>
      </div>
      <div className='my-3 flex justify-center gap-2'>
        <button className='bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400'
          onClick={() => {
            setOption('Actualizar')
            setOpenModal(true)
            setBreed(breedI)
          }}
        >Editar</button>
        <button className='bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500'
          onClick={handleDelete}
        >Eliminar</button>
      </div>
    </div>
  )
}
