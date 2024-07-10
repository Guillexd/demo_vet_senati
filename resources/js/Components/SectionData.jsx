import { faFilter, faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import Icon from '../utils/Icon';
import { getPageQuery } from '../utils/utils';
import { useRef, useEffect, useState, Children, cloneElement } from 'react';

function Search({ children, inputFilter, setInputFilter, handleReset, filter, filters, renderMoreFilters = true }) {
  const [open, setOpen] = useState(true)
  return (
    <section className='w-full py-2 px-4 flex justify-center'>
      <div className='relative min-w-[calc(80%)] bg-vetgreen-100 rounded-full shadow-lg'>
        <input id='input_search' type='text' className='w-full bg-transparent focus:outline-none ml-2 py-2 ps-3 pe-12 font-semibold'
          value={inputFilter}
          placeholder={`Buscar por ${(filters.find(el => el.value === filter)?.name).toLowerCase()}`}
          autoComplete='off'
          autoCapitalize='off'
          onChange={(e) => setInputFilter(e.target.value)} />
        <Icon css={'absolute inset-y-2.5 right-3'} icon={faMagnifyingGlass} size='20px' />
      </div>
      {
        renderMoreFilters
        &&
        <div>
          <div onClick={() => setOpen(prev => !prev)}>
            <Icon css={'mt-3 ms-3 hover:text-gray-400 animate-bounce cursor-pointer'} icon={faFilter} />
          </div>
          <div className={`${open && 'hidden'} ease-in duration-150 absolute min-w-64 mt-4 shadow-2xl -translate-x-60 bg-vetwhite rounded-xl z-10 p-5 ms-2`}>
            <div className='flex justify-between'>
              <span className='font-semibold text-lg text-gray-600'>Filtros</span>
              <span className='font-bold text-lg text-red-600 cursor-pointer'
                onClick={handleReset}
              >Resetear</span>
            </div>
            {children}
          </div>
        </div>
      }
    </section>
  );
}

function SearchDate({ setHelper, startDate, setStartDate, finishDate, setFinishDate, setPage, handleReset }) {
  return (
    <section className='flex flex-col gap-y-5 md:gap-y-0 md:gap-x-5 mb-5'>
      <div className={`shadow-2xl rounded-xl p-5`}>
        <div className='flex justify-between'>
          <span className='font-semibold text-lg text-gray-600'>Filtros</span>
          <span className='font-bold text-lg text-red-600 cursor-pointer'
            onClick={handleReset}
          >Resetear</span>
        </div>
        <div className='flex gap-x-2 flex-wrap'>
          <div className='flex flex-col flex-grow'>
            <span className='font-bold text-sm my-2'>Fecha de inicio</span>
            <input type='date' className='p-2 rounded-xl bg-gray-300 w-full'
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value)
                setPage(1)
                setHelper(prev => prev + 1)
              }} />
          </div>
          <div className='flex flex-col flex-grow'>
            <span className='font-bold text-sm my-2'>Fecha de finalización</span>
            <input type='date' className='p-2 rounded-xl bg-gray-300 w-full'
              value={finishDate}
              onChange={(e) => {
                setFinishDate(e.target.value)
                setPage(1)
                setHelper(prev => prev + 1)
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FilterBar({ hide, data }) {
  return (
    <section className={`${hide && 'hidden'} px-2 py-1 overflow-hidden flex flex-wrap cursor-pointer`}>
      <span className='font-medium me-4'>Filtro: </span>
      {
        data.map((value, index) => (
          value.input ? (
            <div
              className='bg-indigo-400 rounded-lg py-1 px-2 me-2 hover:bg-vetgreen-100 cursor-pointer text-sm'
              key={index}
              onClick={value.handleClick}
            >
              <Icon css={'px-1 me-1'} icon={faX} size='13px' />
              <span><strong>{value.tag}: </strong>{value.input}</span>
            </div>
          ) : null
        ))
      }

    </section>
  );
}

function CardContainer({ children }) {
  return (
    <section className='p-4 flex justify-center flex-wrap gap-5'>
      {children}
    </section>
  )
}

function Card({ children, mustAnimate, width }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const userRef = useRef(null);
  useEffect(() => {
    // console.log(`${ isDeleted ? 'opacity-0 translate-y-44' : mustAnimate ? '-translate-y-44 opacity-0' : 'translate-y-0 opacity-100'}`);
    if (mustAnimate) {
      setTimeout(() => {
        userRef.current.classList.remove('-translate-y-44')
        userRef.current.classList.remove('opacity-0')
        userRef.current.classList.add('translate-y-0')
        userRef.current.classList.add('opacity-100')
      }, Math.floor(Math.random() * (400 - 200 + 1)) + 100);
    }
  }, []);

  const childWithProps = Children.map(children, (child) => {
    return cloneElement(child, { setIsDeleted });
  });

  return (
    <section ref={userRef} className={`relative overflow-hidden bg-white rounded-xl shadow-xl hover:scale-[102%] ${width || 'w-[300px]'} ease-in duration-150 ${isDeleted ? 'opacity-0 translate-y-44' : mustAnimate ? '-translate-y-44 opacity-0' : 'translate-y-0 opacity-100'}`}>
      <div className='flex flex-col h-full'>
        {childWithProps}
      </div>
    </section>
  );
}

function Pagination({ pageQuantity, quantity, setMustLoad, setLimit, setPage, nextPage, prevPage, page, lastPage, setMustAnimate }) {
  return (
    <>
      <section className='flex justify-between items-center mt-4 px-1 sm:px-5'>
        <div className='hidden xl:block text-vetbrown rounded-lg'>
          Mostrando {pageQuantity > quantity ? quantity : pageQuantity} de {quantity} resultados
        </div>
        <button className='xl:hidden bg-white border px-4 py-2 text-gray-500 hover:text-indigo-500 hover:bg-gray-200 cursor-pointer rounded-lg'
          disabled={!prevPage}
          onClick={() => {
            if (prevPage) {
              setMustAnimate(true)
              setMustLoad(true)
              setPage(parseInt(getPageQuery(prevPage)))
            }
          }}>
          Anterior
        </button>

        <div className='hidden xl:block text-vetbrown rounded-full bg-slate-50 border border-vetbrown p-2 mb-1'>
          <span className=''> Por página: </span>
          <select className='px-2 py-1 bg-transparent rounded-lg cursor-pointer'
            defaultValue='12'
            onChange={(e) => {
              setMustAnimate(true)
              setMustLoad(true)
              setLimit(e.target.value)
              setPage(1)
            }}
          >
            <option value='6' className='bg-slate-50'>6</option>
            <option value='12' className='bg-slate-50'>12</option>
            <option value='20' className='bg-slate-50'>20</option>
          </select>
        </div>
        <div className='xl:hidden text-gray-600 rounded-xl bg-white border border-gray-200 p-2'>
          <select className='px-2 py-1 border border-gray-300 rounded-lg cursor-pointer'
            defaultValue='12'
            onChange={(e) => {
              setMustAnimate(true)
              setMustLoad(true)
              setLimit(e.target.value)
              setPage(1)
            }}
          >
            <option value='6' className=' bg-slate-50'>6</option>
            <option value='12' className=' bg-slate-50'>12</option>
            <option value='20' className=' bg-slate-50'>20</option>
          </select>
        </div>

        <nav className='hidden xl:flex rounded-lg divide-vetbrown ease-out duration-300'>
          <button className={`px-4 py-2 text-vetbrown bg-slate-50 border border-vetbrown rounded-l-full ${prevPage && 'hover:text-indigo-500 hover:scale-[105%]'}`}
            disabled={!prevPage}
            onClick={() => {
              if (prevPage) {
                setMustAnimate(true)
                setMustLoad(true)
                setPage(parseInt(getPageQuery(prevPage)))
              }
            }}>
            Anterior
          </button>

          {
            page !== 1 && <button className='px-4 py-2 text-gray-500 hover:text-indigo-500 hover:scale-[105%]'
              onClick={() => {
                setMustAnimate(true)
                setMustLoad(true)
                setPage(1)
              }}
            >
              {1}
            </button>
          }

          {(1 - page < -2 && page != 1) && <span className='px-4 py-2 text-gray-500'>...</span>}

          {
            (1 - page < -1 && page != 1) && <button className='px-4 py-2 text-gray-500 hover:text-indigo-500 hover:scale-[105%]'
              onClick={() => {
                setMustAnimate(true)
                setMustLoad(true)
                setPage(prev => prev - 1)
              }}
            >
              {parseInt(page) - 1}
            </button>
          }

          <button className='px-4 py-2 text-indigo-500 bg-slate-50 border border-vetbrown mx-2 font-medium'>{page}</button>

          {
            lastPage - page > 0 && <button className='px-4 py-2 text-gray-500 hover:text-indigo-500 hover:scale-[105%]'
              onClick={() => {
                setMustAnimate(true)
                setMustLoad(true)
                setPage(prev => prev + 1)
              }}
            >
              {parseInt(page) + 1}
            </button>
          }

          {lastPage - page > 2 && <span className='px-4 py-2 text-gray-500'>...</span>}

          {
            (lastPage - page > 1) && <button className='px-4 py-2 text-gray-500 hover:text-indigo-500 hover:scale-[105%]'
              onClick={() => {
                setMustAnimate(true)
                setMustLoad(true)
                setPage(lastPage)
              }}
            >
              {lastPage}
            </button>
          }

          <button className={`px-4 py-2 text-vetbrown rounded-r-full bg-slate-50 border border-vetbrown ${nextPage && 'hover:text-indigo-500 hover:scale-[105%]'}`}
            disabled={!nextPage}
            onClick={() => {
              if (nextPage) {
                setMustAnimate(true)
                setMustLoad(true)
                setPage(parseInt(getPageQuery(nextPage)))
              }
            }}
          >Siguiente</button>
        </nav>
        <button className='xl:hidden bg-white border px-4 py-2 text-gray-500 hover:text-indigo-500 hover:bg-gray-200 cursor-pointer rounded-lg'
          disabled={!nextPage}
          onClick={() => {
            if (nextPage) {
              setMustAnimate(true)
              setMustLoad(true)
              setPage(parseInt(getPageQuery(nextPage)))
            }
          }}
        >
          Siguiente
        </button>
      </section>
      <div className='block xl:hidden text-vetbrown rounded-lg text-center mt-5'>
        Mostrando {pageQuantity > quantity ? quantity : pageQuantity} de {quantity} resultados
      </div>
    </>
  );
}

function SectionData({ children }) {
  return (
    <section className='flex flex-col'>
      {children}
    </section>
  );
}

function Table({ children }) {
  return (
    <main className='mx-auto mt-2'>
      <div className='flex flex-col overflow-hidden'>
        <div className='py-2 -my-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='overflow-x-auto h-auto rounded-lg border border-gray-300'>
            <table className='min-w-full rounded-lg'>
              {children}
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

function HeaderTable({ names }) {
  return (
    <thead className='sticky top-0'>
      <tr>
        {
          names.map((name, index) => (
            <th key={index}
              className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
              {name}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}

function TableBody({ children }) {
  return (
    <tbody className='bg-white text-center'>
      {children}
    </tbody>
  )
}

SectionData.Search = Search;
SectionData.SearchDate = SearchDate
SectionData.FilterBar = FilterBar;
SectionData.CardContainer = CardContainer
CardContainer.Card = Card;
SectionData.Pagination = Pagination;
SectionData.Table = Table;
SectionData.HeaderTable = HeaderTable;
SectionData.TableBody = TableBody;

export default SectionData;

