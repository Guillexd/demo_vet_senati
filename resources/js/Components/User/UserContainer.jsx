import ReactDOM from 'react-dom/client'
import HeaderTable from '../HeaderTable';
import { faExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Filters from '../Filters';
import SectionData from '../SectionData';
import useDebounce from '../useDebounce';
import useFetchData from '../../utils/useFetchData';
import Loading from '../presentational/Loading';
import Icon from '../../utils/Icon';
import UserModal from './UserModal';
import User from './User';
import Footer from '../Footer';

function UserContainer() {

  const initialStateUser = {
    id: '',
    name: '',
    email: '',
    rol_id: 2,
    dni: '',
    phone: '',
    direction: '',
    password: '',
    password_confirmation: '',
  }

  const filters = [
    {
      name: 'Nombre',
      value: 'name',
    },
    {
      name: 'Correo',
      value: 'email',
    },
    {
      name: 'DNI',
      value: 'dni',
    },
    {
      name: 'Teléfono',
      value: 'phone',
    },
  ]

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12);
  const [filter, setFilter] = useState('name');
  const [inputFilter, setInputFilter] = useState('');
  const [rol, setRol] = useState('')
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const { debounceValue } = useDebounce(inputFilter, 500)
  const [helper, setHelper] = useState(0)
  const url = `/users/list?page=${page}&limit=${limit}&filter=${filter}&inputFilter=${debounceValue}&rol=${rol}&startDate=${startDate}&finishDate=${finishDate}`
  const { data, loading } = useFetchData(url, [page, limit, helper])
  const [option, setOption] = useState('Crear')
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(initialStateUser)
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
      <HeaderTable icon={faUser} message={'Gestión de usuarios'} name={'usuario'} setOpen={setOpen} setOption={setOption} setData={setUser} initialState={initialStateUser} />

      <Filters>
        {
          filters.map((filterI, index) => (
            <button
              key={index}
              className={`${filter === filterI.value ? 'bg-vetgreen-200 text-white' : 'bg-vetgreen-100 hover:bg-vetgreen-200 hover:text-white'} cursor-pointer py-2 md:mx-2 mx-1 rounded-full flex-grow`}
              onClick={() => {
                setFilter(filterI.value)
                setInputFilter('')
              }}
            >{filterI.name}</button>
          ))
        }
      </Filters>

      <SectionData>
        <SectionData.Search inputFilter={inputFilter} setInputFilter={setInputFilter} handleReset={() => {
          setRol('')
          setStartDate('')
          setFinishDate('')
          setPage(1)
          setHelper((prev) => prev + 1)
        }}>
          <div className='flex flex-col'>
            <span className='font-bold text-sm my-2'>Rol de usuario</span>
            <select className='p-2 rounded-xl bg-gray-300 w-full'
              value={rol}
              onChange={(e) => {
                setRol(e.target.value)
                setPage(1)
                setHelper(prev => prev + 1)
              }}
              >
              <option value=''></option>
              <option value='1'>Administrador</option>
              <option value='2'>Empleado</option>
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
          hide={!debounceValue && !rol && !startDate && !finishDate}
          data={
            [
              {
                tag: filters.find(el => el.value === filter)?.name,
                input: debounceValue,
                handleClick: () => setInputFilter('')
              },
              {
                tag: 'rol',
                input: rol.length > 0 ? (rol == 1 ? 'Administrador' : 'Empleado') : null,
                handleClick: () => {
                  setRol('')
                  setPage(1)
                  setHelper((prev) => prev + 1)
                }
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
              <Loading message={'Cargando usuarios'} />
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
                    {data?.data?.map((userI, index) => (
                      <SectionData.CardContainer.Card mustAnimate={mustAnimate} setMustAnimate={setMustAnimate} key={`${userI.id}-${index}`}>
                        <User userI={userI} setUser={setUser} setOption={setOption} setOpenModal={setOpen} setHelper={setHelper} setMustLoad={setMustLoad} setMustAnimate={setMustAnimate} />
                      </SectionData.CardContainer.Card>
                    ))}
                  </>
              )
          }
        </SectionData.CardContainer>
        <SectionData.Pagination pageQuantity={data.current_page * data.per_page} quantity={data.total} setMustLoad={setMustLoad} setLimit={setLimit} setPage={setPage} nextPage={data.next_page_url} prevPage={data.prev_page_url} page={data.current_page} lastPage={data.last_page} setMustAnimate={setMustAnimate} />
      </SectionData>
      <UserModal user={user} option={option} open={open} setOpen={setOpen} setMustLoad={setMustLoad} setHelper={setHelper} />
      <Footer />
    </>
  )
}

const Index = ReactDOM.createRoot(document.getElementById('user'));
Index.render(<UserContainer />)
