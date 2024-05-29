import ReactDOM from 'react-dom/client'
import HeaderTable from '../HeaderTable';
import { faDog, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Filters from '../Filters';
import SectionData from '../SectionData';
import useDebounce from '../useDebounce';
import useFetchData from '../../utils/useFetchData';
import Loading from '../presentational/Loading';
import Icon from '../../utils/Icon';
import Footer from '../Footer';
import Pet from './Pet';
import PetModal from './PetModal';
import ImageModal from '../ImageModal';

function PetContainer() {

  const initialStatePet = {
    id: '',
    name: '',
    age: '',
    customer_id: '',
    breed_id: '',
    sex: 'Macho',
    ce: 'Entero',
    pet_image: null,
    observations: 'No hay observaciones.',
  }

  const filters = [
    {
      name: 'Nombre',
      value: 'name',
    },
    {
      name: 'Nombre del dueño',
      value: 'customer_id',
    },
    {
      name: 'Número de documento del dueño',
      value: 'document_number',
    },
    {
      name: 'Raza',
      value: 'breed_id',
    },
  ]

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12);
  const [filter, setFilter] = useState('name');
  const [inputFilter, setInputFilter] = useState('');
  const [sex, setSex] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const { debounceValue } = useDebounce(inputFilter, 500)
  const [helper, setHelper] = useState(0)
  const url = `/pets/list?page=${page}&limit=${limit}&filter=${filter}&inputFilter=${debounceValue}&sex=${sex}&startDate=${startDate}&finishDate=${finishDate}`
  const { data, loading } = useFetchData(url, [page, limit, helper])
  const [option, setOption] = useState('Crear')
  const [open, setOpen] = useState(false)
  const [pet, setPet] = useState(initialStatePet)
  const [mustLoad, setMustLoad] = useState(true)
  const [mustAnimate, setMustAnimate] = useState(true)
  const [openImage, setOpenImage] = useState(false)
  const [image, setImage] = useState({
    url: '',
    label: '',
  })

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
      <HeaderTable icon={faDog} message={'Gestión de mascotas'} name={'mascota'} setOpen={setOpen} setOption={setOption} setData={setPet} initialState={initialStatePet} />

      <Filters>
        <div className='w-full flex justify-between flex-wrap sm:flex-nowrap gap-y-1'>
          {
            filters.map((filterI, index) => (
              <button
                key={index}
                className={`${filter === filterI.value ? 'bg-vetgreen-200 text-white' : 'bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white'} cursor-pointer py-2 md:mx-2 mx-1 rounded-xl sm:rounded-full flex-grow`}
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
          setSex('')
          setStartDate('')
          setFinishDate('')
          setPage(1)
          setHelper((prev) => prev + 1)
        }} filter={filter} filters={filters} >
          <div className='flex flex-col'>
            <span className='font-bold text-sm my-2'>Sexo de la mascota</span>
            <select className='p-2 rounded-xl bg-gray-300 w-full'
              value={sex}
              onChange={(e) => {
                setSex(e.target.value)
                setPage(1)
                setHelper(prev => prev + 1)
              }}
              >
              <option value=''>Ambos</option>
              <option value='Macho'>Macho</option>
              <option value='Hembra'>Hembra</option>
            </select>
          </div>
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
        </SectionData.Search>
        <SectionData.FilterBar
          hide={!debounceValue && !startDate && !finishDate}
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
            ]
          } />
        <SectionData.CardContainer>
          {
            loading & mustLoad
              ?
              <Loading message={'Cargando mascotas'} />
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
                    {data?.data?.map((petI, index) => (
                      <SectionData.CardContainer.Card mustAnimate={mustAnimate} setMustAnimate={setMustAnimate} key={`${petI.id}-${index}`}>
                        <Pet petI={petI} setPet={setPet} setOption={setOption} setOpenModal={setOpen} setHelper={setHelper} setMustLoad={setMustLoad} setMustAnimate={setMustAnimate} setOpenImage={setOpenImage} setImage={setImage} />
                      </SectionData.CardContainer.Card>
                    ))}
                  </>
              )
          }
        </SectionData.CardContainer>
        <SectionData.Pagination pageQuantity={data.current_page * data.per_page} quantity={data.total} setMustLoad={setMustLoad} setLimit={setLimit} setPage={setPage} nextPage={data.next_page_url} prevPage={data.prev_page_url} page={data.current_page} lastPage={data.last_page} setMustAnimate={setMustAnimate} />
      </SectionData>
      <ImageModal image={image} open={openImage} setOpen={setOpenImage} />
      <PetModal pet={pet} option={option} open={open} setOpen={setOpen} setMustLoad={setMustLoad} setHelper={setHelper} />
      <Footer />
    </>
  )
}

const Index = ReactDOM.createRoot(document.getElementById('pet'));
Index.render(<PetContainer />)
