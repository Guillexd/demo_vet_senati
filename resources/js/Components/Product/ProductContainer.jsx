import ReactDOM from 'react-dom/client'
import HeaderTable from '../HeaderTable';
import { faBone, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Filters from '../Filters';
import SectionData from '../SectionData';
import useDebounce from '../useDebounce';
import useFetchData from '../../utils/useFetchData';
import Loading from '../presentational/Loading';
import Icon from '../../utils/Icon';
import Footer from '../Footer';
import Product from './Product';
import ProductModal from './ProductModal';
import ImageModal from '../ImageModal';
import { fetchData, showNotification } from '../../utils/utils';

function ProductContainer() {

  const initialStateProduct = {
    id: '',
    name: '',
    price: '',
    purchase_price: '',
    stock: '',
    utility: '',
    serie: '',
    product_image: null,
    description: 'No hay descripción.',
    due_date: '',
  }

  const filters = [
    {
      name: 'Nombre',
      value: 'name',
    },
    {
      name: 'Código',
      value: 'id',
    },
    {
      name: 'Serie',
      value: 'serie',
    },
  ]

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12);
  const [filter, setFilter] = useState('name');
  const [inputFilter, setInputFilter] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const { debounceValue } = useDebounce(inputFilter, 500)
  const [helper, setHelper] = useState(0)
  const url = `/products/list?page=${page}&limit=${limit}&filter=${filter}&inputFilter=${debounceValue}&dueDate=${dueDate}&startDate=${startDate}&finishDate=${finishDate}`
  const { data, loading } = useFetchData(url, [page, limit, helper])
  const [option, setOption] = useState('Crear')
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState(initialStateProduct)
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

  useEffect(() => {
    setTimeout(() => {
      fetchData('/products/by_due_date')
      .then(value => {
        if(value.count == 0) return

        const title = document.createElement('p');
        title.classList.add('text-center')
        title.innerText = `!Tienes ${value.count} producto(s) por vencer en el rango de 30 días!`;

        const footer = document.createElement('div');
        footer.classList.add('text-start')
        footer.classList.add('ms-5')
        value.products.forEach((el) => {
          footer.innerHTML += `
            <li class='font-bold'>${el.name}</li>
          `;
        })

        showNotification(title, footer)
      })
    }, 1000)
  }, [])

  return (
    <>
      <HeaderTable icon={faBone} message={'Gestión de productos'} name={'producto'} setOpen={setOpen} setOption={setOption} setData={setProduct} initialState={initialStateProduct} />

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
          setDueDate('')
          setStartDate('')
          setFinishDate('')
          setPage(1)
          setHelper((prev) => prev + 1)
        }} filter={filter} filters={filters} >
          <div className='flex flex-col'>
            <span className='font-bold text-sm my-2'>Fecha de vencimiento</span>
            <input type='date' className='p-2 rounded-xl bg-gray-300 w-full'
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value)
                setPage(1)
                setHelper(prev => prev + 1)
              }} />
          </div>
          <div className='flex flex-col'>
            <span className='font-bold text-sm my-2'>Fecha inicio</span>
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
          hide={!debounceValue && !startDate && !finishDate && !dueDate}
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
                tag: 'Fecha de vencimiento',
                input: dueDate.length > 0 ? dueDate : null,
                handleClick: () => {
                  setDueDate('')
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
              <Loading message={'Cargando productos'} />
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
                    {data?.data?.map((productI, index) => (
                      <SectionData.CardContainer.Card mustAnimate={mustAnimate} setMustAnimate={setMustAnimate} key={`${productI.id}-${index}`}>
                        <Product productI={productI} setProduct={setProduct} setOption={setOption} setOpenModal={setOpen} setHelper={setHelper} setMustLoad={setMustLoad} setMustAnimate={setMustAnimate} setOpenImage={setOpenImage} setImage={setImage} />
                      </SectionData.CardContainer.Card>
                    ))}
                  </>
              )
          }
        </SectionData.CardContainer>
        <SectionData.Pagination pageQuantity={data.current_page * data.per_page} quantity={data.total} setMustLoad={setMustLoad} setLimit={setLimit} setPage={setPage} nextPage={data.next_page_url} prevPage={data.prev_page_url} page={data.current_page} lastPage={data.last_page} setMustAnimate={setMustAnimate} />
      </SectionData>
      <ImageModal image={image} open={openImage} setOpen={setOpenImage} />
      <ProductModal product={product} option={option} open={open} setOpen={setOpen} setMustLoad={setMustLoad} setHelper={setHelper} />
      <Footer />
    </>
  )
}

const Index = ReactDOM.createRoot(document.getElementById('product'));
Index.render(<ProductContainer />)
