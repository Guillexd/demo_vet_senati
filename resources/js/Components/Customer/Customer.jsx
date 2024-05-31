import { dateCalculator, fetchHelper, getLocaleDate, showSWToDelete } from '../../utils/utils';
import { toast } from 'react-toastify';
import Spinner from '../presentational/Spinner';
import ToastifyErrorList from '../ToastifyErrorList';
import Icon from '../../utils/Icon'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Customer({ customerI, setCustomer, setOption, setOpenModal, setHelper, setMustLoad, setMustAnimate, setIsDeleted }) {

  const handleDelete = () => {
    showSWToDelete('¿Quieres eliminar este cliente?', () => {
      setIsDeleted(true)
      setMustAnimate(false)
      const loadingToastId = toast(<Spinner message={`Eliminando a ${customerI.name}`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', '/customers/destroy', { id: customerI.id })
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
          toast.update(loadingToastId, { render: `Cliente ${customerI.name} ha sido eliminado.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
          setHelper((prev) => prev + 1)
        })
        .catch((err) => {
          toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
        })
    }, 'Se eliminarán los datos asociados a este cliente como sus mascotas y el historial de las mismas.')
  }

  return (
    <div className='px-8 pt-5 flex flex-col justify-between flex-1'>
      <div>
        <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>Nombre: {customerI.name}</div>
        <p className='text-gray-900 font-semibold'>
          Tipo de documento: {customerI.identity_document?.description ? `${customerI.identity_document?.description} (${customerI.identity_document?.abbreviation})` : '---'}
        </p>
        <p className='text-gray-900 font-semibold'>
          Documento de identidad: {customerI.document_number || '---'}
          </p>
          {
          customerI.first_phone
            ?
            <div className='mt-2'>
              <p className='text-gray-700'>1º teléfono:
                <a href={`https://api.whatsapp.com/send/?phone=${customerI.first_phone}&text=Hola,%20¿cómo%20estás%20${customerI.name}?&type=phone_number&app_absent=0`} target='_blank' className='font-bold bg-emerald-300 p-1 rounded-md hover:bg-green-400'>
                  <Icon icon={faWhatsapp} css='mr-1' size='22px' />
                  {customerI.first_phone}
                </a>
              </p>
            </div>
            :
            <p className='mt-2 text-gray-700'>1º teléfono: ---</p>
        }
        {
          customerI.second_phone
            ?
            <div className='mt-2'>
              <p className='text-gray-700'>2º teléfono:
                <a href={`https://api.whatsapp.com/send/?phone=${customerI.second_phone}&text=Hola,%20¿cómo%20estás%20${customerI.name}?&type=phone_number&app_absent=0`} target='_blank' className='font-bold bg-emerald-300 p-1 rounded-md hover:bg-green-400'>
                  <Icon icon={faWhatsapp} css='mr-1' size='22px' />
                  {customerI.second_phone}
                </a>
              </p>
            </div>
            :
            <p className='text-gray-700'>2º teléfono: ---</p>
        }
        <p className='text-gray-700'>Dirección: {customerI.direction || '---'}</p>
        <p className='text-gray-700'>Fecha: { getLocaleDate(customerI.created_at) }</p>
      </div>
      <div className='my-3 flex gap-2 pb-4'>
        <button className='bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400'
          onClick={() => {
            setOption('Actualizar')
            setOpenModal(true)
            setCustomer(customerI)
          }}
        >Editar</button>
        <button className='bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500'
          onClick={handleDelete}
        >Eliminar</button>
      </div>
      <p className='text-gray-600 font-medium text-sm absolute bottom-1 right-8'>Agregado { dateCalculator(customerI.created_at) }</p>
    </div>
  )
}
