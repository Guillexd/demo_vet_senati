import { dateCalculator, fetchHelper, getLocaleDate, getStringTime, showSWToDelete } from '../../utils/utils';
import { toast } from 'react-toastify';
import Spinner from '../presentational/Spinner';
import ToastifyErrorList from '../ToastifyErrorList';
import Icon from '../../utils/Icon';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

export default function PetHistory({ petHistoryI, setPetHistory, setOption, setOpenModal, setHelper, setMustLoad, setMustAnimate, setOpenImage, setImage, setIsDeleted }) {

  const handleDelete = () => {
    showSWToDelete('¿Quieres eliminar este historial?', () => {
      setIsDeleted(true)
      setMustAnimate(false)
      const loadingToastId = toast(<Spinner message={`Eliminando el historial de ${petHistoryI.pet?.name}`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', '/pet_histories/destroy', { id: petHistoryI.id })
        .then((data) => {
          setMustLoad(false)
          if (data.errors) {
            return toast.update(loadingToastId, { render: <><ToastifyErrorList data={data.errors} /></>, type: toast.TYPE.ERROR, autoClose: 3000, hideProgressBar: false, })
          }
          if (data.message) {
            setIsDeleted(false)
            return toast.update(loadingToastId, { render: <>{data.message}</>, type: toast.TYPE.INFO, autoClose: 3000, hideProgressBar: false })
          }
          toast.update(loadingToastId, { render: `Historial de ${petHistoryI.pet?.name} ha sido eliminado.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
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
      <img className='w-full h-60 object-cover' src={petHistoryI?.pet?.pet_image_url || '/image/mascota.webp'} alt={petHistoryI?.pet?.name} onClick={() => {
        setImage({
          url: petHistoryI?.pet?.pet_image_url || '/image/mascota.webp',
          label: petHistoryI?.pet?.name
        })
        setOpenImage(true)
      }} />
      <div className='px-8 pt-5 flex flex-col justify-between overflow-hidden flex-1'>
        <div>
          <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>Nombre: {petHistoryI.pet?.name}</div>
          <p className='text-gray-900 font-semibold'>Edad: {petHistoryI.pet?.age}</p>
          <p className='text-gray-900 font-semibold'>Raza: {petHistoryI.pet?.breed?.name}</p>
          <p className='text-gray-900 font-semibold'>Sexo: {petHistoryI.pet?.sex}</p>
          <p className='text-gray-900 font-semibold'>C/E: {petHistoryI.pet?.ce}</p>
          <p className='text-gray-700'>Desparasitación: <br /> {petHistoryI.last_deworming ? getStringTime(petHistoryI.last_deworming) : ''}</p>

          <p className='mt-2 text-gray-700'>Dueño: {petHistoryI.pet?.customer?.name} <br />  {petHistoryI.pet?.customer?.identity_document?.abbreviation}: {petHistoryI.pet?.customer?.document_number}</p>
          {
            petHistoryI.pet?.customer?.first_phone
              &&
              <div className='mt-2'>
                <p className='text-gray-700'>1º teléfono:
                  <a href={`https://api.whatsapp.com/send/?phone=${petHistoryI.pet?.customer?.first_phone}&text=Hola,%20¿cómo%20estás%20${petHistoryI.pet?.customer?.name}?&type=phone_number&app_absent=0`} target='_blank' className='font-bold bg-emerald-300 p-1 rounded-md hover:bg-green-400'>
                    <Icon icon={faWhatsapp} css='mr-1' size='22px' />
                    {petHistoryI.pet?.customer?.first_phone}
                  </a>
                </p>
              </div>
          }
          {
            petHistoryI.pet?.customer?.second_phone
              &&
              <div className='mt-2'>
                <p className='text-gray-700'>2º teléfono:
                  <a href={`https://api.whatsapp.com/send/?phone=${petHistoryI.pet?.customer?.second_phone}&text=Hola,%20¿cómo%20estás%20${petHistoryI.pet?.customer?.name}?&type=phone_number&app_absent=0`} target='_blank' className='font-bold bg-emerald-300 p-1 rounded-md hover:bg-green-400'>
                    <Icon icon={faWhatsapp} css='mr-1' size='22px' />
                    {petHistoryI.pet?.customer?.second_phone}
                  </a>
                </p>
              </div>
          }

          <p className='text-gray-700 mt-1'>Fecha: {getLocaleDate(petHistoryI.created_at)}</p>
          <p className='text-gray-600 font-medium'>Agregado {dateCalculator(petHistoryI.created_at)}</p>
          <div className='mt-3'>
            <a href={`/pet_histories/get_plan_pdf?id=${petHistoryI.id}`} target='_blank' className='bg-indigo-500 text-white font-semibold px-3 py-2 rounded-lg hover:bg-indigo-700 flex items-center'>
              Ver plan de tratamiento
              <Icon icon={faFilePdf} css={'ms-2'} size='26px' />
            </a>
          </div>
        </div>
        <div className='my-3 flex gap-2'>
          <button id={`btn-history-${petHistoryI.id}`} className='bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400'
            onClick={() => {
              setOption('Actualizar')
              setOpenModal(true)
              setPetHistory(petHistoryI)
            }}
          >Ver (Editar)</button>
          <button className='bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500'
            onClick={handleDelete}
          >Eliminar</button>
        </div>
      </div>
    </>
  )
}
