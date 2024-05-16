import { faX } from "@fortawesome/free-solid-svg-icons";
import Icon from "../utils/Icon";
import { useEffect, useRef } from "react";

export default function ImageModal({ image, open, setOpen }) {

  const modal = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        modal.current.classList.add('backdrop-blur-md');
      }, 600)
    } else {
      modal.current.classList.remove('backdrop-blur-md');
    }
  }, [open])

  return (
    <>
      <div className={`${open ? 'scale-100' : 'scale-0'} fixed inset-0 bg-black opacity-60 z-30 transition-all duration-300 ease-out`}></div>

      <div ref={modal} className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-700 transform ${open ? '' : 'translate-y-[-200%]'}`} style={{ zIndex: '40' }}>
        <button className='bg-gray-200 right-0 top-0 absolute p-3 rounded-xl m-2 opacity-80 hover:opacity-45' onClick={() => setOpen(false)}>
          <Icon css={'text-green-800'} icon={faX} size='22px' />
        </button>
        {
          image.url.length > 0
            ?
            <img className='object-cover max-h-[80vh] max-w-screen rounded-2xl' src={image.url} alt={image.label} />
            :
            null
        }
      </div>
    </>
  )
}
