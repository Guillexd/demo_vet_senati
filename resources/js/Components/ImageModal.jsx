import { faX } from "@fortawesome/free-solid-svg-icons";
import Icon from "../utils/Icon";
import { useEffect, useRef } from "react";
import { flushSync } from "react-dom";

export default function ImageModal({ image, transitionName, setTransitionName, setHide }) {

  const modal = useRef(null)

  useEffect(() => {
    if (transitionName) {
      setTimeout(() => {
        modal.current.classList.add('backdrop-blur-md');
      }, 300)
    } else {
      modal.current.classList.remove('backdrop-blur-md');
    }
  }, [transitionName])

  return (
    <>
      <div ref={modal} className={`fixed top-0 left-0 w-full h-full flex items-center justify-center`} style={{ zIndex: '50' }}
        onClick={() => {
          if (document.startViewTransition) {
            document.startViewTransition(() => {
              flushSync(() => {
                setTransitionName('')
                if (typeof setHide === 'function') {
                  setTimeout(() => {
                    setHide(false);
                  }, 400)
                }
              });
            });
          } else {
            flushSync(() => {
              setTransitionName('')
            });
          }
        }}
      >
        <button className='bg-gray-400 right-0 top-0 absolute p-3 rounded-xl m-2 opacity-80 hover:opacity-45'>
          <Icon css={'text-green-800'} icon={faX} size='22px' />
        </button>
        <img className='object-cover max-h-[80vh] max-w-screen rounded-2xl mx-auto'
          src={image.url}
          alt={image.label}
          onClick={(e) => e.stopPropagation()}
          style={{ viewTransitionName: transitionName }} />
      </div>
    </>
  )
}
