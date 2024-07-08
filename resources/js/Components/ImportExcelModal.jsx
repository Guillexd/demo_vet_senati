import { faFileExcel, faX } from '@fortawesome/free-solid-svg-icons'
import Icon from '../utils/Icon'
import { useState } from 'react'
import { fetchHelper } from '../utils/utils'
import { toast } from 'react-toastify'

export default function ImportExcelModal({ open, setOpen, url, format, setPage, setHelper }) {

  const [excel, setExcel] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmitExcel = () => {
    if(excel) {
      setLoading(true)
      fetchHelper('POST', url, {excel}, true)
      .then(res => {
        if(res.successfull) {
          setPage(1)
          setHelper((prev) => prev + 1)
          setOpen(false)
          setExcel(null)
        }
      })
      .finally(() => setLoading(false))
    } else {
      toast.info('Debes enviar un archivo excel', { autoClose: 1500 })
    }
  }

  return (
    <>
      <div className={`${open ? 'scale-100' : 'scale-0'} fixed inset-0 bg-black opacity-60 z-30 transition-all duration-300 ease-out`}></div>

      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-500 ease-out transform ${open ? '' : 'translate-y-[-200%]'}`} style={{ zIndex: '40' }}>
        <div className={`w-full max-w-2xl max-h-full mx-3 overflow-y-auto`}>
          <section className={`relative rounded-lg shadow bg-white z-40`}
          >
            <div className='flex items-start p-4 border-b rounded-t border-gray-600'>
              <Icon icon={faFileExcel} css={'text-gray-700 text-3xl mx-3'} size='30px' />
              <h3 className='text-2xl font-semibold text-gray-700'>
                Importar archivo Excel
              </h3>
              <button type='button' className='bg-gray-200 right-0 top-0 absolute p-3 rounded-xl m-2 opacity-80 hover:opacity-45'
                onClick={() => setOpen(false)}>
                <Icon css={'text-green-800'} icon={faX} size='22px' />
              </button>
            </div>

            <div className='p-6 grid grid-cols-1 gap-6'>

              <div className='relative border border-gray-600 rounded w-full col-span-full order-1'>
                <input type='file' className='hidden' id='excel_file' accept='.xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0]
                    setExcel(file)
                  }}
                />
                <label htmlFor='excel_file' className='cursor-pointer block w-full py-2 text-center text-gray-600 bg-transparent rounded transition duration-200 ease-in-out hover:bg-gray-300'>
                  --- Seleccionar foto (opcional) ---
                </label>
              </div>

              {
                excel
                &&
                <section className='order-1 bg-green-400 w-full p-3 rounded-lg flex justify-center items-center text-lg font-medium'>
                  <Icon icon={faFileExcel} css={'mr-2'} size='25px' /> {excel.name}
                </section>
              }

            </div>

            <div className='flex justify-end p-6 space-x-2 border-t rounded-b border-gray-600'>
              <button id='btn_to_submit' type='button' className='text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-red-600 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
                disabled={loading} onClick={handleSubmitExcel}
              >
                Importar
              </button>
              <a href={`/formats/${format}`} className='focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-sky-500 text-white border-sky-500 hover:bg-sky-600 focus:ring-sky-600 cursor-pointer text-center'>
                Descargar formato
              </a>
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
