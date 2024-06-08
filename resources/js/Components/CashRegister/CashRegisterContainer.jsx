import ReactDOM from 'react-dom/client'
import { faCashRegister, faExclamation, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import SectionData from '../SectionData';
import useFetchData from '../../utils/useFetchData';
import Loading from '../presentational/Loading';
import Icon from '../../utils/Icon';
import Footer from '../Footer';
import CashRegister from './CashRegister';
import CashRegisterModal from './CashRegisterModal';
import HeaderTable, { DefaultHeader } from '../HeaderTable';
import SectionCashRegister from './SectionCashRegister';
import { getLocaleString } from '../../utils/utils';
import ImageModal from '../ImageModal';

function CashRegisterContainer() {

  const initialStateCashRegister = {
    id: '',
    initial_amount: 0,
  }

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12);
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [helper, setHelper] = useState(0)
  const url = `/cash_registers/list?page=${page}&limit=${limit}&startDate=${startDate}&finishDate=${finishDate}`
  const { data, loading } = useFetchData(url, [page, limit, helper])
  const [option, setOption] = useState('Abrir')
  const [open, setOpen] = useState(false)
  const [cashRegister, setCashRegister] = useState(initialStateCashRegister)
  const [mustLoad, setMustLoad] = useState(true)
  const [mustAnimate, setMustAnimate] = useState(true)
  const [cashRegisterId, setCashRegisterId] = useState({
    id: null,
    name: '',
    state: 1,
  })
  const [image, setImage] = useState({
    url: '',
    label: '',
  })
  const [transitionName, setTransitionName] = useState('')
  const [hide, setHide] = useState(false)

  const [rol, setRol] = useState(2)

  useEffect(() => {
    const cashRegisterDiv = document.getElementById('cash_register');
    const roleValue = cashRegisterDiv.getAttribute('role');
    setRol(roleValue)
  }, [])

  return (
    <>
      {
        rol == 1
          ?
          <HeaderTable icon={faCashRegister} message={'Gestión de cajas'} name={'nueva caja'} setOpen={setOpen} setOption={setOption} setData={setCashRegister} initialState={initialStateCashRegister} />
          :
          <DefaultHeader icon={faCashRegister} message={'Gestión de cajas'} />
      }
      <SectionData>
        <SectionData.SearchDate setHelper={setHelper} startDate={startDate} setStartDate={setStartDate} finishDate={finishDate} setFinishDate={setFinishDate} setPage={setPage} handleReset={() => {
          setStartDate('')
          setFinishDate('')
          setPage(1)
          setMustLoad(true)
          setHelper((prev) => prev + 1)
        }} />

        <ExcelButton rol={rol} />

        <SectionData.FilterBar
          hide={!startDate && !finishDate}
          data={
            [
              {
                tag: 'Fecha de inicio',
                input: startDate.length > 0 ? startDate : null,
                handleClick: () => {
                  setStartDate('')
                  setPage(1)
                  setHelper((prev) => prev + 1)
                }
              },
              {
                tag: 'Fecha de finalización',
                input: finishDate.length > 0 ? finishDate : null,
                handleClick: () => {
                  setFinishDate('')
                  setPage(1)
                  setHelper((prev) => prev + 1)
                }
              },
            ]
          } />
        <SectionData.CardContainer>
          {
            loading & mustLoad
              ?
              <Loading message={'Cargando cajas'} />
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
                    {data?.data?.map((cash_registerI, index) => (
                      <SectionData.CardContainer.Card mustAnimate={mustAnimate} setMustAnimate={setMustAnimate} key={`${cash_registerI.id}-${index}`}>
                        <CashRegister cash_registerI={cash_registerI} setCashRegister={setCashRegister} setOption={setOption} setOpenModal={setOpen} setHelper={setHelper} setMustLoad={setMustLoad} setMustAnimate={setMustAnimate} rol={rol} handleClick={() => {
                          setCashRegisterId({
                            id: cash_registerI.id,
                            name: getLocaleString(cash_registerI.created_at),
                            state: cash_registerI.state
                          })
                        }} />
                      </SectionData.CardContainer.Card>
                    ))}
                  </>
              )
          }
        </SectionData.CardContainer>
        <SectionData.Pagination pageQuantity={data.current_page * data.per_page} quantity={data.total} setMustLoad={setMustLoad} setLimit={setLimit} setPage={setPage} nextPage={data.next_page_url} prevPage={data.prev_page_url} page={data.current_page} lastPage={data.last_page} setMustAnimate={setMustAnimate} />
      </SectionData>
      {
        transitionName
        &&
        <ImageModal
          image={image}
          transitionName={transitionName}
          setTransitionName={setTransitionName}
          setHide={setHide}
        />
      }
      <CashRegisterModal cashRegister={cashRegister} option={option} open={open} setOpen={setOpen} setMustLoad={setMustLoad} setHelper={setHelper} />
      <Footer />
      <SectionCashRegister cashRegister={cashRegisterId} handleClose={() => setCashRegisterId({ id: null, name: '', state: 1 })} setHelper={setHelper} setMustLoad={setMustLoad} transitionName={transitionName} setTransitionName={setTransitionName} setImage={setImage} hide={hide} setHide={setHide} />
    </>
  )
}

function ExcelButton({ rol }) {
  const [date, setDate] = useState('')
  return (
    <>
      {
        rol == 1 ? (
          <div className='bg-vetwhite shadow-2xl p-5 rounded-xl'>
            <span className='font-semibold text-lg text-gray-600'>Ingresos / Egresos del mes</span>
            <input type='month' className='p-2 rounded-xl bg-gray-300 w-full mt-2'
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
              }}
            />
            <a
              href={date.length > 0 ? `/cash_registers/get_excel_by_month?month=${date.split('-')[1]}&year=${date.split('-')[0]}` : '#'}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex mt-5 w-full'
            >
              <span className='mx-auto'>
                <Icon icon={faFileExcel} css={'mr-2'} size='25px' />
                Descargar Excel
              </span>
            </a>
          </div>
        )
          :
          null
      }
    </>
  )
}

const Index = ReactDOM.createRoot(document.getElementById('cash_register'));
Index.render(<CashRegisterContainer />)

