
export default function Spinner({ message }) {
  return (
    <div className='relative flex justify-between items-center'>
      <span
        className='animate-spin'
        style={{
          width: '48px',
          height: '48px',
          border: '5px solid blue',
          borderBottomColor: 'transparent',
          borderRadius: '50%',
          display: 'inline-block',
          boxSizing: 'border-box',
          position: 'absolute',
        }}
      >
      </span>
      <p className='h-12 flex-grow translate-x-12 translate-y-2 text-center'>{message}</p>
    </div>
  )
}
