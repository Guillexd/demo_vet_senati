import { fetchHelper, showSWToDelete } from '../../utils/utils';
import { toast } from 'react-toastify';
import Spinner from '../presentational/Spinner';
import ToastifyErrorList from '../ToastifyErrorList';

export default function Expense({ expenseI, setExpense, setOption, setOpenModal, setHelper, setMustLoad, setMustAnimate, setIsDeleted }) {

  const handleDelete = () => {
    showSWToDelete('¿Quieres eliminar esta razón?', () => {
      setIsDeleted(true)
      setMustAnimate(false)
      const loadingToastId = toast(<Spinner message={`Eliminando a ${expenseI.reason}`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', '/expenses/destroy', { id: expenseI.id })
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
          toast.update(loadingToastId, { render: `Razón ${expenseI.reason} ha sido eliminada.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
          setHelper((prev) => prev + 1)
        })
        .catch((err) => {
          toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
        })
    })
  }

  return (
    <div className='flex flex-wrap flex-col justify-between lg:flex-row p-2 md:p-3 md:mx-5'>
      <p className='uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center md:text-start lg:w-9/12'><strong>Razón de egreso:</strong> {expenseI.reason}</p>
      <div className='my-3 flex justify-center items-center gap-2'>
        <button className='bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400'
          onClick={() => {
            setOption('Actualizar')
            setOpenModal(true)
            setExpense(expenseI)
          }}
        >Editar</button>
        <button className='bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500'
          onClick={handleDelete}
        >Eliminar</button>
      </div>
    </div>
  )
}
