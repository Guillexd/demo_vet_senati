import ReactDOM from 'react-dom/client'
import HeaderTable from '../HeaderTable';
import { faBook, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Filters from '../Filters';
import SectionData from '../SectionData';
import useDebounce from '../useDebounce';
import useFetchData from '../../utils/useFetchData';
import Loading from '../presentational/Loading';
import Icon from '../../utils/Icon';
import Footer from '../Footer';
import PetHistory from './PetHistory';
import PetHistoryModal from './PetHistoryModal';
import ImageModal from '../ImageModal';
import { fetchData, showNotification } from '../../utils/utils';

function PetHistoryContainer() {

  const initialStateHistory = {
    id: '',
    pet_id: '',
    last_deworming: '',
    reason: '',
    awareness: 'Alerta',
    weight: '',
    mucosa: '',
    tllc: '',
    fc: '',
    fr: '',
    spo2: '',
    temperature: '',
    card_con: '',
    temper: '',
    state: 'Ambulatorio',
    linfonodulos: '',
    aus_card: '',
    aus_resp: '',
    tegumento: '',
    palpacion_abd: '',
    diagnostico: '',
    hto: '',
    glucosa: '',
    pt: '',
    du_refrac: '',
    frotis: '',
    hemograma: 0,
    hemograma_image_url: '',
    ecografia: 0,
    ecografia_image_url: '',
    abdominal: 0,
    gestacional: 0,
    ecofast: 0,
    tfast: 0,
    vetbles: 0,
    bioquimica: 0,
    radiografias: 0,
    radiografias_image_url: '',
    vistas: '',
    zona: '',
    electrolitos: '',
    bilir: '',
    ceto: '',
    sang: '',
    prot: '',
    nitri: '',
    leu: '',
    glu: '',
    ph: '',
    plan: '',
    next_date: '',
  }

  const filters = [
    {
      name: 'Nombre de la mascota',
      value: 'pet_id',
    },
    {
      name: 'Nombre del dueño',
      value: 'customer_id',
    },
    {
      name: 'Número de documento del dueño',
      value: 'document_number',
    },
  ]

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12);
  const [filter, setFilter] = useState('pet_id');
  const [inputFilter, setInputFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [startNextDate, setStartNextDate] = useState('');
  const [finishNextDate, setFinishNextDate] = useState('');
  const { debounceValue } = useDebounce(inputFilter, 500)
  const [helper, setHelper] = useState(0)
  const url = `/pet_histories/list?page=${page}&limit=${limit}&filter=${filter}&inputFilter=${debounceValue}&startDate=${startDate}&finishDate=${finishDate}&startNextDate=${startNextDate}&finishNextDate=${finishNextDate}`
  const { data, loading } = useFetchData(url, [page, limit, helper])
  const [option, setOption] = useState('Crear')
  const [open, setOpen] = useState(false)
  const [petHistory, setPetHistory] = useState(initialStateHistory)
  const [mustLoad, setMustLoad] = useState(true)
  const [mustAnimate, setMustAnimate] = useState(true)
  const [openImage, setOpenImage] = useState(false)
  const [image, setImage] = useState({
    url: '',
    label: '',
  })
  const [transitionName, setTransitionName] = useState('')

  useEffect(() => {
    if (!loading) {
      setMustLoad(true)
      setMustAnimate(true)
      setPage(1)
      setHelper((prev) => prev + 1)
    }
  }, [debounceValue])

  useEffect(() => {
    setTimeout(() => {
      fetchData('/pet_histories/get_next_date')
      .then(value => {
        if(value.count == 0) return

        const title = document.createElement('p');
        title.classList.add('text-center')
        title.innerText = `!Tienes ${value.count} cita(s) pendiente(s) en el rango de 2 semanas!`;

        const footer = document.createElement('div');
        footer.classList.add('text-start')
        footer.classList.add('ms-5')
        value.histories.forEach((el) => {
          footer.innerHTML += `
            <li class='font-bold'>${el.pet?.name} y su dueño(a) ${el.pet?.customer?.name} tienen una cita pendiente.</li>
          `;
        })

        showNotification(title, footer, '¡Los contáctare!')
      })
    }, 1000)
  }, [])

  return (
    <>
      <HeaderTable icon={faBook} message={'Gestión de historiales'} name={'historial'} setOpen={setOpen} setOption={setOption} setData={setPetHistory} initialState={initialStateHistory} />

      <Filters>
        <div className='w-full flex justify-between flex-wrap sm:flex-nowrap gap-y-1'>
          {
            filters.map((filterI, index) => (
              <button
                key={index}
                className={`${filter === filterI.value ? 'bg-vetgreen-200 text-white' : 'bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white'} cursor-pointer p-2 md:mx-2 mx-1 rounded-xl sm:rounded-full flex-grow`}
                onClick={() => {
                  setFilter(filterI.value)
                  setInputFilter('')
                }}
              >{filterI.name}</button>
            ))
          }
        </div>
      </Filters>

      <SectionData>
        <SectionData.Search inputFilter={inputFilter} setInputFilter={setInputFilter} handleReset={() => {
          setStartDate('')
          setFinishDate('')
          setStartNextDate('')
          setFinishNextDate('')
          setPage(1)
          setHelper((prev) => prev + 1)
        }} filter={filter} filters={filters} >
          <div className='flex flex-col'>
            <span className='font-bold text-sm my-2'>Fecha de inicio</span>
            <input type='date' className='p-2 rounded-xl bg-gray-300 w-full'
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value)
                setPage(1)
                setHelper(prev => prev + 1)
              }} />
          </div>
          <div className='flex flex-col'>
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
          <div className='flex flex-col'>
            <span className='font-bold text-sm my-2'>Fecha de próxima cita (inicio)</span>
            <input type='date' className='p-2 rounded-xl bg-gray-300 w-full'
              value={startNextDate}
              onChange={(e) => {
                setStartNextDate(e.target.value)
                setPage(1)
                setHelper(prev => prev + 1)
              }} />
          </div>
          <div className='flex flex-col'>
            <span className='font-bold text-sm my-2'>Fecha de proxima cita (finalización)</span>
            <input type='date' className='p-2 rounded-xl bg-gray-300 w-full'
              value={finishNextDate}
              onChange={(e) => {
                setFinishNextDate(e.target.value)
                setPage(1)
                setHelper(prev => prev + 1)
              }}
            />
          </div>
        </SectionData.Search>
        <SectionData.FilterBar
          hide={!debounceValue && !startDate && !finishDate && !startNextDate && !finishNextDate }
          data={
            [
              {
                tag: filters.find(el => el.value === filter)?.name,
                input: debounceValue,
                handleClick: () => setInputFilter('')
              },
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
              {
                tag: 'Fecha de siguiente cita (inicio)',
                input: startNextDate.length > 0 ? startNextDate : null,
                handleClick: () => {
                  setStartNextDate('')
                  setPage(1)
                  setHelper((prev) => prev + 1)
                }
              },
              {
                tag: 'Fecha de siguiente cita (finalización)',
                input: finishNextDate.length > 0 ? finishNextDate : null,
                handleClick: () => {
                  setFinishNextDate('')
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
              <Loading message={'Cargando historiales'} />
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
                    {data?.data?.map((petHistoryI, index) => (
                      <SectionData.CardContainer.Card mustAnimate={mustAnimate} setMustAnimate={setMustAnimate} key={`${petHistoryI.id}-${index}`}>
                        <PetHistory petHistoryI={petHistoryI} setPetHistory={setPetHistory} setOption={setOption} setOpenModal={setOpen} setHelper={setHelper} setMustLoad={setMustLoad} setMustAnimate={setMustAnimate} setImage={setImage} transitionName={transitionName} setTransitionName={setTransitionName} />
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
        />
      }
      <PetHistoryModal petHistory={petHistory} option={option} open={open} setOpen={setOpen} setMustLoad={setMustLoad} setHelper={setHelper} transitionName={transitionName} setTransitionName={setTransitionName} setImage={setImage} />
      <Footer />
    </>
  )
}

const Index = ReactDOM.createRoot(document.getElementById('pet_history'));
Index.render(<PetHistoryContainer />)
