import { fetchHelper, getLocaleString, showSWToDelete } from '../../utils/utils';
import { toast } from 'react-toastify';
import Spinner from '../presentational/Spinner';
import ToastifyErrorList from '../ToastifyErrorList';
import Icon from '../../utils/Icon';
import { faHandPointUp, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

export default function CashRegister({ cash_registerI, setCashRegister, setOption, setOpenModal, setHelper, setMustLoad, setMustAnimate, setIsDeleted, handleClick }) {

  const handleDelete = () => {
    showSWToDelete('¿Quieres eliminar esta caja?', () => {
      setIsDeleted(true)
      setMustAnimate(false)
      const loadingToastId = toast(<Spinner message={`Eliminando la caja ${cash_registerI.id}`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', '/cash_registers/destroy', { id: cash_registerI.id })
        .then((data) => {
          setMustLoad(false)
          if (data.errors) {
            setIsDeleted(false)
            return toast.update(loadingToastId, { render: <><ToastifyErrorList data={data.errors} /></>, type: toast.TYPE.ERROR, autoClose: 3000, hideProgressBar: false, })
          }
          if (data.message) {
            setIsDeleted(false)
            return toast.update(loadingToastId, { render: <>{data.message}</>, type: toast.TYPE.INFO, autoClose: 3000, hideProgressBar: false, })
          }
          toast.update(loadingToastId, { render: `Caja ${cash_registerI.id} ha sido eliminado.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
          setHelper((prev) => prev + 1)
        })
        .catch((err) => {
          setIsDeleted(false)
          toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
        })
    }, 'Se eliminarán los datos asociados a esta caja como los ingresos y egresos registrados del mismo.')
  }

  return (
    <div className='px-8 pt-5 flex flex-col justify-between flex-1' onClick={handleClick} >
      <div className='absolute top-1 left-2 rounded-full bg-indigo-500 w-8 h-8 flex justify-center items-center font-bold font-mono text-xl text-white'>
        {cash_registerI.id}
      </div>
      <div className='absolute top-8 right-2 animate-bounce rounded-full bg-indigo-500 w-10 h-10 flex justify-center items-center font-bold font-mono text-xl text-white'>
        <Icon icon={faHandPointUp} size='30px' />
      </div>
      <img src='/image/caja.png' alt='caja' />
      <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>Caja {getLocaleString(cash_registerI.created_at)}</div>
      <div className='uppercase tracking-wide text-sm text-indigo-700 font-bold'>Monto inicial: S/. {cash_registerI.initial_amount}</div>
      {
        cash_registerI.total &&
        <div className='uppercase tracking-wide text-sm font-bold'>
          Total: S/. {cash_registerI.total}
        </div>
      }
      <div className={`${cash_registerI.state === 0 ? 'bg-red-400 text-amber-200 ' : 'bg-green-400 text-black '} uppercase tracking-wide text-sm font-semibold rounded-lg w-fullpx-4 py-1 flex justify-center`}>
        {
          cash_registerI.state !== 0
            ?
            <>
              <Icon css={'me-2'} icon={faLockOpen} />
              Abierto
            </>
            :
            <>
              <Icon css={'me-2'} icon={faLock} />
              Cerrado
            </>
        }
      </div>
      <div className='my-3 flex gap-2 mx-auto' onClick={(e) => e.stopPropagation()}>
        {
          cash_registerI.state === 0
            ?
            <button type='button' className='bg-green-300 rounded-md py-1 px-4 font-semibold hover:bg-green-400'
              onClick={() => {
                setOption('Actualizar')
                setOpenModal(false)
                setCashRegister(cash_registerI)
                setTimeout(() => {
                  document.getElementById('btn_to_submit').click()
                }, 200)
              }}
            >Abrir caja</button>
            :
            <button className='bg-vetsky rounded-md py-1 px-4 font-semibold hover:bg-gray-400'
              onClick={() => {
                setOption('Actualizar')
                setOpenModal(true)
                setCashRegister(cash_registerI)
              }}
            >Editar</button>
        }
        <button className='bg-vetbrown rounded-md py-1 px-4 text-white font-semibold hover:bg-gray-500'
          onClick={handleDelete}
        >Eliminar</button>
      </div>
    </div>
  )
}
