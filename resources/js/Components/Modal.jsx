import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, Flip } from 'react-toastify'
import Icon from '../utils/Icon'
import { faX } from '@fortawesome/free-solid-svg-icons'

function Modal({ children, option, open, setOpen, isLoading, handleSubmit, icon, text, width, height }) {

  return (
    <>
      <div className={`${open ? 'scale-100' : 'scale-0'} fixed inset-0 bg-black opacity-60 z-30 transition-all duration-300 ease-out`}></div>

      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-500 ease-out transform ${open ? '' : 'translate-y-[-200%]'}`} style={{ zIndex: '40' }}>
        <div className={`w-full ${width || 'max-w-2xl'} ${height || 'max-h-full'} mx-3 overflow-y-auto`}>
          <section className={`relative rounded-lg shadow bg-white z-40`}
          >
            <div className='flex items-start p-4 border-b rounded-t border-gray-600'>
              <FontAwesomeIcon icon={icon} className='text-gray-700 text-3xl mx-3' />
              <h3 className='text-2xl font-semibold text-gray-700'>
                {text}
              </h3>
              <button type='button' className='bg-gray-200 right-0 top-0 absolute p-3 rounded-xl m-2 opacity-80 hover:opacity-45' onClick={() => setOpen(false)}>
                <Icon css={'text-green-800'} icon={faX} size='22px' />
              </button>
            </div>

            <div className='p-6 grid grid-cols-1 sm:grid-cols-2 gap-6'>

              {children}

            </div>

            <div className='flex justify-end p-6 space-x-2 border-t rounded-b border-gray-600'>
              <button id='btn_to_submit' type='button' className='text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-red-600 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
                disabled={isLoading} onClick={handleSubmit}
              >
                {option}
              </button>
              <button type='button' className='focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-500 text-white border-gray-500 hover:bg-gray-600 focus:ring-gray-600'
                onClick={() => setOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

function ToastifyModal() {
  return (
    <ToastContainer
      position='top-right'
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Flip}
      theme='light'
    />
  )
}

Modal.ToastifyModal = ToastifyModal

export default Modal
