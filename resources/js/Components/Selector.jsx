
export default function Selector({ message, filters, filter, setFilter }) {
  return (
    <>
      {
        filters
          ?
          <div className={`relative bg-cyan-700 border-2 w-full col-span-full rounded-md shadow-lg order-1`}>
            <label
              className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out -translate-y-[1.8rem] scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 text-primary'
            >
              { message }
            </label>
            <div className="overflow-y-auto w-full flex justify-between ">
            {
              filters.map((el, index) => (
                <button type='button'
                  key={index}
                  className={`${el.value === filter ? 'bg-cyan-900' : 'hover:bg-cyan-900'} text-white cursor-pointer p-2 rounded-md flex-grow font-semibold `}
                  onClick={() => setFilter(el.value)}
                >{el.tag}</button>
              ))
            }
            </div>
          </div>
          :
          null
      }
    </>
  )
}
