import { dateCalculator, fetchHelper, getLocaleString, getStringTime, showSWToDelete } from '../../utils/utils';
import { toast } from 'react-toastify';
import Spinner from '../presentational/Spinner';
import ToastifyErrorList from '../ToastifyErrorList';
import Icon from '../../utils/Icon';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { flushSync } from 'react-dom';
import { useState } from 'react';

export default function PetHistory({ petHistoryI, setPetHistory, setOption, setOpenModal, setHelper, setMustLoad, setMustAnimate, setImage, transitionName, setTransitionName, hide, setIsDeleted }) {

  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    showSWToDelete('¿Quieres eliminar este historial?', () => {
      setIsDeleted(true)
      setMustAnimate(false)
      const loadingToastId = toast(<Spinner message={`Eliminando el historial de ${petHistoryI.pet?.name}`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', '/pet_histories/destroy', { id: petHistoryI.id })
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
      <img className={`w-full h-60 object-cover cursor-pointer ${hide > 0 ? 'opacity-0' : ''}`} src={petHistoryI?.pet?.pet_image_url} alt={petHistoryI?.pet?.name}
        onClick={() => {
          if (document.startViewTransition) {
            document.startViewTransition(() => {
              flushSync(() => {
                setTransitionName(`${petHistoryI?.pet?.name}-${petHistoryI.id}`)
                setImage({
                  url: petHistoryI?.pet?.pet_image_url,
                  label: petHistoryI?.pet?.name,
                })
              })
            });
          } else {
            flushSync(() => {
              setTransitionName(`${petHistoryI?.pet?.name}-${petHistoryI.id}`)
              setImage({
                url: petHistoryI?.pet?.pet_image_url,
                label: petHistoryI?.pet?.name,
              })
            })
          }
        }}
        style={{ viewTransitionName: !transitionName && `${petHistoryI?.pet?.name}-${petHistoryI.id}` }}
      />
      <div className='px-8 pt-5 flex flex-col justify-between overflow-hidden flex-1'>
        <div>
          <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>Nombre: {petHistoryI.pet?.name}</div>
          <p className='text-gray-900 font-semibold'>Edad: {petHistoryI.pet?.age}</p>
          <p className='text-gray-900 font-semibold'>Raza: {petHistoryI.pet?.breed?.name}</p>
          <p className='text-gray-900 font-semibold'>Sexo: {petHistoryI.pet?.sex}</p>
          <p className='text-gray-900 font-semibold'>C/E: {petHistoryI.pet?.ce}</p>
          <p className='text-gray-700 text-wrap min-[353px]:text-nowrap'>
            Desparasitación: {petHistoryI.last_deworming ? (
              <>
                <br />
                {getStringTime(petHistoryI.last_deworming)}
              </>
            ) : '--'}
          </p>

          <p className='mt-2 text-gray-700'>Dueño: {petHistoryI.pet?.customer?.name} <br />  {petHistoryI.pet?.customer?.identity_document?.abbreviation}: {petHistoryI.pet?.customer?.document_number}</p>
          {
            petHistoryI.pet?.customer?.first_phone
            &&
            <div className='mt-2'>
              <p className='text-gray-700 text-nowrap'>1º teléfono:
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
              <p className='text-gray-700 text-nowrap'>2º teléfono:
                <a href={`https://api.whatsapp.com/send/?phone=${petHistoryI.pet?.customer?.second_phone}&text=Hola,%20¿cómo%20estás%20${petHistoryI.pet?.customer?.name}?&type=phone_number&app_absent=0`} target='_blank' className='font-bold bg-emerald-300 p-1 rounded-md hover:bg-green-400'>
                  <Icon icon={faWhatsapp} css='mr-1' size='22px' />
                  {petHistoryI.pet?.customer?.second_phone}
                </a>
              </p>
            </div>
          }

          <p className='text-gray-700 mt-1'>Fecha: {getLocaleString(petHistoryI.created_at)}</p>
          {
            petHistoryI.pet?.observations?.length > 50
              ?
              <div>
                <button className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-1 rounded-lg'
                  onClick={() => setOpen(true)}
                >
                  Observaciones de la mascota
                </button>
                <article className={`${open ? '-translate-y-0' : 'translate-y-full'} z-10 ease-in duration-150 absolute flex top-0 left-0 w-full h-full bg-vetgreen-100 text-black font-medium rounded-lg`}>
                  <button className='fixed bg-red-900 text-white font-semibold px-3 py-1 rounded-lg top-2 right-0 me-5 mt-1 animate-bounce'
                    onClick={() => setOpen(false)}
                  >
                    Cerrar
                  </button>
                  <p className='overflow-auto p-3 pt-10'>{petHistoryI.pet?.observations}</p>
                </article>
              </div>
              :
              <p className='text-gray-700 font-semibold'> <strong>Observaciones de la mascota:</strong> {petHistoryI.pet?.observations || '---'}</p>
          }
        </div>
        <section>
          <div className='mt-3 '>
            <a href={`/pet_histories/get_plan_pdf?id=${petHistoryI.id}`} target='_blank' className='bg-indigo-500 text-white font-semibold px-3 py-2 rounded-lg hover:bg-indigo-700 flex items-center'>
              Ver plan de tratamiento
              <Icon icon={faFilePdf} css={'ms-2'} size='26px' />
            </a>
          </div>
          <div className='my-3 flex gap-2 pb-4'>
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
        </section>
        <p className='text-gray-600 font-medium text-sm absolute bottom-1 right-6'>Agregado {dateCalculator(petHistoryI.created_at)}</p>
      </div>
    </>
  )
}
