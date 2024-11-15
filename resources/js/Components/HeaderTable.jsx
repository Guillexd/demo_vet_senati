import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import Icon from '../utils/Icon';

export default function HeaderTable({ icon, message, name, setOpen, setOption, setData, initialState }) {
  return (
    <div className='w-full flex flex-wrap justify-center md:justify-between md:px-7'>
      <p className='font-bold text-4xl text-center'>
        <Icon icon={icon} css={'mr-3'} size='37px' />
        {message}
      </p>
      <button className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full mr-4 mb-4 mt-4 sm:mt-0 shadow-xl' onClick={() => {
        setOpen(true)
        setOption('Crear')
        setData(initialState)
      }}>
        Crear {name}
      </button>
    </div>
  )
}

export function DefaultHeader({ icon, message }) {
  return (
    <div className='w-full flex flex-wrap justify-center md:justify-between mb-4 md:px-7'>
      <p className='font-bold text-4xl text-center'>
        <Icon icon={icon} css={'mr-3'} size='37px' />
        {message}
      </p>
    </div>
  )
}

export function DefaultTitle({ message }) {
  return (
    <div className='flex justify-center mb-2'>
      <div className='font-semibold text-vetbrown border-b-2 border-vetgreen-200'>
        {message}
      </div>
    </div>
  )
}

export function HeaderTableExcel({ icon, message, name, setOpen, setOption, setData, initialState, setOpenImport }) {
  return (
    <div className='w-full flex flex-wrap justify-center md:justify-between md:px-7'>
      <p className='font-bold text-4xl text-center'>
        <Icon icon={icon} css={'mr-3'} size='37px' />
        {message}
      </p>

      <div className='sm:flex flex-col lg:flex-row justify-center'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4 mb-4 mt-4 sm:mt-0 shadow-xl'
          onClick={() => setOpenImport(true)}
        >
          Importar  <Icon icon={faFileExcel} css={'ml-1'} size='20px' />
        </button>
        <button className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full mr-4 mb-4 mt-4 sm:mt-0 shadow-xl' onClick={() => {
          setOpen(true)
          setOption('Crear')
          setData(initialState)
        }}>
          Crear {name}
        </button>
      </div>
    </div>
  )
}

export function DefaultHeaderExcel({ icon, message, setOpenImport }) {
  return (
    <div className='w-full flex flex-wrap justify-center md:justify-between md:px-7'>
      <p className='font-bold text-4xl text-center'>
        <Icon icon={icon} css={'mr-3'} size='37px' />
        {message}
      </p>

      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4 mb-4 mt-4 sm:mt-0 shadow-xl'
        onClick={() => setOpenImport(true)}
      >
        Importar  <Icon icon={faFileExcel} css={'ml-1'} size='20px' />
      </button>
    </div>
  )
}
