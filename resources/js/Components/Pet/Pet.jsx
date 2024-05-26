import { dateCalculator, fetchHelper, getLocaleString, showSWToDelete } from '../../utils/utils';
import { toast } from 'react-toastify';
import Spinner from '../presentational/Spinner';
import ToastifyErrorList from '../ToastifyErrorList';
import { useState } from 'react';

export default function Pet({ petI, setPet, setOption, setOpenModal, setHelper, setMustLoad, setMustAnimate, setOpenImage, setImage, setIsDeleted }) {

  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    showSWToDelete('¿Quieres eliminar esta mascota?', () => {
      setIsDeleted(true)
      setMustAnimate(false)
      const loadingToastId = toast(<Spinner message={`Eliminando a ${petI.name}`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', '/pets/destroy', { id: petI.id })
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
          toast.update(loadingToastId, { render: `Mascota ${petI.name} ha sido eliminado.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
          setHelper((prev) => prev + 1)
        })
        .catch((err) => {
          toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
        })
    }, 'Se eliminarán los datos asociados a esta mascota como el historial de las mismas.')
  }

  return (
    <>
      <img className='w-full h-60 object-cover' src={petI.pet_image_url || '/image/mascota.webp'} alt={petI.name} onClick={() => {
        setImage({
          url: petI.pet_image_url || '/image/mascota.webp',
          label: petI.name
        })
        setOpenImage(true)
      }} />
      <div className='px-8 pt-5 flex flex-col justify-between flex-1'>
        <div>
          <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>Nombre: {petI.name}</div>
          <p className='text-gray-900 font-semibold'>Edad: {petI.age}</p>
          <p className='text-gray-900 font-semibold'>Raza: {petI.breed?.name}</p>
          <p className='text-gray-900 font-semibold'>Sexo: {petI.sex}</p>
          <p className='text-gray-900 font-semibold'>C/E: {petI.ce}</p>
          <p className='mt-2 text-gray-700'>Dueño: {petI.customer?.name} - {petI.customer?.identity_document?.abbreviation}: {petI.customer?.document_number}</p>
          <p className='text-gray-700'>Fecha: {getLocaleString(petI.created_at)}</p>
          <p className='text-gray-900'>{dateCalculator(petI.created_at)}</p>
          {
            petI.observations?.length > 50
              ?
              <div>
                <button className='bg-indigo-500 text-white font-semibold px-3 py-1 rounded-lg'
                  onClick={() => setOpen(true)}
                >
                  Observaciones
                </button>
                <article className={`${open ? '-translate-y-0' : 'translate-y-full'} ease-in duration-150 absolute flex top-0 left-0 w-full h-full bg-vetgreen-200 text-black font-medium rounded-lg`}>
                  <button className='fixed bg-red-900 text-white font-semibold px-3 py-1 rounded-lg top-1 right-0 me-5 mt-1 animate-bounce'
                    onClick={() => setOpen(false)}
                  >
                    Cerrar
                  </button>
                  <p className='overflow-auto p-3 pt-8'>{petI.observations}</p>
                </article>
              </div>
              :
              <p className='text-gray-700 font-semibold'> <strong>Observaciones:</strong> {petI.observations || '---'}</p>
          }
        </div>
        <div className='my-3 flex gap-2'>
          <button className='bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400'
            onClick={() => {
              setOption('Actualizar')
              setOpenModal(true)
              setPet(petI)
            }}
          >Editar</button>
          <button className='bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500'
            onClick={handleDelete}
          >Eliminar</button>
        </div>
      </div></>
  )
}
