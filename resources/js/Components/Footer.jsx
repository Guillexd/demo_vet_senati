
export default function Footer() {
  return (
    <footer className='-300'>
      <div className='container mx-auto py-8 px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center'>
            <a href='https://heylink.me/scriptify/' target='_blank' rel='noopener noreferrer'><img src='image/Logobgwhite.png' alt='Logo de la Empresa' className='w-24 mb-4 mx-auto' /></a>
            <h3 className='text-lg font-semibold mb-4'>ReyCan S.A.C.</h3>
          </div>
          <div className='text-center'>
            <h3 className='text-lg font-semibold mb-4'>Redes Sociales</h3>
            <div className='flex justify-center'>
              <div className='flex justify-center items-center w-1/2'>
                <div className='flex-col justify-center lg:px-6 px-2 md:pt-10'>
                  <div className='flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg'>
                    <a href='https://www.facebook.com' target='_blank'><img src='image/facebook.png' alt='Vision' className='w-full h-full'></img></a>
                  </div>
                </div>
                <div className='flex-col justify-center lg:px-6 px-2 md:pt-10'>
                  <div className='flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg'>
                    <a href='https://www.youtube.com' target='_blank'><img src='image/youtube.png' alt='Mision' className='w-full h-full'></img></a>
                  </div>
                </div>
                <div className='flex-col justify-center lg:px-6 px-2 md:pt-10'>
                  <div className='flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg'>
                    <a href='https://www.tiktok.com' target='_blank'><img src='image/tiktok.png' alt='Valores' className='w-full h-full'></img></a>
                  </div>
                </div>
                <div className='flex-col justify-center lg:px-6 px-2 md:pt-10'>
                  <div className='flex justify-center items-center  rounded-full mx-auto w-10 h-10 shadow-lg'>
                    <a href='https://wa.me/+51925941194' target='_blank'><img src='image/whatsapp.png' alt='Valores' className='w-full h-full'></img></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='text-center'>
            <h3 className='text-lg font-semibold mb-4'>Contacto</h3>
            <p>Teléfono: (+51) 925 941 194</p>
            <p>Correo: reycan@gmail.com</p>
          </div>
        </div>
        <section className='flex justify-center min-w-full'>
          <div className={`min-w-[calc(90%)] h-1 rounded-full my-6 bg-vetbrown`}></div>
        </section>
        <div className='border-gray-700 mt-2 pt-2 text-center'>
          <p>&copy; 2024 ReyCan. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
