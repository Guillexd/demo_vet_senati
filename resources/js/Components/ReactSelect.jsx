import { useState } from 'react'
import Icon from '../utils/Icon'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

export default function ReactSelect({ children, setMustSearch, filters, filter, setFilter, input, setInput, label, setHelperSearch, setHelper, anotherAction = false, actions, css, listStyle }) {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <>
      {
        filters
          ?
          <div className={`bg-gray-400 border-white border-2 w-full col-span-full mx-auto rounded-md flex justify-between font-semibold shadow-lg overflow-y-auto order-1`}>
            {
              filters.map((el, index) => (
                <button type='button'
                  key={index}
                  className={`${el.value === filter ? 'bg-gray-600' : 'hover:bg-gray-600'} text-white cursor-pointer p-2 rounded-md flex-grow`}
                  onClick={() => setFilter(el.value)}
                >{el.tag}</button>
              ))
            }
          </div>
          :
          null
      }
      <div className={`relative border border-gray-600 rounded ${css || 'w-full col-span-full order-1'}`}>
        <input
          type='text'
          className='peer block min-h-[auto] w-full rounded border-0 bg-transparent pr-14 pl-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
          value={input}
          onFocus={() => {
            setHelperSearch(true)
            setIsFocused(true)
            setHelper(prev => prev + 1)
          }}
          onBlur={() => setTimeout(() => {
            setIsFocused(false)
          }, 200)}
          onChange={(e) => {
            setMustSearch(true)
            setInput(e.target.value)
          }}
          required />
        <label
          className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
        >
          {label}
        </label>

        <div className={`${isFocused ? 'absolute' : 'hidden'} text-white font-semibold bg-black opacity-95 overflow-y-auto mt-1 rounded-lg z-10 ${listStyle || 'w-full max-h-44'}`}>
          {children}
        </div>

        <div className='absolute top-0 right-0 h-full animate-bounce cursor-pointer' onClick={() => {
          setInput('')
          if (anotherAction) {
            actions()
          }
        }}>
          <Icon icon={faDeleteLeft} css={'h-full text-gray-600'} />
        </div>
      </div>
    </>
  )
}
