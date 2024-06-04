import { useEffect, useReducer, useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { fetchHelper } from '../../utils/utils';
import ToastifyErrorList from '../ToastifyErrorList';
import Spinner from '../presentational/Spinner';
import { faDog, faShieldCat, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import useDebounce from '../useDebounce';
import useFetchData from '../../utils/useFetchData';
import ReactSelect from '../ReactSelect';
import Selector from '../Selector';
import Icon from '../../utils/Icon';
import { initialStateCustomer } from '../Customer/initialStateCustomer';
import AddCustomer from '../Customer/CustomerModal';
import { initialStateBreed } from '../Breed/initialStateBreed'
import AddBreed from '../Breed/BreedModal'

const REDUCER_ACTION_TYPE = {
  id: 'MODIFY_ID',
  name: 'MODIFY_NAME',
  age: 'MODIFY_AGE',
  customer_id: 'MODIFY_CUSTOMER_ID',
  breed_id: 'MODIFY_BREED_ID',
  sex: 'MODIFY_SEX',
  ce: 'MODIFY_CE',
  pet_image: 'MODIFY_PET_IMAGE',
  observations: 'MODIFY_OBSERVATIONS',
}

function reducer(state, action) {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.id:
      return { ...state, id: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.name:
      return { ...state, name: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.age:
      return { ...state, age: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.customer_id:
      return { ...state, customer_id: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.breed_id:
      return { ...state, breed_id: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.sex:
      return { ...state, sex: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.ce:
      return { ...state, ce: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.pet_image:
      return { ...state, pet_image: action.payload || '' }
      break;
    case REDUCER_ACTION_TYPE.observations:
      return { ...state, observations: action.payload || '' }
      break;
    default:
      return state;
  }
}

export default function PetModal({ pet, option, open, setOpen, setMustLoad, setHelper }) {

  const options = {
    method: option === 'Crear' ? 'POST' : 'POST',
    url: !(option === 'Actualizar') ? '/pets/store' : '/pets/update',
    sucessMessage: option === 'Crear' ? 'Mascota agregada' : 'Mascota actualizada',
    loadingMessage: !(option === 'Actualizar') ? 'Agregando mascota' : 'Actualizando mascota',
  }

  const [openCustomer, setOpenCustomer] = useState(false)
  const [openBreed, setOpenBreed] = useState(false)

  const [state, dispatch] = useReducer(reducer, pet)
  const [isLoading, setIsLoading] = useState(false)
  const [filterCustomer, setFilterCustomer] = useState('name')
  const [inputCustomer, setInputCustomer] = useState('')
  const [helperCustomer, setHelperCustomer] = useState(1)
  const [mustSearchCustomer, setMustSearchCustomer] = useState(false)
  const [helperSearchCustomer, setHelperSearchCustomer] = useState(false)
  const { debounceValue: debounceValueCustomer } = useDebounce(inputCustomer, 400)
  const { data: dataCustomer, loading: loadingCustomer } = useFetchData(`/customers/list?filter=${filterCustomer}&inputFilter=${debounceValueCustomer}`, [helperCustomer], helperSearchCustomer)
  const [inputBreed, setInputBreed] = useState('')
  const [helperBreed, setHelperBreed] = useState(1)
  const [mustSearchBreed, setMustSearchBreed] = useState(false)
  const [helperSearchBreed, setHelperSearchBreed] = useState(false)
  const { debounceValue: debounceValueBreed } = useDebounce(inputBreed, 400)
  const { data: dataBreed, loading: loadingBreed } = useFetchData(`/breeds/list?filter=name&inputFilter=${debounceValueBreed}`, [helperBreed], helperSearchBreed)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    const loadingToastId = toast(<Spinner message={options.loadingMessage} />, { autoClose: 30000, hideProgressBar: true, });

    fetchHelper(options.method, options.url, state, true)
      .then((data) => {
        if (data.errors) {
          return toast.update(loadingToastId, { render: <><ToastifyErrorList data={data.errors} /></>, type: toast.TYPE.ERROR, autoClose: 3000, hideProgressBar: false, })
        }
        toast.update(loadingToastId, { render: options.sucessMessage, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
        setMustLoad(false)
        setHelper((prev) => prev + 1)
        setOpen(false)
      })
      .catch((err) => {
        console.log(err);
        toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!loadingCustomer && mustSearchCustomer) {
      setHelperCustomer((prev) => prev + 1)
    }
  }, [debounceValueCustomer])

  useEffect(() => {
    if (!loadingBreed && mustSearchBreed) {
      setHelperBreed((prev) => prev + 1)
    }
  }, [debounceValueBreed])

  useEffect(() => {
    if (!!pet.customer?.name) {
      setInputCustomer(pet.customer?.name)
    } else {
      setInputCustomer('')
    }
    if (!!pet.breed?.name) {
      setInputBreed(pet.breed?.name)
    } else {
      setInputBreed('')
    }
    const petImageInput = document.getElementById('pet_image')
    petImageInput.value = ''
    for (const key in REDUCER_ACTION_TYPE) {
      const actionType = REDUCER_ACTION_TYPE[key]
      const payload = pet.hasOwnProperty(key) ? pet[key] : ''
      dispatch({
        type: actionType,
        payload: payload,
      })
    }
  }, [pet])

  return (
    <>
      <Modal option={option} open={open} setOpen={setOpen} isLoading={isLoading} handleSubmit={handleSubmit} icon={faDog} text={'Mascota'}>
        <div className='relative border border-gray-600 rounded w-full order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.name}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.name,
                payload: e.target.value
              })
            }}
            required autoFocus />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Nombre
          </label>
        </div>

        <div className='relative border border-gray-600 rounded w-full order-1'>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            value={state.age}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.age,
                payload: e.target.value
              })
            }}
            required />
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Edad
          </label>
        </div>

        <div className='relative w-full col-span-full grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <ReactSelect setMustSearch={setMustSearchCustomer} filters={[
            {
              tag: 'Nombre del dueño',
              value: 'name',
            },
            {
              tag: 'Número de documento',
              value: 'document_number',
            },
          ]} filter={filterCustomer} setFilter={setFilterCustomer} input={inputCustomer} setInput={setInputCustomer} label={'Dueño'} setHelperSearch={setHelperSearchCustomer} setHelper={setHelperCustomer} css={'w-full col-span-full order-1 pe-10'} listStyle={'w-full max-h-72 z-20'}>
            {
              loadingCustomer
                ?
                <div className='w-full sm:w-1/2 mx-auto py-4'>
                  <Spinner message={'Buscando a los clientes ...'} />
                </div>
                :
                dataCustomer.data?.length === 0
                  ?
                  <h3 className='cursor-pointer py-4 text-center'>No hay clientes con este dato ...</h3>
                  :
                  <ul className='px-5 py-2'>
                    {
                      dataCustomer.data?.map((el, index) => (
                        <li
                          key={index} className={`cursor-pointer hover:bg-slate-600 rounded p-2 ${state.customer_id === el.id && 'bg-slate-600'}`}
                          onClick={() => {
                            dispatch({
                              type: REDUCER_ACTION_TYPE.customer_id,
                              payload: el.id
                            })
                            setMustSearchCustomer(false)
                            setInputCustomer(el.name)
                          }
                          }
                        >{`${el.name} - ${el.identity_document ? `${el.identity_document.abbreviation}: ${el.document_number}` : ''}`}</li>))
                    }
                  </ul>
            }
          </ReactSelect>
          <button type='button' className='order-1 absolute bottom-1 right-12 bg-gray-100 rounded-full px-2 py-1 z-10 hover:bg-gray-300'
              onClick={() => setOpenCustomer(true)}>
              <Icon icon={faUserPlus} />
          </button>
        </div>
        <div className='absolute'>
          <AddCustomer customer={{ ...initialStateCustomer }} option={'Crear'} open={openCustomer} setOpen={setOpenCustomer} actions={false} mustBeToast={false} focus={false} />
        </div>

        <div className='relative w-full col-span-full grid grid-cols-1 sm:grid-cols-2 gap-6 order-1'>
          <ReactSelect setMustSearch={setMustSearchBreed}filters={[
          {
            tag: 'Nombre de la raza',
            value: 'name',
          },
        ]} filter='name' input={inputBreed} setInput={setInputBreed} label={'Raza'} setHelperSearch={setHelperSearchBreed} setHelper={setHelperBreed} listStyle={'w-full max-h-72'}>
            {
              loadingBreed
                ?
                <div className='w-full sm:w-1/2 mx-auto py-4'>
                  <Spinner message={'Buscando a las razas ...'} />
                </div>
                :
                dataBreed.data?.length === 0
                  ?
                  <h3 className='cursor-pointer py-4 text-center'>No hay razas con este dato ...</h3>
                  :
                  <ul className='px-5 py-2'>
                    {
                      dataBreed.data?.map((el, index) => (
                        <li
                          key={index} className={`cursor-pointer hover:bg-slate-600 rounded p-2 ${state.breed_id === el.id && 'bg-slate-600'}`}
                          onClick={() => {
                            dispatch({
                              type: REDUCER_ACTION_TYPE.breed_id,
                              payload: el.id
                            })
                            setMustSearchBreed(false)
                            setInputBreed(el.name)
                          }
                          }
                        >{el.name}</li>))
                    }
                  </ul>
            }
          </ReactSelect>
          <button type='button' className='order-1 absolute bottom-1 right-12 bg-gray-100 rounded-full px-2 py-1 z-10 hover:bg-gray-300'
              onClick={() => setOpenBreed(true)}>
              <Icon icon={faShieldCat} size='22px' />
          </button>
        </div>
        <div className='absolute'>
          <AddBreed breed={{ ...initialStateBreed }} option={'Crear'} open={openBreed} setOpen={setOpenBreed} actions={false} mustBeToast={false} focus={false} />
        </div>

        <Selector
          message={'Sexo'}
          filters={[
            {
              tag: 'Macho',
              value: 'Macho'
            },
            {
              tag: 'Hembra',
              value: 'Hembra'
            },
          ]}
          filter={state.sex}
          setFilter={(value) => dispatch({
            type: REDUCER_ACTION_TYPE.sex,
            payload: value
          })} />

        <Selector
          message={'C/E'}
          filters={[
            {
              tag: state.sex == 'Hembra' ? 'Esterilizada' : 'Castrado',
              value: state.sex == 'Hembra' ? 'Esterilizada' : 'Castrado',
            },
            {
              tag: 'Entero',
              value: 'Entero'
            },
          ]}
          filter={state.ce}
          setFilter={(value) => dispatch({
            type: REDUCER_ACTION_TYPE.ce,
            payload: value
          })} />

        <div className='relative border border-gray-600 rounded w-full col-span-full order-1'>
          <input type='file' className='hidden' id='pet_image' accept='image/*'
            onChange={(e) => {
              const file = e.target.files && e.target.files[0]
              dispatch({
                type: REDUCER_ACTION_TYPE.pet_image,
                payload: file
              })
            }}
          />
          <label htmlFor='pet_image' className='cursor-pointer block w-full py-2 text-center text-gray-600 bg-transparent rounded transition duration-200 ease-in-out hover:bg-gray-300'>
            --- Seleccionar foto (opcional) ---
          </label>
        </div>

        {
          state.pet_image && (
            <img src={URL.createObjectURL(state.pet_image)} alt='mascota' className='order-1 w-3/5 col-span-full mx-auto rounded-lg' />
          )
        }

        <div className='relative border border-gray-600 rounded w-full col-span-full order-1'>
          <textarea
            className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
            rows='4'
            value={state.observations}
            onChange={(e) => {
              dispatch({
                type: REDUCER_ACTION_TYPE.observations,
                payload: e.target.value
              })
            }}
          ></textarea>
          <label
            className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
          >
            Observaciones (opcional)
          </label>
        </div>
      </Modal>
      <Modal.ToastifyModal />
    </>
  )
}
