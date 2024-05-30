import { faArrowDown, faArrowUp, faCashRegister, faExclamation, faFileExcel, faFilePdf, faMagnifyingGlass, faMoneyBill, faTrash, faUserPlus, faX } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../utils/Icon'
import useFetchData from '../../utils/useFetchData'
import { useEffect, useState } from 'react'
import Loading from '../presentational/Loading'
import useDebounce from '../useDebounce'
import Spinner from '../presentational/Spinner'
import ReactSelect from '../ReactSelect'
import { v1 as uuidv4 } from 'uuid'
import ModalCashRegister from './ModalCashRegister'
import { toast } from 'react-toastify'
import { dateCalculator, fetchData, fetchHelper, getLocaleString, getPageQuery, getStringTime, showSWToDelete } from '../../utils/utils'
import ToastifyErrorList from '../ToastifyErrorList'
import { initialStateCustomer } from '../Customer/initialStateCustomer'
import AddCustomer from '../Customer/CustomerModal'
import { flushSync } from 'react-dom'
import ImageModal from '../ImageModal'

const values = {
  prod: 'product',
  serv: 'service',
  expen: 'expense',
  vous: 'vouchers',
  vou: 'voucher',
}

const valuesv2 = {
  inc: 'income',
  exp: 'expense',
}

