import { useEffect, useReducer, useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { fetchHelper } from '../../utils/utils';
import ToastifyErrorList from '../ToastifyErrorList';
import Spinner from '../presentational/Spinner';
import { faBook } from '@fortawesome/free-solid-svg-icons'
import useDebounce from '../useDebounce';
import useFetchData from '../../utils/useFetchData';
import ReactSelect from '../ReactSelect';
import CheckBox from '../CheckBox';
import Selector from '../Selector';
import SectionData from '../SectionData'
import ImageModal from '../ImageModal';

const values = {
  consul: 'consulta',
  diag: 'diagnostico',
  plan: 'plan',
}

const REDUCER_ACTION_TYPE = {
  id: 'MODIFY_ID',
  pet_id: 'MODIFY_PET_ID',
  last_deworming: 'MODIFY_LAST_DEWORMING',
  reason: 'MODIFY_REASON',
  awareness: 'MODIFY_AWARENESS',
  weight: 'MODIFY_WEIGHT',
  mucosa: 'MODIFY_MUCOSA',
  tllc: 'MODIFY_TLLC',
  fc: 'MODIFY_FC',
  fr: 'MODIFY_FR',
  spo2: 'MODIFY_SPO2',
  temperature: 'MODIFY_TEMPERATURE',
  card_con: 'MODIFY_CARD_CON',
  temper: 'MODIFY_TEMPER',
  state: 'MODIFY_STATE',
  linfonodulos: 'MODIFY_LINFONODULOS',
  aus_card: 'MODIFY_AUS_CARD',
  aus_resp: 'MODIFY_AUS_RESP',
  tegumento: 'MODIFY_TEGUMENTO',
  palpacion_abd: 'MODIFY_PALPACION_ABD',
  diagnostico: 'MODIFY_DIAGNOSTICO',
  hto: 'MODIFY_HTO',
  glucosa: 'MODIFY_GLUCOSA',
  pt: 'MODIFY_PT',
  du_refrac: 'MODIFY_DU_REFRAC',
  frotis: 'MODIFY_FROTIS',
  hemograma: 'MODIFY_HEMOGRAMA',
  hemograma_image_url: 'MODIFY_HEMOGRAMA_IMAGE_URL',
  ecografia: 'MODIFY_ECOGRAFIA',
  ecografia_image_url: 'MODIFY_ECOGRAFIA_IMAGE_URL',
  abdominal: 'MODIFY_ABDOMINAL',
  gestacional: 'MODIFY_GESTACIONAL',
  ecofast: 'MODIFY_ECOFAST',
  tfast: 'MODIFY_TFAST',
  vetbles: 'MODIFY_VETBLES',
  bioquimica: 'MODIFY_BIOQUIMICA',
  radiografias: 'MODIFY_RADIOGRAFIAS',
  radiografias_image_url: 'MODIFY_RADIOGRAFIAS_IMAGE_URL',
  vistas: 'MODIFY_VISTAS',
  zona: 'MODIFY_ZONA',
  electrolitos: 'MODIFY_ELECTROLITOS',
  bilir: 'MODIFY_BILIR',
  ceto: 'MODIFY_CETO',
  sang: 'MODIFY_SANG',
  prot: 'MODIFY_PROT',
  nitri: 'MODIFY_NITRI',
  leu: 'MODIFY_LEU',
  glu: 'MODIFY_GLU',
  ph: 'MODIFY_PH',
  plan: 'MODIFY_PLAN',
  next_date: 'MODIFY_NEXT_DATE',
}

function reducer(state, action) {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.id:
      return { ...state, id: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.pet_id:
      return { ...state, pet_id: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.last_deworming:
      return { ...state, last_deworming: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.reason:
      return { ...state, reason: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.awareness:
      return { ...state, awareness: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.weight:
      return { ...state, weight: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.mucosa:
      return { ...state, mucosa: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.tllc:
      return { ...state, tllc: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.fc:
      return { ...state, fc: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.fr:
      return { ...state, fr: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.spo2:
      return { ...state, spo2: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.temperature:
      return { ...state, temperature: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.card_con:
      return { ...state, card_con: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.temper:
      return { ...state, temper: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.state:
      return { ...state, state: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.linfonodulos:
      return { ...state, linfonodulos: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.aus_card:
      return { ...state, aus_card: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.aus_resp:
      return { ...state, aus_resp: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.tegumento:
      return { ...state, tegumento: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.palpacion_abd:
      return { ...state, palpacion_abd: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.diagnostico:
      return { ...state, diagnostico: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.hto:
      return { ...state, hto: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.glucosa:
      return { ...state, glucosa: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.pt:
      return { ...state, pt: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.du_refrac:
      return { ...state, du_refrac: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.frotis:
      return { ...state, frotis: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.hemograma:
      return { ...state, hemograma: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.hemograma_image_url:
      return { ...state, hemograma_image_url: action.payload ?? '' }
      break
    case REDUCER_ACTION_TYPE.ecografia:
      return { ...state, ecografia: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.ecografia_image_url:
      return { ...state, ecografia_image_url: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.abdominal:
      return { ...state, abdominal: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.gestacional:
      return { ...state, gestacional: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.ecofast:
      return { ...state, ecofast: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.tfast:
      return { ...state, tfast: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.vetbles:
      return { ...state, vetbles: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.bioquimica:
      return { ...state, bioquimica: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.radiografias:
      return { ...state, radiografias: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.radiografias_image_url:
      return { ...state, radiografias_image_url: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.vistas:
      return { ...state, vistas: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.zona:
      return { ...state, zona: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.electrolitos:
      return { ...state, electrolitos: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.bilir:
      return { ...state, bilir: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.ceto:
      return { ...state, ceto: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.sang:
      return { ...state, sang: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.prot:
      return { ...state, prot: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.nitri:
      return { ...state, nitri: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.leu:
      return { ...state, leu: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.glu:
      return { ...state, glu: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.ph:
      return { ...state, ph: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.plan:
      return { ...state, plan: action.payload ?? '' }
      break;
    case REDUCER_ACTION_TYPE.next_date:
      return { ...state, next_date: action.payload ?? '' }
      break;
    default:
      return state;
  }
}

export default function PetHistoryModal({ petHistory, option, open, setOpen, setMustLoad, setHelper }) {

  const options = {
    method: option === 'Crear' ? 'POST' : 'POST',
    url: !(option === 'Actualizar') ? '/pet_histories/store' : '/pet_histories/update',
    sucessMessage: option === 'Crear' ? 'Historial agregado' : 'Historial actualizado',
    loadingMessage: !(option === 'Actualizar') ? 'Agregando historial' : 'Actualizando historial',
  }

  const [optionSearch, setOptionSearch] = useState(values.consul)
  const [state, dispatch] = useReducer(reducer, petHistory)
  const [isLoading, setIsLoading] = useState(false)
  const [filterPet, setFilterPet] = useState('name')
  const [inputPet, setInputPet] = useState('')
  const [helperPet, setHelperPet] = useState(1)
  const [mustSearchPet, setMustSearchPet] = useState(false)
  const [helperSearchPet, setHelperSearchPet] = useState(false)
  const { debounceValue: debounceValuePet } = useDebounce(inputPet, 400)
  const { data: dataPet, loading: loadingPet } = useFetchData(`/pets/list?filter=${filterPet}&inputFilter=${debounceValuePet}`, [helperPet], helperSearchPet)

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
    if (!loadingPet && mustSearchPet) {
      setHelperPet((prev) => prev + 1)
    }
  }, [debounceValuePet])

  useEffect(() => {
    if (!!petHistory.pet?.name) {
      setInputPet(petHistory.pet?.name)
    } else {
      setInputPet('')
    }
    for (const key in REDUCER_ACTION_TYPE) {
      const actionType = REDUCER_ACTION_TYPE[key]
      const payload = petHistory.hasOwnProperty(key) ? petHistory[key] : ''
      dispatch({
        type: actionType,
        payload: payload,
      })
    }
  }, [petHistory])

  return (
    <>
      <Modal option={option} open={open} setOpen={setOpen} isLoading={isLoading} handleSubmit={handleSubmit} icon={faBook} text={'Historial'} width={'max-w-7xl'} height={'max-h-[95vh]'}>

        <div className='col-span-full'>
          <Pages names={[
            {
              name: 'Consulta',
              value: values.consul
            },
            {
              name: 'Diagnóstico',
              value: values.diag
            },
            {
              name: 'Plan / Cita',
              value: values.plan
            },
          ]} optionSearch={optionSearch} setOptionSearch={setOptionSearch} />

          <hr className='mt-5 mb-2' />
        </div>

        {
          optionSearch === values.consul
            ?
            <>
              <div className='relative w-full col-span-1 order-1 flex flex-col gap-6'>
                <ReactSelect setMustSearch={setMustSearchPet} filters={[
                  {
                    tag: 'Nombre de la mascota',
                    value: 'name',
                  },
                  {
                    tag: 'Nombre del dueño',
                    value: 'customer_id',
                  },
                  {
                    tag: 'Número de documento',
                    value: 'document_number',
                  }
                ]} filter={filterPet} setFilter={setFilterPet} input={inputPet} setInput={setInputPet} label={'Mascota'} setHelperSearch={setHelperSearchPet} setHelper={setHelperPet} listStyle={'w-full sm:w-[150%] xl:w-full max-h-96'}>
                  {
                    loadingPet
                      ?
                      <div className='w-full sm:w-1/2 mx-auto py-4'>
                        <Spinner message={'Buscando a las mascotas ...'} />
                      </div>
                      :
                      dataPet.data?.length === 0
                        ?
                        <h3 className='cursor-pointer py-4 text-center'>No hay mascotas con este dato ...</h3>
                        :
                        <ul className='px-5 py-2'>
                          {
                            dataPet.data?.map((el, index) => (
                              <li
                                key={index} className='cursor-pointer hover:bg-slate-600 p-2 border-b rounded-lg'
                                onClick={() => {
                                  dispatch({
                                    type: REDUCER_ACTION_TYPE.pet_id,
                                    payload: el.id
                                  })
                                  setMustSearchPet(false)
                                  setInputPet(el.name)
                                }
                                }
                              >
                                <article className='flex flex-col sm:flex-row justify-center sm:justify-start items-center'>
                                  <img src={el.pet_image_url || '/image/mascota.webp'} alt={el.name} width='150px' className='rounded-lg object-contain mb-6 sm:mb-0 sm:me-10' />
                                  <div className='flex flex-col items-start'>
                                    <p> <strong>Nombre:</strong> {`${el.name}`}</p>
                                    <p> <strong>Dueño:</strong> {el.customer?.name}</p>
                                    <p>{el.customer?.identity_document?.abbreviation}: {el?.customer?.document_number}</p>
                                  </div>
                                </article>
                              </li>))
                          }
                        </ul>
                  }
                </ReactSelect>
              </div>

              <div className='relative border rounded w-full col-span-1 order-1'>
                <textarea
                  className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                  rows='4'
                  required
                  value={state.reason}
                  onChange={(e) => {
                    dispatch({
                      type: REDUCER_ACTION_TYPE.reason,
                      payload: e.target.value
                    })
                  }}
                ></textarea>
                <label
                  className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
                >
                  Motivo de consulta
                </label>
              </div>

              <div className='relative border rounded w-full col-span-full order-1'>
                <input
                  type='datetime-local'
                  className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                  value={state.last_deworming}
                  onChange={(e) => {
                    dispatch({
                      type: REDUCER_ACTION_TYPE.last_deworming,
                      payload: e.target.value
                    })
                  }}
                />
                <label
                  className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out -translate-y-[1.8rem] scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 text-primary'
                >
                  Fecha de desparasitación (opcional)
                </label>
              </div>

              <Selector
                message={'Conciencia'}
                filters={[
                  {
                    tag: 'Alerta',
                    value: 'Alerta'
                  },
                  {
                    tag: 'Aletargado',
                    value: 'Aletargado'
                  },
                  {
                    tag: 'Comatoso',
                    value: 'Comatoso'
                  },
                ]}
                filter={state.awareness}
                setFilter={(value) => dispatch({
                  type: REDUCER_ACTION_TYPE.awareness,
                  payload: value
                })}
              />

              <div className='relative w-full col-span-full order-1'>
                <label
                  className='pointer-events-none absolute left-3 top-2 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out -translate-y-[1.8rem] scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 text-primary'
                >
                  Triaje (opcional)
                </label>
                <SectionData.Table>
                  <SectionData.HeaderTable names={['Peso', 'Mucosa', 'tiempo de llenado capilar', 'frecuencia cardiaca', 'frecuencia respiratoria']} />
                  <SectionData.TableBody>
                    <tr>
                      <td className='whitespace-no-wrap border-r border-b border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden mx-auto text-center'
                          value={state.weight}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.weight,
                            payload: e.target.value
                          })}
                        />
                      </td>
                      <td className='whitespace-no-wrap border-r border-b border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden mx-auto text-center'
                          value={state.mucosa}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.mucosa,
                            payload: e.target.value
                          })}
                        />
                      </td>
                      <td className='whitespace-no-wrap border-r border-b border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden mx-auto text-center'
                          value={state.tllc}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.tllc,
                            payload: e.target.value
                          })}
                        />
                      </td>
                      <td className='whitespace-no-wrap border-r border-b border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden mx-auto text-center'
                          value={state.fc}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.fc,
                            payload: e.target.value
                          })}
                        />
                      </td>
                      <td className='whitespace-no-wrap border-r border-b border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden mx-auto text-center'
                          value={state.fr}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.fr,
                            payload: e.target.value
                          })}
                        />
                      </td>
                    </tr>
                  </SectionData.TableBody>
                  <SectionData.HeaderTable names={['%SPO2', 'Temperatura', 'cardipatia congenita', 'Temperamento', '']} />
                  <SectionData.TableBody>
                    <tr>
                      <td className='whitespace-no-wrap border-r border-b border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden mx-auto text-center'
                          value={state.spo2}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.spo2,
                            payload: e.target.value
                          })}
                        />
                      </td>
                      <td className='whitespace-no-wrap border-r border-b border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden mx-auto text-center'
                          value={state.temperature}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.temperature,
                            payload: e.target.value
                          })}
                        />
                      </td>
                      <td className='whitespace-no-wrap border-r border-b border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden mx-auto text-center'
                          value={state.card_con}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.card_con,
                            payload: e.target.value
                          })}
                        />
                      </td>
                      <td className='whitespace-no-wrap border-r border-b border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden mx-auto text-center'
                          value={state.temper}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.temper,
                            payload: e.target.value
                          })}
                        />
                      </td>
                      <td className='whitespace-no-wrap border-r border-b border-gray-200'>
                      </td>
                    </tr>
                  </SectionData.TableBody>
                </SectionData.Table>
              </div>

              <Selector
                message={'Estado'}
                filters={[
                  {
                    tag: 'Ambulatorio',
                    value: 'Ambulatorio'
                  },
                  {
                    tag: 'Internado',
                    value: 'Internado'
                  },
                  {
                    tag: 'Crítico',
                    value: 'Crítico'
                  },
                ]}
                filter={state.state}
                setFilter={(value) => dispatch({
                  type: REDUCER_ACTION_TYPE.state,
                  payload: value
                })}
              />

              <div className='relative w-full col-span-full order-1'>
                <label
                  className='pointer-events-none absolute left-3 top-2 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out -translate-y-[1.8rem] scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 text-primary'
                >
                  Examen fisico (opcional)
                </label>
                <SectionData.Table>
                  <SectionData.HeaderTable names={['', 'Descripción']} />
                  <SectionData.TableBody>
                    <tr>
                      <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 max-w-32'>
                        linfonódulos
                      </td>
                      <td className='whitespace-no-wrap border-b border-l border-gray-200'
                      >
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 min-w-full overflow-hidden'
                          value={state.linfonodulos}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.linfonodulos,
                            payload: e.target.value
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 max-w-32'

                      >
                        auscultación cardiaca
                      </td>
                      <td className='whitespace-no-wrap border-b border-l border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 min-w-full overflow-hidden'
                          value={state.aus_card}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.aus_card,
                            payload: e.target.value
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 max-w-32'
                      >
                        tegumento
                      </td>
                      <td className='whitespace-no-wrap border-b border-l border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 min-w-full overflow-hidden'
                          value={state.tegumento}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.tegumento,
                            payload: e.target.value
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 max-w-32'
                      >
                        palpación abdominal
                      </td>
                      <td className='whitespace-no-wrap border-b border-l border-gray-200'>
                        <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 min-w-full overflow-hidden'
                          value={state.palpacion_abd}
                          onChange={(e) => dispatch({
                            type: REDUCER_ACTION_TYPE.palpacion_abd,
                            payload: e.target.value
                          })}
                        />
                      </td>
                    </tr>
                  </SectionData.TableBody>
                </SectionData.Table>
              </div>
            </>
            :
            optionSearch === values.diag
              ?
              <>
                <div className='relative border rounded w-full col-span-full order-1'>
                  <textarea
                    className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                    rows='auto'
                    value={state.diagnostico}
                    onChange={(e) => {
                      dispatch({
                        type: REDUCER_ACTION_TYPE.diagnostico,
                        payload: e.target.value
                      })
                    }}
                  ></textarea>
                  <label
                    className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
                  >
                    Diagnóstico presuntivo (opcional)
                  </label>
                </div>

                <div className='relative w-full col-span-full order-1'>
                  <label
                    className='pointer-events-none absolute left-3 top-2 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out -translate-y-[1.8rem] scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 text-primary'
                  >
                    Examen (opcional)
                  </label>
                  <SectionData.Table>
                    <SectionData.HeaderTable names={['Examen', 'Nivel', 'Referencias']} />
                    <SectionData.TableBody>
                      <tr>
                        <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 max-w-32'>
                          HTO
                        </td>
                        <td className='whitespace-no-wrap border-b border-x border-gray-200'
                        >
                          <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 min-w-full overflow-hidden text-center'
                            value={state.hto}
                            onChange={(e) => {
                              dispatch({
                                type: REDUCER_ACTION_TYPE.hto,
                                payload: e.target.value
                              })
                            }}
                          />
                        </td>
                        <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 min-w-60'
                        >
                          37 - 55%
                        </td>
                      </tr>

                      <tr>
                        <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 max-w-32'>
                          GLUCOSA
                        </td>
                        <td className='whitespace-no-wrap border-b border-x border-gray-200'
                        >
                          <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 min-w-full overflow-hidden text-center'
                            value={state.glucosa}
                            onChange={(e) => {
                              dispatch({
                                type: REDUCER_ACTION_TYPE.glucosa,
                                payload: e.target.value
                              })
                            }}
                          />
                        </td>
                        <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 min-w-60'
                        >
                          60 - 120
                        </td>
                      </tr>

                      <tr>
                        <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 max-w-32'>
                          tiempo de protombina
                        </td>
                        <td className='whitespace-no-wrap border-b border-x border-gray-200'
                        >
                          <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 min-w-full overflow-hidden text-center'
                            value={state.pt}
                            onChange={(e) => {
                              dispatch({
                                type: REDUCER_ACTION_TYPE.pt,
                                payload: e.target.value
                              })
                            }}
                          />
                        </td>
                        <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 min-w-60'
                        >
                          5.6 - 9
                        </td>
                      </tr>

                      <tr>
                        <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 max-w-32'>
                          DU REFRACTÓMETRO
                        </td>
                        <td className='whitespace-no-wrap border-b border-x border-gray-200'
                        >
                          <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 min-w-full overflow-hidden text-center'
                            value={state.du_refrac}
                            onChange={(e) => {
                              dispatch({
                                type: REDUCER_ACTION_TYPE.du_refrac,
                                payload: e.target.value
                              })
                            }}
                          />
                        </td>
                        <td className='text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 min-w-60 '
                        >
                          <div className='flex justify-between'>
                            <div className='w-1/2 flex flex-col border-r-2 border-gray-200'>
                              <p>PERRO</p>
                              1.015 - 1.045
                            </div>
                            <div className='w-1/2 flex flex-col'>
                              <p>GATO</p>
                              1.035 - 1.06
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className='px-3 py-3 text-center text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50 max-w-32'>
                          FROTIS
                        </td>
                        <td className='whitespace-no-wrap border-b border-x border-gray-200'
                          colSpan={2}
                        >
                          <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 min-w-full overflow-hidden'
                            value={state.frotis}
                            onChange={(e) => {
                              dispatch({
                                type: REDUCER_ACTION_TYPE.frotis,
                                payload: e.target.value
                              })
                            }}
                          />
                        </td>
                      </tr>

                    </SectionData.TableBody>
                  </SectionData.Table>
                </div>

                <div className='relative border rounded w-full col-span-full order-1 mt-2'>
                  <label
                    className='pointer-events-none max-w-[90%] absolute left-3 top-0 mb-0 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-200 -translate-y-[1.8rem] scale-[0.9] '
                  >
                    Exámenes complementarios (opcional)
                  </label>
                  <div className='grid grid-cols-1 sm:grid-cols-3 p-5 gap-x-5 gap-y-7'>
                    <div className='order-1 flex flex-col'>
                      <CheckBox
                        id={1}
                        message={'HEMOGRAMA'}
                        checked={state.hemograma}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.hemograma,
                            payload: e.target.checked ? 1 : 0
                          })
                        }}
                      />
                      {
                        state.hemograma ?
                          <CheckedBoxImage id={1} image={state.hemograma_image_url} onChangeFunc={(img) => dispatch({
                            type: REDUCER_ACTION_TYPE.hemograma_image_url,
                            payload: img
                          })} /> : null
                      }
                    </div>

                    <div className='order-1 flex flex-col'>
                      <CheckBox
                        id={2}
                        message={'ECOGRAFÍA'}
                        checked={state.ecografia}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.ecografia,
                            payload: e.target.checked ? 1 : 0
                          })
                        }}
                      />
                      {
                        state.ecografia ?
                          <CheckedBoxImage id={2} image={state.ecografia_image_url} onChangeFunc={(img) => dispatch({
                            type: REDUCER_ACTION_TYPE.ecografia_image_url,
                            payload: img
                          })} /> : null
                      }
                    </div>

                    <div className='order-1 flex flex-col'>
                      <CheckBox
                        id={9}
                        message={'RADIOGRAFÍA'}
                        checked={state.radiografias}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.radiografias,
                            payload: e.target.checked ? 1 : 0
                          })
                        }}
                      />
                      {
                        state.radiografias ?
                          <CheckedBoxImage id={9} image={state.radiografias_image_url} onChangeFunc={(img) => dispatch({
                            type: REDUCER_ACTION_TYPE.radiografias_image_url,
                            payload: img
                          })} /> : null
                      }
                    </div>

                    <div className='order-1 flex flex-col'>
                      <CheckBox
                        id={3}
                        message={'ABDOMINAL'}
                        checked={state.abdominal}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.abdominal,
                            payload: e.target.checked ? 1 : 0
                          })
                        }}
                      />
                    </div>

                    <div className='order-1 flex flex-col'>
                      <CheckBox
                        id={4}
                        message={'GESTACIONAL'}
                        checked={state.gestacional}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.gestacional,
                            payload: e.target.checked ? 1 : 0
                          })
                        }}
                      />
                    </div>

                    <div className='order-1 flex flex-col'>
                      <CheckBox
                        id={5}
                        message={'ECOFAST'}
                        checked={state.ecofast}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.ecofast,
                            payload: e.target.checked ? 1 : 0
                          })
                        }}
                      />
                    </div>

                    <div className='order-1 flex flex-col'>
                      <CheckBox
                        id={6}
                        message={'TFAST'}
                        checked={state.tfast}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.tfast,
                            payload: e.target.checked ? 1 : 0
                          })
                        }}
                      />
                    </div>

                    <div className='order-1 flex flex-col'>
                      <CheckBox
                        id={7}
                        message={'VETBLES'}
                        checked={state.vetbles}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.vetbles,
                            payload: e.target.checked ? 1 : 0
                          })
                        }}
                      />
                    </div>

                    <div className='order-1 flex flex-col'>
                      <CheckBox
                        id={8}
                        message={'BIOQUÍMICA'}
                        checked={state.bioquimica}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.bioquimica,
                            payload: e.target.checked ? 1 : 0
                          })
                        }}
                      />
                    </div>

                    <div className='relative border rounded w-full col-span-full md:col-span-1 order-1'>
                      <input
                        type='text'
                        className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                        value={state.vistas}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.vistas,
                            payload: e.target.value
                          })
                        }}
                      />
                      <label
                        className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
                      >
                        Vistas
                      </label>
                    </div>

                    <div className='relative border rounded w-full col-span-full md:col-span-2  order-1'>
                      <input
                        type='text'
                        className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                        value={state.zona}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.zona,
                            payload: e.target.value
                          })
                        }}
                      />
                      <label
                        className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
                      >
                        Zona
                      </label>
                    </div>

                    <div className='relative border rounded w-full col-span-full order-1'>
                      <input
                        type='text'
                        className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                        value={state.electrolitos}
                        onChange={(e) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.electrolitos,
                            payload: e.target.value
                          })
                        }}
                      />
                      <label
                        className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
                      >
                        ELECTROLITOS (Na, K, CL)
                      </label>
                    </div>

                    <div className='relative w-full col-span-full order-1'>
                      <label
                        className='pointer-events-none absolute left-3 top-2 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out -translate-y-[1.8rem] scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 text-primary'
                      >
                        UROANÁLISIS
                      </label>
                      <SectionData.Table>
                        <SectionData.HeaderTable names={['', '', '', 'TIRA DE ORINA', '', '', '', '']} />
                        <SectionData.HeaderTable names={['BILIR', 'CETO', 'SANG', 'PROT', 'NITRI', 'LEU', 'GLU', 'PH']} />
                        <SectionData.TableBody>
                          <tr>
                            <td className='whitespace-no-wrap border-b border-gray-200'>
                              <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden text-center'
                                value={state.bilir}
                                onChange={(e) => {
                                  dispatch({
                                    type: REDUCER_ACTION_TYPE.bilir,
                                    payload: e.target.value
                                  })
                                }}
                              />
                            </td>
                            <td className='whitespace-no-wrap border-b border-x border-gray-200'>
                              <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden text-center'
                                value={state.ceto}
                                onChange={(e) => {
                                  dispatch({
                                    type: REDUCER_ACTION_TYPE.ceto,
                                    payload: e.target.value
                                  })
                                }}
                              />
                            </td>
                            <td className='whitespace-no-wrap border-b border-x border-gray-200'>
                              <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden text-center'
                                value={state.sang}
                                onChange={(e) => {
                                  dispatch({
                                    type: REDUCER_ACTION_TYPE.sang,
                                    payload: e.target.value
                                  })
                                }}
                              />
                            </td>
                            <td className='whitespace-no-wrap border-b border-x border-gray-200'>
                              <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden text-center'
                                value={state.prot}
                                onChange={(e) => {
                                  dispatch({
                                    type: REDUCER_ACTION_TYPE.prot,
                                    payload: e.target.value
                                  })
                                }}
                              />
                            </td>
                            <td className='whitespace-no-wrap border-b border-x border-gray-200'>
                              <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden text-center'
                                value={state.nitri}
                                onChange={(e) => {
                                  dispatch({
                                    type: REDUCER_ACTION_TYPE.nitri,
                                    payload: e.target.value
                                  })
                                }}
                              />
                            </td>
                            <td className='whitespace-no-wrap border-b border-x border-gray-200'>
                              <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden text-center'
                                value={state.leu}
                                onChange={(e) => {
                                  dispatch({
                                    type: REDUCER_ACTION_TYPE.leu,
                                    payload: e.target.value
                                  })
                                }}
                              />
                            </td>
                            <td className='whitespace-no-wrap border-b border-x border-gray-200'>
                              <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden text-center'
                                value={state.glu}
                                onChange={(e) => {
                                  dispatch({
                                    type: REDUCER_ACTION_TYPE.glu,
                                    payload: e.target.value
                                  })
                                }}
                              />
                            </td>
                            <td className='whitespace-no-wrap border-b border-x border-gray-200'>
                              <input type="text" className='px-2 py-4 text-sm leading-5 text-gray-900 w-full overflow-hidden text-center'
                                value={state.ph}
                                onChange={(e) => {
                                  dispatch({
                                    type: REDUCER_ACTION_TYPE.ph,
                                    payload: e.target.value
                                  })
                                }}
                              />
                            </td>
                          </tr>
                        </SectionData.TableBody>
                      </SectionData.Table>
                    </div>
                  </div>
                </div>
              </>
              :
              optionSearch === values.plan
                ?
                <>
                  <div className='relative border rounded w-full col-span-full order-1'>
                    <textarea
                      className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                      rows='12'
                      value={state.plan}
                      onChange={(e) => {
                        dispatch({
                          type: REDUCER_ACTION_TYPE.plan,
                          payload: e.target.value
                        })
                      }}
                    ></textarea>
                    <label
                      className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
                    >
                      Plan de tratamiento (opcional)
                    </label>
                  </div>
                  <div className='relative border rounded w-full col-span-full order-1'>
                    <input
                      type='datetime-local'
                      className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-200 placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                      value={state.next_date}
                      onChange={(e) => {
                        dispatch({
                          type: REDUCER_ACTION_TYPE.next_date,
                          payload: e.target.value
                        })
                      }}
                    />
                    <label
                      className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out -translate-y-[1.8rem] scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-neutral-200 text-primary'
                    >
                      Próxima cita (opcional)
                    </label>
                  </div>
                </>
                :
                null
        }
      </Modal>
      <Modal.ToastifyModal />
    </>
  )
}

