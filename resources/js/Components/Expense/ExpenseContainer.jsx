import ReactDOM from 'react-dom/client'
import HeaderTable from '../HeaderTable';
import { faAngleDoubleUp, faBook, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Filters from '../Filters';
import SectionData from '../SectionData';
import useDebounce from '../useDebounce';
import useFetchData from '../../utils/useFetchData';
import Loading from '../presentational/Loading';
import Icon from '../../utils/Icon';
import Footer from '../Footer';
import Expense from './Expense';
import ExpenseModal from './ExpenseModal';
import { initialStateExpense as initialStateExpenseExport} from './initialStateExpense'

function ExpenseContainer() {

  const initialStateExpense = {...initialStateExpenseExport}

  const filters = [
    {
      name: 'Razón',
      value: 'reason',
    },
  ]

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12);
  const [filter, setFilter] = useState('reason');
  const [inputFilter, setInputFilter] = useState('');
  const { debounceValue } = useDebounce(inputFilter, 500)
  const [helper, setHelper] = useState(0)
  const url = `/expenses/list?page=${page}&limit=${limit}&filter=${filter}&inputFilter=${debounceValue}`
  const { data, loading } = useFetchData(url, [page, limit, helper])
  const [option, setOption] = useState('Crear')
  const [open, setOpen] = useState(false)
  const [expense, setExpense] = useState(initialStateExpense)
  const [mustLoad, setMustLoad] = useState(true)
  const [mustAnimate, setMustAnimate] = useState(true)

  useEffect(() => {
    if (!loading) {
      setMustLoad(true)
      setMustAnimate(true)
      setPage(1)
      setHelper((prev) => prev + 1)
    }
  }, [debounceValue])

  return (
    <>
      <HeaderTable icon={faAngleDoubleUp} message={'Gestión de egresos'} name={'egreso'} setOpen={setOpen} setOption={setOption} setData={setExpense} initialState={initialStateExpense} />

      <Filters>
        {
          filters.map((filterI, index) => (
            <button
              key={index}
              className={`${filter === filterI.value ? 'bg-vetgreen-200 text-white' : 'bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white'} cursor-pointer p-2 rounded-md flex-grow`}
              onClick={() => {
                setFilter(filterI.value)
                setInputFilter('')
              }}
            >{filterI.name}</button>
          ))
        }
      </Filters>

      <SectionData>
        <SectionData.Search inputFilter={inputFilter} setInputFilter={setInputFilter}
         filter={filter}
         filters={filters}
         renderMoreFilters={false} />
        <SectionData.FilterBar
          hide={!debounceValue}
          data={
            [
              {
                tag: filters.find(el => el.value === filter)?.name,
                input: debounceValue,
                handleClick: () => setInputFilter('')
              },
            ]
          } />
        <SectionData.CardContainer>
          {
            loading & mustLoad
              ?
              <Loading message={'Cargando razones de egreso'} />
              :
              (
                data.data?.length === 0
                  ?
                  <div className='bg-white p-4 border rounded shadow-lg text-center'>
                    <p className='text-gray-600 text-lg'>
                      <Icon icon={faExclamation} css={'mr-3'} />
                      No hay datos disponibles.
                    </p>
                  </div>
                  :
                  <>
                    {data?.data?.map((expenseI, index) => (
                      <SectionData.CardContainer.Card mustAnimate={mustAnimate} setMustAnimate={setMustAnimate} width={'w-full'} key={`${expenseI.id}-${index}`}>
                        <Expense expenseI={expenseI} setExpense={setExpense} setOption={setOption} setOpenModal={setOpen} setHelper={setHelper} setMustLoad={setMustLoad} setMustAnimate={setMustAnimate} />
                      </SectionData.CardContainer.Card>
                    ))}
                  </>
              )
          }
        </SectionData.CardContainer>
        <SectionData.Pagination pageQuantity={data.current_page * data.per_page} quantity={data.total} setMustLoad={setMustLoad} setLimit={setLimit} setPage={setPage} nextPage={data.next_page_url} prevPage={data.prev_page_url} page={data.current_page} lastPage={data.last_page} setMustAnimate={setMustAnimate} />
      </SectionData>
      <ExpenseModal expense={expense} option={option} open={open} setOpen={setOpen} setMustLoad={setMustLoad} setHelper={setHelper} />
      <Footer />
    </>
  )
}

const Index = ReactDOM.createRoot(document.getElementById('expense'));
Index.render(<ExpenseContainer />)