function SectionCashRegister({ cashRegister, handleClose, setHelper: setHelperContainer, setMustLoad: setMustLoadContainer }) {
  const [optionSearch, setOptionSearch] = useState(values.prod)
  const [titles, setTitles] = useState([])
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6);
  const [searchByFilter, setSearchByFilter] = useState('');
  const [mustLoad, setMustLoad] = useState(true)
  const [open, setOpen] = useState(false)
  const [helper, setHelper] = useState(0)
  const [cashHelper, setCashHelper] = useState(null)
  const [image, setImage] = useState({
    url: '',
    label: '',
  })
  const [transitionName, setTransitionName] = useState('')

  useEffect(() => {
    if (optionSearch === values.prod) {
      setCashHelper(null)
      setTitles(['Transacción', 'Imagen', 'Producto', 'Precio', 'cantidad', 'subtotal', 'Cliente', 'descripción', 'fecha', 'voucher', 'eliminar'])
    } else if (optionSearch === values.serv) {
      setCashHelper(null)
      setTitles(['Transacción', 'Servicio', 'Precio', 'cantidad', 'subtotal', 'Cliente', 'descripción', 'fecha', 'voucher', 'eliminar'])
    } else if (optionSearch === values.expen) {
      setCashHelper(null)
      setTitles(['Transacción', 'subtotal', 'Razón', 'fecha', 'eliminar'])
    } else if (optionSearch === values.vous) {
      setTitles(['Código', 'Cliente', 'fecha', 'eliminar'])
    } else if (optionSearch === values.vou) {
      setTitles(['Producto / Servicio', 'Precio', 'cantidad', 'subtotal', 'descripción', 'fecha', 'eliminar'])
    }
  }, [optionSearch])

  const handleCloseCashRegister = () => {
    showSWToDelete('¿Quieres cerrar esta caja?', () => {
      const loadingToastId = toast(<Spinner message={`Cerrando caja`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('PUT', `/cash_registers/update_state`, { id: cashRegister.id })
        .then((data) => {
          toast.update(loadingToastId, { render: `La caja ha sido cerrada.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
          handleClose()
          setMustLoadContainer(false)
          setHelperContainer(prev => prev + 1)
        })
        .catch((err) => {
          console.log(err);
          toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
        })
    }, '¡Solo un administrador podrá volver a abrirla!', '¡ciérralo!')
  }

  const handleDelete = (deleteId) => {
    showSWToDelete('¿Quieres eliminar este movimiento?', () => {
      const loadingToastId = toast(<Spinner message={`Eliminando movimiento`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', `/cash_registers/destroy_movement`, { id: deleteId, cash_register_id: cashRegister.id })
        .then((data) => {
          setMustLoad(false)
          if (data.errors) {
            return toast.update(loadingToastId, { render: <><ToastifyErrorList data={data.errors} /></>, type: toast.TYPE.ERROR, autoClose: 3000, hideProgressBar: false, })
          }
          if (data.message) {
            return toast.update(loadingToastId, { render: <>{data.message}</>, type: toast.TYPE.INFO, autoClose: 3000, hideProgressBar: false })
          }
          toast.update(loadingToastId, { render: `El movimiento ha sido eliminado.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
          setHelper((prev) => prev + 1)
        })
        .catch((err) => {
          toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
        })
    })
  }

  const commonProps = {
    id: cashRegister.id,
    setData: setData,
    page: page,
    limit: limit,
    helper: helper,
    searchByFilter: searchByFilter,
    mustLoad: mustLoad,
    handleDelete: handleDelete
  };

  return (
    <section className={`${cashRegister.id !== null ? 'translate-y-0' : 'translate-y-[200%]'} transition-all duration-500 ease-in fixed bg-slate-50 z-30 bottom-0 left-0 px-3 md:px-5 ${open ? 'overflow-hidden' : 'overflow-y-auto'} rounded-t-2xl w-screen h-[99vh] mt-2 pb-10`}>
      {
        cashRegister.id !== null
          ?
          <>
            <button className='bg-gray-400 right-0 absolute p-3 rounded-xl m-2 opacity-80 hover:opacity-45 z-40 animate-bounce' onClick={handleClose}>
              <Icon css={'text-green-900'} icon={faX} size='22px' />
            </button>
            <br /> <br />
            <SectionCashRegister.Header message={`Caja ${cashRegister.name}`} messageButton={'Agregar movimiento'} disabled={cashRegister.state === 0} handleClick={() => setOpen(true)} />
            <div className='mb-4'>
              <Selector names={[{ name: 'Productos', value: values.prod }, { name: 'Servicios', value: values.serv }, { name: 'Egresos', value: values.expen }, { name: 'Vouchers', value: values.vous }, { name: 'Voucher', value: values.vou }]} optionSearch={optionSearch} setOptionSearch={setOptionSearch} anotherAction={true} action={(el) => {
                setSearchByFilter('')
                setMustLoad(true)
                setPage(1)
              }} />
            </div>

            <SectionCashRegister.Search render={optionSearch !== values.vou} setSearchByFilter={setSearchByFilter} setMustLoad={setMustLoad} setPage={setPage}
              placeholder={
                values.prod == optionSearch
                  ?
                  'Buscar por nombre del producto'
                  :
                  values.serv == optionSearch
                    ?
                    'Buscar por nombre del servicio'
                    :
                    values.expen == optionSearch
                      ?
                      'Buscar por razón de egreso'
                      :
                      'Buscar por código de voucher / Nombre o número de documento del cliente'
              }
              hide={!searchByFilter}
              data={
                [
                  {
                    tag: values.vous == optionSearch ? 'código / nombre o documento del cliente' : values.vou == optionSearch ? 'código' : values.expen == optionSearch ? 'razón' : 'nombre',
                    input: searchByFilter,
                    handleClick: () => setSearchByFilter('')
                  },
                ]
              } />

            <Table>
              <Table.HeaderTable names={titles} />
              {
                optionSearch === values.prod
                  ?
                  <Table.BodyProductTable {...commonProps} setOptionSearch={setOptionSearch} setSearchByFilter={setSearchByFilter} transitionName={transitionName} setTransitionName={setTransitionName} setImage={setImage} />
                  :
                  optionSearch === values.serv
                    ?
                    <Table.BodyServiceTable {...commonProps} setOptionSearch={setOptionSearch} setSearchByFilter={setSearchByFilter} />
                    :
                    optionSearch === values.expen
                      ?
                      <Table.BodyExpenseTable {...commonProps} />
                      :
                      optionSearch === values.vous
                        ?
                        <BodyAllVouchersTable cashId={cashRegister.id} page={page} limit={limit} searchByFilter={searchByFilter} helper={helper} setData={setData} mustLoad={mustLoad} setOptionSearch={setOptionSearch} setSearchByFilter={setSearchByFilter} setCashHelper={setCashHelper} setHelper={setHelper} setMustLoad={setMustLoad} />
                        :
                        optionSearch === values.vou
                          ?
                          <Table.BodyVoucherTable id={cashHelper || cashRegister.id} searchByFilter={searchByFilter} mustLoad={mustLoad} helper={helper} handleDelete={handleDelete} />
                          :
                          null
              }
            </Table>
            <SectionCashRegister.ExcelButton id={cashRegister.id} />
            {
              optionSearch === values.vou
                ?
                null
                :
                <SectionCashRegister.Pagination pageQuantity={data.current_page * data.per_page} quantity={data.total} setLimit={setLimit} setPage={setPage} nextPage={data.next_page_url} prevPage={data.prev_page_url} page={data.current_page} lastPage={data.last_page} />
            }

            {
              cashRegister.state !== 0
              &&
              <>
                <SectionCashRegister.SectionCashRegisterModal cashRegisterId={cashRegister.id} open={open} setOpen={setOpen} setHelper={setHelper} transitionName={transitionName} setTransitionName={setTransitionName} setImage={setImage} />
                <div className='flex justify-center'>
                  <button type='button' className='bg-red-600 w-full lg:w-1/2 px-3 py-4 leading-[1.6] mt-5 rounded-xl hover:rotate-[1deg] transition ease-out text-white text-xl' onClick={handleCloseCashRegister}>
                    Cerrar caja
                  </button>
                </div>
              </>
            }

            {
              transitionName
              &&
              <ImageModal
                image={image}
                transitionName={transitionName}
                setTransitionName={setTransitionName}
              />
            }
          </>
          :
          null
      }
    </section>
  )
}

function Header({ message, messageButton, disabled, handleClick }) {
  return (
    <header className='w-full flex flex-wrap justify-center md:justify-between md:px-7 text-gray-700'>
      <p className='font-bold text-4xl text-center'>
        <Icon icon={faCashRegister} css={'mr-3'} size='37px' />
        {message}
      </p>
      <button className={`bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded mr-4 mb-4 mt-4 sm:mt-0 shadow-xl ${disabled && 'opacity-0'}`} disabled={disabled} onClick={handleClick}>
        {messageButton}
      </button>
    </header>
  )
}

function Selector({ names, optionSearch, setOptionSearch, anotherAction = false, action }) {
  return (
    <div className='w-full flex flex-wrap gap-1'>
      {
        names.map((el, index) => (
          <button type='button' className={`${optionSearch === el.value ? 'bg-sky-400' : 'bg-sky-900 hover:bg-sky-400'} py-2 rounded-lg flex-grow text-white font-semibold min-w-24`} key={index} onClick={() => {
            setOptionSearch(el.value)
            if (anotherAction) {
              action(el)
            }
          }}>
            {el.name}
          </button>
        ))
      }
    </div>
  )
}

function Search({ render, setSearchByFilter, setMustLoad, setPage, placeholder, hide, data }) {
  const [inputFilter, setInputFilter] = useState('');
  const { debounceValue } = useDebounce(inputFilter, 500)

  useEffect(() => {
    setMustLoad(true)
    setSearchByFilter(debounceValue)
    setPage(1)
  }, [debounceValue])

  return (
    <>
      {
        render && (
          <div className='relative min-w-[calc(80%)] bg-white rounded-full shadow-lg border'>
            <input type='text' placeholder={placeholder} className='w-full bg-transparent focus:outline-none ml-2 py-2 ps-3 pe-12 md:pe-16 font-semibold'
              value={inputFilter}
              onChange={(e) => {
                setInputFilter(e.target.value)
              }}
            />
            <Icon css={'absolute inset-y-2.5 right-4 text-green-600'} icon={faMagnifyingGlass} size='20px' />
          </div>
        )
      }

      <section className={`${hide && 'hidden'} px-2 py-1 overflow-hidden flex flex-wrap cursor-pointer`}>
        <span className='font-medium me-4 text-black'>Filtro: </span>
        {
          data.map((value, index) => (
            value.input ? (
              <div
                className='bg-sky-400 rounded-lg py-1 px-2 me-2 hover:bg-vetgreen-100 cursor-pointer text-sm'
                key={index}
                onClick={() => {
                  value.handleClick()
                  setInputFilter('')
                }}
              >
                <Icon css={'px-1 me-1'} icon={faX} size='13px' />
                <span><strong>{value.tag}: </strong>{value.input}</span>
              </div>
            ) : null
          ))
        }
      </section>
    </>
  )
}

function ExcelButton({ id }) {
  const [rol, setRol] = useState(2)

  useEffect(() => {
    const cashRegisterDiv = document.getElementById('cash_register');
    const roleValue = cashRegisterDiv.getAttribute('role');
    setRol(roleValue)
  }, [])

  return (
    <>
      {
        rol == 1 ? (
          <a href={`/cash_registers/get_excel_by_cash_register?id=${id}`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-5 w-full sm:w-auto'>
            <span className='mx-auto'>
              <Icon icon={faFileExcel} css={'mr-2'} size='25px' />
              Descargar Excel
            </span>
          </a>
        )
          :
          null
      }
    </>
  )
}

function Table({ children, css }) {
  return (
    <main className='mx-auto mt-2'>
      <div className='flex flex-col overflow-hidden'>
        <div className='py-2 -my-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className={`overflow-x-auto h-auto ${css || 'rounded-lg'} border border-gray-400`}>
            <table className={`min-w-full rounded-lg ${css || 'rounded-lg'}`}>
              {children}
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

function HeaderTable({ names, css }) {
  return (
    <thead className={`sticky top-0 ${css || ''}`}>
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

function BodyProductTable({ id, setData, page, limit, helper, searchByFilter, mustLoad, handleDelete, setOptionSearch, setSearchByFilter, transitionName, setTransitionName, setImage }) {
  const url = `/cash_registers/get_products/${id}?page=${page}&limit=${limit}&filter=name&inputFilter=${searchByFilter}`
  const { data, loading } = useFetchData(url, [page, limit, helper, searchByFilter])

  useEffect(() => {
    if (!loading) {
      setData(data)
    }
  }, [data, loading])
  return (
    <TableBody loading={loading} mustLoad={mustLoad} message={'Cargando ingresos de productos'} data={data} handleDelete={handleDelete} setOptionSearch={setOptionSearch} setSearchByFilter={setSearchByFilter} transitionName={transitionName} setTransitionName={setTransitionName} setImage={setImage} />
  )
}

function BodyServiceTable({ id, setData, page, limit, helper, searchByFilter, mustLoad, handleDelete, setOptionSearch, setSearchByFilter }) {
  const url = `/cash_registers/get_services/${id}?page=${page}&limit=${limit}&filter=name&inputFilter=${searchByFilter}`
  const { data, loading } = useFetchData(url, [page, limit, helper, searchByFilter])

  useEffect(() => {
    if (!loading) {
      setData(data)
    }
  }, [data, loading])
  return (
    <TableBody loading={loading} mustLoad={mustLoad} message={'Cargando ingresos de servicios'} data={data} handleDelete={handleDelete} setOptionSearch={setOptionSearch} setSearchByFilter={setSearchByFilter} />
  )
}

function TableBody({ loading, mustLoad, message, data, handleDelete, setOptionSearch, setSearchByFilter, transitionName, setTransitionName, setImage }) {
  return (
    <tbody className='bg-white text-center'>
      {
        loading & mustLoad
          ?
          <tr className='text-white bg-gray-500'>
            <td colSpan={100}>
              <Loading message={message} />
            </td>
          </tr>
          :
          (
            data.data?.length === 0
              ?
              <tr className='text-white'>
                <td colSpan={100}>
                  <div className='bg-white p-4 rounded shadow-lg text-center'>
                    <p className='text-gray-600 text-lg'>
                      <Icon icon={faExclamation} css={'mr-3'} />
                      No hay datos disponibles.
                    </p>
                  </div>
                </td>
              </tr>
              :
              data.data?.map((el, index) => (
                <tr className='hover:bg-sky-200' key={index}>
                  <td className='px-2 py-4 whitespace-no-wrap border-b border-gray-200'>
                    <div className='flex items-center'>
                      <div className='mx-auto text-center'>
                        <Icon icon={faArrowUp} css={'text-green-600'} size='22px' />
                        <Icon icon={faArrowUp} css={'text-green-600'} size='22px' />
                        <div className='text-sm leading-5 text-gray-500 font-semibold'>Ingreso</div>
                      </div>
                    </div>
                  </td>

                  {
                    el.product_image_url && (
                      <td className='px-2 py-4 whitespace-no-wrap border-b border-gray-200 h-24'>
                        <div className='text-gray-900 w-20 mx-auto'>
                          <img
                          src={el.product_image_url}
                          alt={el.name}
                          className='rounded-sm h-16 mx-auto cursor-pointer'
                          onClick={() => {
                            document.startViewTransition(() => {
                              flushSync(() => {
                                setTransitionName(`${el.name}-${el.id}`)
                                setImage({
                                  url: el.product_image_url,
                                  label: el.name,
                                })
                              })
                            })
                          }}
                          style={{ viewTransitionName: !transitionName && `${el.name}-${el.id}` }}
                          />
                        </div>
                      </td>
                    )
                  }

                  <td className='px-2 py-4 whitespace-no-wrap border-b border-gray-200'>
                    <div className='text-sm leading-5 text-gray-900 max-w-40 overflow-hidden mx-auto'>{el.name}</div>
                  </td>

                  <td className='px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-center'>
                    <div className='text-sm leading-5 text-gray-900 min-w-16'>S/ {el.price}</div>
                  </td>

                  <td className='px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-center'>
                    <div className='text-sm leading-5 text-gray-900'>{el.pivot?.quantity}</div>
                  </td>

                  <td
                    className='px-2 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative text-center'>
                    <div className='text-sm leading-5 text-gray-900 min-w-20'>S/ {el.pivot?.subtotal}</div>
                  </td>

                  <td
                    className='px-2 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative text-center'>
                    <div className='text-sm leading-5 text-gray-900 w-40 overflow-hidden mx-auto'>{el.customer?.name}</div>
                    <div className='text-sm leading-5 text-gray-700 w-40 overflow-hidden mx-auto'>{el.customer?.identity_document?.abbreviation && `${el.customer?.identity_document?.abbreviation}:`} {el.customer?.document_number}</div>
                  </td>

                  <td
                    className='px-2 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative max-w-[200px]'>
                    <div className='text-sm leading-5 text-gray-900 max-w-48 overflow-hidden mx-auto'>{el.pivot?.description || '--'}</div>
                  </td>

                  <td
                    className='px-2 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
                    <div className='min-w-28 text-center'>
                      <p className='text-gray-700'>{getLocaleString(el.pivot?.created_at)}</p>
                      <p className='text-gray-900 font-semibold'>{dateCalculator(el.pivot?.created_at)}</p>
                    </div>
                  </td>

                  <td
                    className='py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
                    <button className='bg-red-500 hover:bg-red-700 text-sm leading-5 w-full text-white flex flex-col items-center p-1 rounded'
                      onClick={() => {
                        setOptionSearch(values.vou)
                        setSearchByFilter(el.pivot?.voucher_id)
                      }}
                    >
                      <Icon icon={faFilePdf} css={'mx-auto'} size='24px' />
                      <p css='text-center'>{el.pivot?.voucher_id}</p>
                    </button>
                  </td>

                  <td
                    className='py-2 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
                    <div className='text-center' onClick={() => handleDelete(el.pivot?.id)}>
                      <Icon icon={faTrash} css={'text-red-800 hover:scale-150 transition ease-out cursor-pointer'} size='25px' />
                    </div>
                  </td>
                </tr>
              ))
          )
      }
    </tbody>
  )
}

function BodyExpenseTable({ id, setData, page, limit, helper, searchByFilter, mustLoad, handleDelete }) {
  const url = `/cash_registers/get_expenses/${id}?page=${page}&limit=${limit}&filter=name&inputFilter=${searchByFilter}`
  const { data, loading } = useFetchData(url, [page, limit, helper, searchByFilter])

  useEffect(() => {
    if (!loading) {
      setData(data)
    }
  }, [data, loading])
  return (
    <tbody className='bg-white'>
      {
        loading & mustLoad
          ?
          <tr className='text-white bg-gray-500'>
            <td colSpan={100}>
              <Loading message={'Cargando egresos'} />
            </td>
          </tr>
          :
          (
            data.data?.length === 0
              ?
              <tr className='text-white'>
                <td colSpan={100}>
                  <div className='bg-white p-4 border rounded shadow-lg text-center'>
                    <p className='text-gray-600 text-lg'>
                      <Icon icon={faExclamation} css={'mr-3'} />
                      No hay datos disponibles.
                    </p>
                  </div>
                </td>
              </tr>
              :
              data.data?.map((el, index) => (
                <tr className='hover:bg-sky-200' key={index}>
                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                    <div className='flex items-center'>
                      <div className='mx-auto text-center'>
                        <Icon icon={faArrowDown} css={'text-red-600'} size='22px' />
                        <Icon icon={faArrowDown} css={'text-red-600'} size='22px' />
                        <div className='text-sm leading-5 text-gray-500 font-semibold'>Egreso</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center w-40'>
                    <div className='text-sm leading-5 text-gray-900 min-w-16'>S/ {el.pivot?.subtotal}</div>
                  </td>
                  <td
                    className='px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative min-w-[400px]'>
                    <div className='text-sm leading-5 text-gray-900'>{el.reason}</div>
                  </td>

                  <td
                    className='py-2 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
                    <div className='min-w-28 text-center'>
                      <p className='text-gray-700'>{getLocaleString(el.pivot?.created_at)}</p>
                      <p className='text-gray-900 font-semibold'>{dateCalculator(el.pivot?.created_at)}</p>
                    </div>
                  </td>

                  <td
                    className='py-2 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
                    <div className='text-center' onClick={() => handleDelete(el.pivot?.id)}>
                      <Icon icon={faTrash} css={'text-red-800 hover:scale-150 transition ease-out cursor-pointer'} size='25px' />
                    </div>
                  </td>
                </tr>
              ))
          )
      }
    </tbody>
  )
}

function BodyAllVouchersTable({ cashId, page, limit, searchByFilter, helper, setData, mustLoad, setOptionSearch, setSearchByFilter, setCashHelper, setHelper, setMustLoad }) {
  const url = `/cash_registers/get_all_vouchers?page=${page}&limit=${limit}&inputFilter=${searchByFilter}`
  const { data, loading } = useFetchData(url, [page, limit, helper, searchByFilter])

  useEffect(() => {
    if (!loading) {
      setData(data)
    }
  }, [data, loading])

  const handleDeleteVoucher = (voucher_id, cash_id) => {
    showSWToDelete(`¿Seguro(a) que quieres eliminar el voucher ${voucher_id}?`, () => {
      const loadingToastId = toast(<Spinner message={`Eliminando voucher`} />, { autoClose: 3000, hideProgressBar: true, });
      fetchHelper('DELETE', `/cash_registers/destroy_voucher`, { voucher_id: voucher_id, cash_register_id: cash_id })
        .then((data) => {
          setMustLoad(false)
          if (data.errors) {
            return toast.update(loadingToastId, { render: <><ToastifyErrorList data={data.errors} /></>, type: toast.TYPE.ERROR, autoClose: 3000, hideProgressBar: false, })
          }
          if (data.message) {
            return toast.update(loadingToastId, { render: <>{data.message}</>, type: toast.TYPE.INFO, autoClose: 3000, hideProgressBar: false })
          }
          toast.update(loadingToastId, { render: `El voucher ${voucher_id} ha sido eliminado.`, type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
          setHelper((prev) => prev + 1)
        })
        .catch((err) => {
          toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
        })
    })
  }

  return (
    <tbody className='bg-white'>
      {
        loading & mustLoad
          ?
          <tr className='text-white bg-gray-500'>
            <td colSpan={100}>
              <Loading message={'Cargando vouchers'} />
            </td>
          </tr>
          :
          (
            data.data?.length === 0
              ?
              <tr className='text-white'>
                <td colSpan={100}>
                  <div className='bg-white p-4 border rounded shadow-lg text-center'>
                    <p className='text-gray-600 text-lg'>
                      <Icon icon={faExclamation} css={'mr-3'} />
                      No hay datos disponibles.
                    </p>
                  </div>
                </td>
              </tr>
              :
              data.data?.map((el, index) => (
                <tr className={`${cashId === el.cash_id && 'bg-gray-300'} hover:bg-sky-200`} key={index}>
                  <td
                    className='py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative w-96'>
                    <button className='bg-red-500 hover:bg-red-700 text-sm leading-5 w-40 md:w-3/4 mx-auto text-white flex flex-col items-center p-1 rounded'
                      onClick={() => {
                        setCashHelper(el.cash_id)
                        setOptionSearch(values.vou)
                        setSearchByFilter(el.voucher_id)
                      }}
                    >
                      <Icon icon={faFilePdf} css={'mx-auto'} size='24px' />
                      <p css='text-center'>{el.voucher_id}</p>
                    </button>
                  </td>

                  <td
                    className='px-2 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative text-center'>
                    <div className='text-sm leading-5 text-gray-900 w-40 overflow-hidden mx-auto'>{el.customer}</div>
                    <div className='text-sm leading-5 text-gray-700 w-40 overflow-hidden mx-auto'>{el.abbreviation && `${el.abbreviation}:`} {el.doc_customer}</div>
                  </td>

                  <td
                    className='py-2 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
                    <div className='min-w-28 text-center'>
                      <p className='text-gray-700 md:hidden'>{getLocaleString(el.max_created_at)}</p>
                      <p className='text-gray-700 text-base hidden md:block'>{getStringTime(el.max_created_at)}</p>
                      <p className='text-gray-900 font-semibold'>{dateCalculator(el.max_created_at)}</p>
                    </div>
                  </td>

                  <td
                    className='py-2 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative w-36'>
                    <div className='text-center'
                      onClick={() => handleDeleteVoucher(el.voucher_id, el.cash_id)}
                    >
                      <Icon icon={faTrash} css={'text-red-800 hover:scale-150 transition ease-out cursor-pointer'} size='25px' />
                    </div>
                  </td>
                </tr>
              ))
          )
      }
    </tbody>
  )
}

function BodyVoucherTable({ id, searchByFilter, mustLoad, helper, handleDelete }) {
  const url = `/cash_registers/get_voucher/${id}?inputFilter=${searchByFilter}`
  const { data, loading } = useFetchData(url, [searchByFilter, helper])

  const [total, setTotal] = useState('')

  useEffect(() => {
    setTotal((data.voucher?.reduce((previousValue, currentValue) => {
      return previousValue + parseFloat(currentValue.pivot?.subtotal)
    }, 0))?.toFixed(2))
  }, [data])

  const getVoucherPdf = () => {
    const url = `/cash_registers/get_voucher_pdf/${id}?uuid=${searchByFilter}`
    // const iframe = document.createElement('iframe');
    // iframe.style.display = 'none';
    // // Asigna la URL del PDF al src del iframe
    // iframe.src = url;
    // // Agrega el iframe al cuerpo del documento
    // document.body.appendChild(iframe);
    // // Espera a que el iframe cargue el PDF
    // iframe.onload = () => {
    //     // Llama a window.print() después de que el PDF se haya cargado
    //     iframe.contentWindow.print();
    // };
    window.open(url, '_blank')
  }

  return (
    <tbody className='bg-white'>
      {
        loading & mustLoad
          ?
          <tr className='text-white bg-gray-500'>
            <td colSpan={100}>
              <div>
                <Loading message={'Cargando voucher'} />
              </div>
            </td>
          </tr>
          :
          <>
            {
              data.voucher?.map((el, index) => (
                <tr className='hover:bg-sky-200' key={index}>
                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center'>
                    <div className='text-sm leading-5 text-gray-900'>{el.name}</div>
                  </td>

                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center'>
                    <div className='text-sm leading-5 text-gray-900 min-w-16'>S/ {el.price}</div>
                  </td>

                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center '>
                    <div className='text-sm leading-5 text-gray-900'>{el.pivot?.quantity}</div>
                  </td>

                  <td
                    className='px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative text-center'>
                    <div className='text-sm leading-5 text-gray-900 min-w-20'>S/ {el.pivot?.subtotal}</div>
                  </td>

                  <td
                    className='px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
                    <div className='text-sm leading-5 text-gray-900 min-w-24'>{el.pivot?.description}</div>
                  </td>

                  <td
                    className='py-2 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
                    <div className='min-w-28 text-center'>
                      <p className='text-gray-700'>{getLocaleString(el.pivot?.created_at)}</p>
                    </div>
                  </td>

                  <td
                    className='py-2 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
                    <div className='text-center' onClick={() => handleDelete(el.pivot?.id)}>
                      <Icon icon={faTrash} css={'text-red-800 hover:scale-150 transition ease-out cursor-pointer'} size='25px' />
                    </div>
                  </td>
                </tr>
              ))
            }
            <tr className='hover:bg-sky-200'>
              <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200' colSpan={100}>
                <div className='text-lg font-bold leading-5 text-gray-900 text-center'>Cliente: {data.customer?.name} - {data.customer?.identity_document?.abbreviation || '-'}: {data.customer?.document_number || '--'}</div>
              </td>
            </tr>
            <tr className='hover:bg-sky-200'>
              <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200' colSpan={100}>
                <div className='text-lg font-bold leading-5 text-gray-600 text-center'>
                  Total: S/ {total}
                </div>
              </td>
            </tr>
            {
              total > 0 && (
                <tr className='hover:bg-red-300' onClick={getVoucherPdf}>
                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 cursor-pointer' colSpan={100}>
                    <div className='text-center text-red-800 font-bold text-xl animate-bounce'>
                      Presiona aquí para verlo en <Icon icon={faFilePdf} css={'text-red-800 hover:scale-125 transition ease-out cursor-pointer'} size='35px' />
                    </div>
                  </td>
                </tr>
              )
            }
          </>
      }
    </tbody>
  )
}

function Pagination({ pageQuantity, quantity, setLimit, setPage, nextPage, prevPage, page, lastPage }) {
  return (
    <>
      <section className='flex justify-between items-center mt-4 px-1 sm:px-5'>
        <div className='hidden xl:block text-black rounded-lg'>
          Mostrando {pageQuantity > quantity ? quantity : pageQuantity} de {quantity} resultados
        </div>
        <button className='xl:hidden bg-white border px-4 py-2 text-gray-600 hover:text-indigo-500 hover:bg-gray-200 cursor-pointer rounded-lg'
          disabled={!prevPage}
          onClick={() => {
            if (prevPage) {
              setPage(parseInt(getPageQuery(prevPage)))
            }
          }}>
          Anterior
        </button>

        <div className='hidden xl:block text-vetbrown rounded-full bg-white border border-vetbrown p-2 mb-1'>
          <span className=''> Por página: </span>
          <select className='px-2 py-1 bg-transparent rounded-lg cursor-pointer'
            defaultValue='6'
            onChange={(e) => {
              setLimit(e.target.value)
              setPage(1)
            }}
          >
            <option value='6' className='bg-white'>6</option>
            <option value='12' className='bg-white'>12</option>
            <option value='20' className='bg-white'>20</option>
          </select>
        </div>
        <div className='xl:hidden text-gray-600 rounded-xl bg-white border border-gray-200 p-2'>
          <select className='px-2 py-1 border border-gray-300 rounded-lg cursor-pointer'
            defaultValue='6'
            onChange={(e) => {
              setLimit(e.target.value)
              setPage(1)
            }}
          >
            <option value='6' className=' bg-white'>6</option>
            <option value='12' className=' bg-white'>12</option>
            <option value='20' className=' bg-white'>20</option>
          </select>
        </div>

        <nav className='hidden xl:flex rounded-lg divide-vetbrown ease-out duration-300'>
          <button className={`px-4 py-2 text-vetbrown bg-white border border-vetbrown rounded-l-full ${prevPage && 'hover:text-indigo-500 hover:scale-[105%]'}`}
            disabled={!prevPage}
            onClick={() => {
              if (prevPage) {
                setPage(parseInt(getPageQuery(prevPage)))
              }
            }}>
            Anterior
          </button>

          {
            page !== 1 && <button className='px-4 py-2 text-indigo-800 bg-white hover:text-indigo-500 hover:scale-[105%]'
              onClick={() => {
                setPage(1)
              }}
            >
              {1}
            </button>
          }

          {(1 - page < -2 && page != 1) && <span className='px-4 py-2 bg-white text-gray-500'>...</span>}

          {
            (1 - page < -1 && page != 1) && <button className='px-4 py-2 text-gray-600 bg-white hover:text-indigo-500 hover:scale-[105%]'
              onClick={() => {
                setPage(prev => prev - 1)
              }}
            >
              {parseInt(page) - 1}
            </button>
          }

          <button className='px-4 py-2 text-indigo-500 bg-vetwhite border border-vetbrown font-medium'>{page}</button>

          {
            lastPage - page > 0 && <button className='px-4 py-2 text-gray-600 bg-white hover:text-indigo-500 hover:scale-[105%]'
              onClick={() => {
                setPage(prev => prev + 1)
              }}
            >
              {parseInt(page) + 1}
            </button>
          }

          {lastPage - page > 2 && <span className='px-4 py-2 bg-white  text-gray-600'>...</span>}

          {
            (lastPage - page > 2) && <button className='px-4 py-2 bg-white text-gray-600 hover:text-indigo-500 hover:scale-[105%]'
              onClick={() => {
                setPage(parseInt(lastPage))
              }}
            >
              {lastPage}
            </button>
          }

          <button className={`px-4 py-2 text-vetbrown rounded-r-full bg-white border border-vetbrown ${nextPage && 'hover:text-indigo-500 hover:scale-[105%]'}`}
            disabled={!nextPage}
            onClick={() => {
              if (nextPage) {
                setPage(parseInt(getPageQuery(nextPage)))
              }
            }}
          >Siguiente</button>
        </nav>
        <button className='xl:hidden bg-white border px-4 py-2 text-gray-600 hover:text-indigo-500 hover:bg-gray-200 cursor-pointer rounded-lg'
          disabled={!nextPage}
          onClick={() => {
            if (nextPage) {
              setPage(parseInt(getPageQuery(nextPage)))
            }
          }}
        >
          Siguiente
        </button>
      </section>
      <div className='block xl:hidden text-black rounded-lg text-center mt-5'>
        Mostrando {pageQuantity > quantity ? quantity : pageQuantity} de {quantity} resultados
      </div>
    </>
  );
}

function SectionCashRegisterModal({ cashRegisterId, open, setOpen, setHelper, transitionName, setTransitionName, setImage }) {
  const initialStateProduct = {
    id: uuidv4(),
    img: '',
    product_id: '',
    name: '',
    price: 0,
    quantity: 1,
    description: ''
  }

  const initialStateService = {
    id: uuidv4(),
    service_id: '',
    name: '',
    price: 0,
    quantity: 1,
    description: ''
  }

  const initialStateExpense = {
    id: uuidv4(),
    expense_id: '',
    reason: '',
    subtotal: 0,
  }

  const [loading, setLoading] = useState(false)
  const [optionSearchv2, setOptionSearchv2] = useState(valuesv2.inc)
  const [typeOfMovement, setTypeOfMovement] = useState(1)
  const [total, setTotal] = useState(0)
  const [cash, setCash] = useState('')
  const [voucherId, setVoucherId] = useState('')
  const [voucherIdHelper, setVoucherIdHelper] = useState(1)

  const [customerId, setCustomerId] = useState('')
  const [filterCustomer, setFilterCustomer] = useState('name')
  const [inputCustomer, setInputCustomer] = useState('')
  const [helperCustomer, setHelperCustomer] = useState(1)
  const [mustSearchCustomer, setMustSearchCustomer] = useState(false)
  const [helperSearchCustomer, setHelperSearchCustomer] = useState(false)
  const { debounceValue: debounceValueCustomer } = useDebounce(inputCustomer, 400)
  const { data: dataCustomer, loading: loadingCustomer } = useFetchData(`/customers/list?filter=${filterCustomer}&inputFilter=${debounceValueCustomer}`, [helperCustomer], helperSearchCustomer)

  const [selectProduct, setSelectProduct] = useState(initialStateProduct)
  const [products, setProducts] = useState([])
  const [inputProduct, setInputProduct] = useState('')
  const [helperProduct, setHelperProduct] = useState(1)
  const [mustSearchProduct, setMustSearchProduct] = useState(false)
  const [helperSearchProduct, setHelperSearchProduct] = useState(false)
  const { debounceValue: debounceValueProduct } = useDebounce(inputProduct, 400)
  const { data: dataProduct, loading: loadingProduct } = useFetchData(`/products/list?filter=name&inputFilter=${debounceValueProduct}`, [helperProduct], helperSearchProduct)

  const [selectService, setSelectService] = useState(initialStateService)
  const [services, setServices] = useState([])
  const [inputService, setInputService] = useState('')
  const [helperService, setHelperService] = useState(1)
  const [mustSearchService, setMustSearchService] = useState(false)
  const [helperSearchService, setHelperSearchService] = useState(false)
  const { debounceValue: debounceValueService } = useDebounce(inputService, 400)
  const { data: dataService, loading: loadingService } = useFetchData(`/services/list?filter=name&inputFilter=${debounceValueService}`, [helperService], helperSearchService)

  const [selectExpense, setSelectExpense] = useState(initialStateExpense)
  const [expenses, setExpenses] = useState([])
  const [inputExpense, setInputExpense] = useState('')
  const [helperExpense, setHelperExpense] = useState(1)
  const [mustSearchExpense, setMustSearchExpense] = useState(false)
  const [helperSearchExpense, setHelperSearchExpense] = useState(false)
  const { debounceValue: debounceValueExpense } = useDebounce(inputExpense, 400)
  const { data: dataExpense, loading: loadingExpense } = useFetchData(`/expenses/list?filter=reason&inputFilter=${debounceValueExpense}`, [helperExpense], helperSearchExpense)

  useEffect(() => {
    if (!loadingProduct && mustSearchProduct) {
      setHelperProduct((prev) => prev + 1)
    }
  }, [debounceValueProduct])

  useEffect(() => {
    if (!loadingService && mustSearchService) {
      setHelperService((prev) => prev + 1)
    }
  }, [debounceValueService])

  useEffect(() => {
    if (!loadingExpense && mustSearchExpense) {
      setHelperExpense((prev) => prev + 1)
    }
  }, [debounceValueExpense])

  useEffect(() => {
    if (!loadingCustomer && mustSearchCustomer) {
      setHelperCustomer((prev) => prev + 1)
    }
  }, [debounceValueCustomer])

  useEffect(() => {
    setTotal(Array.isArray(products) && Array.isArray(services) ? (
      ([...products, ...services].reduce((previousValue, currentValue) => {
        return previousValue + (parseFloat(currentValue.price) * parseFloat(currentValue.quantity));
      }, 0))?.toFixed(2)
    ) : (
      0
    ))
  }, [products, services])

  useEffect(() => {
    fetchData('/cash_registers/get_voucher_id')
      .then((id) => setVoucherId(id))
  }, [voucherIdHelper])

  const handleClick = () => {

    setLoading(true)

    const movements = {
      cash_register_id: cashRegisterId,
      type_of_movement: typeOfMovement,
    }

    if (!!customerId) {
      movements.customer_id = customerId
    }

    if (products.length > 0) {
      movements.products = products.map(prod => {
        return { product_id: prod.product_id, quantity: prod.quantity, description: prod.description }
      })
    }

    if (services.length > 0) {
      movements.services = services.map(serv => {
        return { service_id: serv.service_id, quantity: serv.quantity, description: serv.description }
      })
    }

    if (expenses.length > 0) {
      movements.expenses = expenses.map(expe => {
        return { expense_id: expe.expense_id, subtotal: expe.subtotal }
      })
    }

    const loadingToastId = toast(<Spinner message={'Agregando movimiento'} />, { autoClose: 3000, hideProgressBar: true, });

    fetchHelper('POST', '/cash_registers/store_movements', movements)
      .then((data) => {
        if (data.errors) {
          return toast.update(loadingToastId, { render: <><ToastifyErrorList data={data.errors} /></>, type: toast.TYPE.ERROR, autoClose: 3000, hideProgressBar: false, })
        }
        toast.update(loadingToastId, { render: 'Movimiento guardado.', type: toast.TYPE.SUCCESS, autoClose: 1500, hideProgressBar: false, })
        setCustomerId('')
        setInputCustomer('')
        setProducts([])
        setServices([])
        setExpenses([])
        setHelper((prev) => prev + 1)
        setOpen(false)
        setVoucherIdHelper((prev) => prev + 1)
      })
      .catch((err) => {
        console.log(err);
        toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 2500, hideProgressBar: false, })
      })
      .finally(() => setLoading(false))
  }

  return (
    <ModalCashRegister option={'Vender'} open={open} setOpen={setOpen} handleClick={handleClick} icon={faMoneyBill} text={'Nuevo movimiento'} loading={loading} width={'max-w-5xl'}>
      <div className='col-span-full'>
        <Selector names={[{ name: 'Ingresos', value: valuesv2.inc, movement: 1 }, { name: 'Egresos', value: valuesv2.exp, movement: 2 }]} optionSearch={optionSearchv2} setOptionSearch={setOptionSearchv2} anotherAction={true} action={(el) => setTypeOfMovement(el.movement)} />
      </div>

      {
        optionSearchv2 === valuesv2.inc
          ?
          <>
            <SectionCashRegisterModal.ButtonContainer css='border-2 border-gray-200 bg-gray-300'>
              <span className='text-base absolute -translate-y-2 -translate-x-12'>Comprobante</span>
              <p className="text-2xl font-bold text-gray-500 mt-2">
                {voucherId || 'V-00000001'}
              </p>
            </SectionCashRegisterModal.ButtonContainer>

            <SectionCashRegisterModal.ButtonContainer css='bg-blue-500 hover:bg-blue-700 order-5 mt-10'>
              <button className='w-full text-white' onClick={() => {
                setCustomerId('')
                setInputCustomer('')
                setProducts([])
                setServices([])
                setInputProduct('')
                setInputService('')
              }}>
                <code>LIMPIAR FORMULARIO</code>
              </button>
            </SectionCashRegisterModal.ButtonContainer>

            <SectionCashRegisterModal.ButtonContainer css='border-2 order-4 bg-sky-800 text-white'>
              Total: S/. {total}
            </SectionCashRegisterModal.ButtonContainer>

            {
              total > 0 && (
                <SectionCashRegisterModal.ButtonContainer css='order-4'>
                  <h1 className='underline  underline-offset-2'>Calculadora de vuelto</h1>
                  <section className='flex flex-col sm:flex-row gap-3'>
                    <input
                      type='number'
                      step='any'
                      min={0}
                      max={99999}
                      value={cash}
                      placeholder='Cantidad de dinero ...'
                      className='border-2 w-full sm:w-1/2  p-1 rounded-lg bg-transparent text-center'
                      onChange={(e) => setCash(e.target.value)}
                    />
                    <div className='border-2 w-full sm:w-1/2 rounded-lg min-h-10 flex items-center justify-center'>
                      <p>
                        {
                          (cash - total) > 0 ? `Su vuelto es de S/. ${(cash - total).toFixed(2)}` : `Faltan S/. ${-(cash - total).toFixed(2)}`
                        }
                      </p>
                    </div>
                  </section>
                </SectionCashRegisterModal.ButtonContainer>
              )
            }

            <SectionCashRegisterModal.CustomerModal setMustSearchCustomer={setMustSearchCustomer} filterCustomer={filterCustomer} setFilterCustomer={setFilterCustomer} inputCustomer={inputCustomer} setInputCustomer={setInputCustomer} loadingCustomer={loadingCustomer} dataCustomer={dataCustomer} setCustomerId={setCustomerId} setHelperSearchCustomer={setHelperSearchCustomer} setHelperCustomer={setHelperCustomer} />

            <hr className='col-span-full' />

            <SectionCashRegisterModal.ProductModal setMustSearchProduct={setMustSearchProduct} inputProduct={inputProduct} setInputProduct={setInputProduct} loadingProduct={loadingProduct} dataProduct={dataProduct} selectProduct={selectProduct} setSelectProduct={setSelectProduct} setProducts={setProducts} initialStateProduct={initialStateProduct} products={products} setHelperSearchProduct={setHelperSearchProduct} setHelperProduct={setHelperProduct} transitionName={transitionName} setTransitionName={setTransitionName} setImage={setImage} />

            <hr className='col-span-full sm:hidden' />

            <SectionCashRegisterModal.ServiceModal setMustSearchService={setMustSearchService} inputService={inputService} setInputService={setInputService} loadingService={loadingService} dataService={dataService} selectService={selectService} setSelectService={setSelectService} setServices={setServices} initialStateService={initialStateService} services={services} setHelperSearchService={setHelperSearchService} setHelperService={setHelperService} />

            <hr className='col-span-full' />
          </>
          :
          <>
            <SectionCashRegisterModal.ButtonContainer css='bg-blue-500 hover:bg-blue-700 order-2 mt-10'>
              <button className='w-full text-white' onClick={() => {
                setExpenses([])
                setInputExpense('')
              }}>
                <code>LIMPIAR FORMULARIO</code>
              </button>
            </SectionCashRegisterModal.ButtonContainer>
            <SectionCashRegisterModal.ExpenseModal setMustSearchExpense={setMustSearchExpense} inputExpense={inputExpense} setInputExpense={setInputExpense} loadingExpense={loadingExpense} dataExpense={dataExpense} selectExpense={selectExpense} setSelectExpense={setSelectExpense} setExpenses={setExpenses} initialStateExpense={initialStateExpense} expenses={expenses} setHelperSearchExpense={setHelperSearchExpense} setHelperExpense={setHelperExpense} />
          </>
      }

    </ModalCashRegister >
  )
}

function ButtonContainer({ children, css = '' }) {
  return (
    <div className={`relative w-full col-span-full rounded px-3 py-[0.32rem] leading-[1.6] text-gray-600  text-center font-semibold text-lg ${css}`}>
      {children}
    </div>
  )
}

function CustomerModal({ setMustSearchCustomer, filterCustomer, setFilterCustomer, inputCustomer, setInputCustomer, loadingCustomer, dataCustomer, setCustomerId, setHelperSearchCustomer, setHelperCustomer }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className='relative w-full col-span-full grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <ReactSelect setMustSearch={setMustSearchCustomer} filters={[
          {
            tag: 'Nombre',
            value: 'name',
          },
          {
            tag: 'Número de documento',
            value: 'document_number',
          },
        ]} filter={filterCustomer} setFilter={setFilterCustomer} input={inputCustomer} setInput={setInputCustomer} label={'Cliente'} setHelperSearch={setHelperSearchCustomer} setHelper={setHelperCustomer} css={'w-full col-span-full order-1 pe-10'} listStyle={'w-full max-h-72'} anotherAction={true} actions={() => {
          setCustomerId('')
        }} >
          {
            loadingCustomer
              ?
              <div className='w-full mx-auto p-4'>
                <Spinner message={'Buscando los clientes ...'} />
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
                        key={index} className='cursor-pointer hover:bg-slate-600 rounded p-2'
                        onClick={() => {
                          setMustSearchCustomer(false)
                          setInputCustomer(`${el.name} - ${el.identity_document?.abbreviation || '--'}: ${el.document_number || '--'}`)
                          setCustomerId(el.id)
                        }
                        }
                      >{`${el.name} - ${el.identity_document ? `${el.identity_document.abbreviation}: ${el.document_number}` : '--'}`}</li>))
                  }
                </ul>
          }
        </ReactSelect>
        <button type='button' className='order-1 absolute bottom-1 right-12 bg-gray-100 rounded-full px-2 py-1 z-10 hover:bg-gray-300'
          onClick={() => setOpen(true)}>
          <Icon icon={faUserPlus} />
        </button>
      </div >
      <div className='absolute'>
        <AddCustomer customer={{ ...initialStateCustomer }} option={'Crear'} open={open} setOpen={setOpen} actions={false} mustBeToast={false} focus={false} />
      </div>
    </>
  )
}

function ProductModal({ setMustSearchProduct, inputProduct, setInputProduct, loadingProduct, dataProduct, selectProduct, setSelectProduct, setProducts, initialStateProduct, products, setHelperSearchProduct, setHelperProduct, transitionName, setTransitionName, setImage }) {
  return (
    <>
      <div className='w-full col-span-1 grid grid-cols-1 gap-6 sm:gap-x-6'>
        <ReactSelect setMustSearch={setMustSearchProduct} input={inputProduct} setInput={setInputProduct} label={'Producto'} setHelperSearch={setHelperSearchProduct} setHelper={setHelperProduct} css={'w-full max-h-10'} listStyle={'w-full sm:w-[200%] max-h-72'}>
          {
            loadingProduct
              ?
              <div className='w-full mx-auto p-4'>
                <Spinner message={'Buscando los productos ...'} />
              </div>
              :
              dataProduct.data?.length === 0
                ?
                <h3 className='cursor-pointer py-4 text-center'>No hay productos con este dato ...</h3>
                :
                <ul className='px-5 py-2'>
                  {
                    dataProduct.data?.map((el, index) => (
                      <li
                        key={index} className='cursor-pointer hover:bg-slate-600 p-2 border-b rounded-lg'
                        onClick={() => {
                          setMustSearchProduct(false)
                          setInputProduct(el.name)
                          setSelectProduct(prev => {
                            return {
                              ...prev,
                              img: el.product_image_url,
                              product_id: el.id,
                              name: el.name,
                              price: el.price
                            };
                          });
                        }
                        }
                      >
                        <article className='flex flex-col sm:flex-row justify-center sm:justify-start items-center'>
                          <img src={el.product_image_url || '/image/juguete.webp'} alt={el.name} width='150px' className='rounded-lg object-contain mb-6 sm:mb-0 sm:me-10' />
                          <div className='flex flex-col items-start'>
                            <p> <strong>Nombre:</strong> {`${el.name}`}</p>
                            <p> <strong>Precio:</strong> {`S/. ${el.price}`}</p>
                            <p> <strong>Stock:</strong> {`${el.stock}`} u.</p>
                          </div>
                        </article>
                      </li>))
                  }
                </ul>
          }
        </ReactSelect>

        {
          (selectProduct.name && inputProduct.length > 0) && (
            <>
              <ModalQuantity select={selectProduct} handleClick={(e) => {
                setSelectProduct(prev => {
                  return {
                    ...prev,
                    quantity: parseFloat(e.target.value) || ''
                  };
                });
              }} />

              <ModalBody select={selectProduct} handleChange={(e) => {
                setSelectProduct(prev => {
                  return {
                    ...prev,
                    description: e.target.value
                  };
                });
              }} handleClick={() => {

                setProducts(prev => {
                  if (!selectProduct.product_id) {
                    return [...prev]
                  }
                  const productFounded = products.findIndex(el => el.product_id === selectProduct.product_id)

                  if (productFounded !== -1) {
                    const updatedProducts = [...products]
                    updatedProducts[productFounded].quantity += parseFloat(selectProduct.quantity)
                    return updatedProducts
                  }

                  return [...prev, selectProduct]
                })
                setInputProduct('')
                setSelectProduct(initialStateProduct)
              }} message={'producto'} />
            </>
          )
        }
      </div>

      {
        products.length > 0 && (
          <div className='col-span-full order-2'>
            <Table>
              <Table.HeaderTable names={['Imagen', 'Producto', 'precio', 'cantidad', 'subtotal', 'descripción', 'Eliminar']} />
              <ModalTableBody data={products} setData={setProducts} transitionName={transitionName} setTransitionName={setTransitionName} setImage={setImage} />
            </Table>
          </div>
        )
      }
    </>
  )
}

function ServiceModal({ setMustSearchService, inputService, setInputService, loadingService, dataService, selectService, setSelectService, setServices, initialStateService, services, setHelperSearchService, setHelperService }) {
  return (
    <>
      <div className='w-full col-span-1 grid grid-cols-1 gap-6 sm:gap-x-6'>
        <ReactSelect setMustSearch={setMustSearchService} input={inputService} setInput={setInputService} label={'Servicio'} setHelperSearch={setHelperSearchService} setHelper={setHelperService} css={'w-full max-h-10'} listStyle={'w-full max-h-72'}>
          {
            loadingService
              ?
              <div className='w-full mx-auto p-4'>
                <Spinner message={'Buscando los servicios ...'} />
              </div>
              :
              dataService.data?.length === 0
                ?
                <h3 className='cursor-pointer py-4 text-center'>No hay servicios con este dato ...</h3>
                :
                <ul className='px-5 py-2'>
                  {
                    dataService.data?.map((el, index) => (
                      <li
                        key={index} className='cursor-pointer hover:bg-slate-600 rounded p-2'
                        onClick={() => {
                          setMustSearchService(false)
                          setInputService(el.name)
                          setSelectService(prev => {
                            return {
                              ...prev,
                              service_id: el.id,
                              name: el.name,
                              price: el.price
                            };
                          });
                        }
                        }
                      >{`${el.name} ->  S/. ${el.price}`}</li>))
                  }
                </ul>
          }
        </ReactSelect>

        {
          (selectService.name && inputService.length > 0) && (
            <>
              <ModalQuantity select={selectService} handleClick={(e) => {
                setSelectService(prev => {
                  return {
                    ...prev,
                    quantity: parseFloat(e.target.value) || ''
                  };
                });
              }} />

              <ModalBody select={selectService} handleChange={(e) => {
                setSelectService(prev => {
                  return {
                    ...prev,
                    description: e.target.value
                  };
                });
              }} handleClick={() => {
                setServices(prev => {
                  if (!selectService.service_id) {
                    return [...prev]
                  }
                  const serviceFounded = services.findIndex(el => el.service_id === selectService.service_id)

                  if (serviceFounded !== -1) {
                    const updatedServices = [...services]
                    updatedServices[serviceFounded].quantity += parseFloat(selectService.quantity)
                    return updatedServices
                  }

                  return [...prev, selectService]
                })
                setInputService('')
                setSelectService(initialStateService)
              }} message={'servicio'} />
            </>
          )
        }
      </div>

      {
        services.length > 0 && (
          <div className='col-span-full order-3'>
            <Table>
              <Table.HeaderTable names={['Servicio', 'precio', 'cantidad', 'subtotal', 'descripción', 'Eliminar']} />
              <ModalTableBody data={services} setData={setServices} />
            </Table>
          </div>
        )
      }
    </>
  )
}

function ModalQuantity({ select, handleClick }) {
  return (
    <div className='relative border border-gray-600 rounded w-full'>
      <input
        type='number'
        step='any'
        className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
        value={select.quantity}
        onChange={handleClick}
        min={0}
        required />
      <label
        className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
      >
        Cantidad
      </label>
    </div>
  )
}

function ModalBody({ select, handleChange, handleClick, message }) {
  return (
    <>
      <div className='relative border border-gray-600 rounded w-full col-span-full'>
        <textarea
          className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
          value={select.description}
          onChange={handleChange}
        ></textarea>
        <label
          className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
        >
          Descripción (opcional)
        </label>
      </div>

      <button type='button' className='w-full col-span-full bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-700' onClick={handleClick}>
        Agregar {message}
      </button>
    </>
  )
}

function ModalTableBody({ data, setData, transitionName, setTransitionName, setImage }) {
  return (
    <tbody className='bg-white text-center'>
      {
        data.map((el, index) => (
          <tr className='hover:bg-sky-200' key={index}>

            {
              el.img && (
                <td className='whitespace-no-wrap border-b border-gray-200 h-20'>
                  <div className='text-gray-900 w-20'>
                    <img
                    src={el.img}
                    alt={el.name}
                    className='rounded-sm h-16 mx-auto cursor-pointer'
                    onClick={() => {
                      document.startViewTransition(() => {
                        flushSync(() => {
                          setTransitionName(`${el.name}-${el.id}`)
                          setImage({
                            url: el.img,
                            label: el.name,
                          })
                        })
                      })
                    }}
                    style={{ viewTransitionName: !transitionName && `${el.name}-${el.id}` }}
                    />
                  </div>
                </td>
              )
            }

            <td className='py-2 whitespace-no-wrap border-b border-gray-200'>
              <div className='text-sm leading-5 text-gray-900 w-40 overflow-hidden mx-auto'>{el.name}</div>
            </td>

            <td className='py-2 whitespace-no-wrap border-b border-gray-200'>
              <div className='text-sm leading-5 text-gray-900'>S/ {el.price}</div>
            </td>

            <td className='py-2 whitespace-no-wrap border-b border-gray-200'>
              <div className='text-sm leading-5 text-gray-900'>{el.quantity}</div>
            </td>

            <td
              className='py-2 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
              <div className='text-sm leading-5 text-gray-900'>
                S/ {(parseFloat(el.price) * parseFloat(el.quantity))?.toFixed(2)}
              </div>
            </td>
            <td
              className='py-2 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative max-w-[200px]'>
              <div className='text-sm leading-5 text-gray-900 w-48 overflow-hidden mx-auto'>{el.description}</div>
            </td>
            <td
              className='py-2 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
              <div onClick={() => {
                const filteredItems = data.filter(item => item.id !== el.id);
                setData(filteredItems);
              }}>
                <Icon icon={faTrash} css={'text-red-800 hover:scale-125 transition ease-out  cursor-pointer'} size='25px' />
              </div>
            </td>
          </tr>
        ))
      }
    </tbody>
  )
}

function ExpenseModal({ setMustSearchExpense, inputExpense, setInputExpense, loadingExpense, dataExpense, selectExpense, setSelectExpense, setExpenses, initialStateExpense, expenses, setHelperSearchExpense, setHelperExpense }) {
  return (
    <>
      <div className='relative w-full col-span-full'>
        <ReactSelect setMustSearch={setMustSearchExpense} input={inputExpense} setInput={setInputExpense} label={'Egresos'} setHelperSearch={setHelperSearchExpense} setHelper={setHelperExpense} >
          {
            loadingExpense
              ?
              <div className='w-full sm:w-1/2 mx-auto py-4'>
                <Spinner message={'Buscando las razones de egreso ...'} />
              </div>
              :
              dataExpense.data?.length === 0
                ?
                <h3 className='cursor-pointer py-4 text-center'>No hay servicios con este dato ...</h3>
                :
                <ul className='px-5 py-2'>
                  {
                    dataExpense.data?.map((el, index) => (
                      <li
                        key={index} className='cursor-pointer hover:bg-slate-600 rounded p-2'
                        onClick={() => {
                          setMustSearchExpense(false)
                          setInputExpense(el.reason)
                          setSelectExpense(prev => {
                            return {
                              ...prev,
                              expense_id: el.id,
                              reason: el.reason
                            };
                          });
                        }
                        }
                      >{`${el.reason}`}</li>))
                  }
                </ul>
          }
        </ReactSelect>
      </div>

      {
        inputExpense.length > 0 && (
          <>
            <div className='relative border border-gray-600 rounded w-full col-span-full'>
              <input
                type='number'
                className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-gray-600  placeholder:text-gray-600  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                value={selectExpense.subtotal}
                onChange={(e) => {
                  setSelectExpense(prev => {
                    return {
                      ...prev,
                      subtotal: e.target.value
                    };
                  });
                }}
                required />
              <label
                className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[1.8rem] peer-focus:scale-[0.9] peer-data-[te-input-state-active]:-translate-y-[2rem] peer-data-[te-input-state-active]:scale-[0.9] motion-reduce:transition-none text-gray-600  peer-focus:text-primary peer-valid:-translate-y-[1.8rem] peer-valid:scale-[0.9] peer-valid:text-primary'
              >
                Dinero
              </label>
            </div>
            <button type='button' className='w-full col-span-full bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-700' onClick={() => {
              if (!selectExpense) {
                return
              }
              setExpenses(prev => {
                if (!selectExpense.expense_id) {
                  return [...prev]
                }
                return [...prev, selectExpense]
              })
              setInputExpense('')
              setSelectExpense(initialStateExpense)
            }}>
              Agregar razón
            </button>
          </>
        )
      }

      {
        expenses.length > 0 && (
          <div className='col-span-full'>
            <Table>
              <Table.HeaderTable names={['subtotal', 'razón', 'eliminar']} />
              <tbody className='bg-white text-center'>
                {
                  expenses.map((el, index) => (
                    <tr className='hover:bg-sky-200' key={index}>
                      <td className='py-2 whitespace-no-wrap border-b border-gray-200'>
                        <div className='text-sm leading-5 text-gray-900'>S/ {el.subtotal}</div>
                      </td>

                      <td className='py-2 whitespace-no-wrap border-b border-gray-200 min-w-72'>
                        <div className='text-sm leading-5 text-gray-900'>{el.reason}</div>
                      </td>
                      <td
                        className='px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 relative'>
                        <div onClick={() => {
                          const filteredItems = expenses.filter(item => item.id !== el.id);
                          setExpenses(filteredItems);
                        }}>
                          <Icon icon={faTrash} css={'text-red-800 hover:scale-125 transition ease-out cursor-pointer'} size='25px' />
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
        )
      }
    </>
  )
}

SectionCashRegister.Header = Header
SectionCashRegister.Search = Search
SectionCashRegister.ExcelButton = ExcelButton
SectionCashRegister.Pagination = Pagination
SectionCashRegister.SectionCashRegisterModal = SectionCashRegisterModal

SectionCashRegisterModal.ButtonContainer = ButtonContainer
SectionCashRegisterModal.CustomerModal = CustomerModal
SectionCashRegisterModal.ProductModal = ProductModal
SectionCashRegisterModal.ServiceModal = ServiceModal
SectionCashRegisterModal.ExpenseModal = ExpenseModal

Table.HeaderTable = HeaderTable
Table.BodyProductTable = BodyProductTable
Table.BodyServiceTable = BodyServiceTable
Table.BodyExpenseTable = BodyExpenseTable
Table.BodyVoucherTable = BodyVoucherTable

export default SectionCashRegister
