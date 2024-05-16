import Icon from '../utils/Icon';

export default function HeaderTable({ icon, message, name, setOpen, setOption, setData, initialState }) {
  return (
    <div className='w-full flex flex-wrap justify-center md:justify-between md:px-7'>
      <p className='font-bold text-4xl text-center'>
        <Icon icon={icon} css={'mr-3'} size='37px' />
        {message}
      </p>
      <button className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full mr-4 mb-4 mt-4 sm:mt-0' onClick={() => {
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
    <div className='w-full flex flex-wrap justify-center md:justify-between md:px-7'>
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