function Pages({ names, optionSearch, setOptionSearch }) {
  return (
    <div className='w-full flex flex-wrap gap-1'>
      {
        names.map((el, index) => (
          <button type='button' className={`${optionSearch === el.value ? 'bg-sky-400' : 'bg-sky-900 hover:bg-sky-400'} py-2 rounded-lg flex-grow text-white font-semibold min-w-24`} key={index} onClick={() => setOptionSearch(el.value)}>
            {el.name}
          </button>
        ))
      }
    </div>
  )
}

function CheckedBoxImage({ id, image, onChangeFunc }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <input type='file' className='hidden' id={`history-${id}`} accept='image/*'
        onChange={(e) => {
          const file = e.target.files && e.target.files[0]
          onChangeFunc(file)
        }}
      />
      <label htmlFor={`history-${id}`} className='order-1 cursor-pointer block w-full py-2 text-center text-white bg-gray-800 rounded transition duration-200 ease-in-out hover:bg-gray-600 mb-2'>
        --- Seleccionar imagen ---
      </label>

      {
        (image instanceof File || image instanceof Blob) ? (
          <img src={URL.createObjectURL(image)} alt='exámen' className='order-1 mx-auto rounded-lg' />
        ) : (
          image.length > 0 ?
            <>
              <img src={image} alt='exámen' className='order-1 mx-auto rounded-lg cursor-pointer hover:scale-105 transition-all'
                onClick={() => {
                  setOpen(true)
                }}
              />
              <ImageModal image={{
                url: image,
                label: 'examen'
              }} open={open} setOpen={setOpen} />
            </>
            : null
        )
      }
    </>
  )
}
