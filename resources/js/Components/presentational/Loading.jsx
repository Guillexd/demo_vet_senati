import '../../../css/loading.css'

export default function Loading({ message }) {
  return (
    <section className='w-screen sm:w-auto'>
      <div className='flex flex-col items-center h-52 justify-center'>
        <span className='loader'></span>
        <p className='text-xl text-center'>{message} ...</p>
      </div>
    </section>
  )
}
