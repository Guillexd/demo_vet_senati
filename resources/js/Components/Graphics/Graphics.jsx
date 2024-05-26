import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import { DefaultHeader, DefaultTitle } from '../HeaderTable';
import { faFileExcel, faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import LinesChart from './LineChart';
import Footer from '../Footer';
import BarChart from './BarChart';
import Icon from '../../utils/Icon';
import Piechart from './PieChart';

export default function Graphics() {

  const [datos, setDatos] = useState({ capital: 0, sale: [], neto: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/graphics/list');
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const ContainerStyle = "border rounded-lg border-vetgreen-200 shadow-lg p-4 my-4"
  return (
    <div className='relative' >
      <DefaultHeader icon={faPeopleArrows} message={"Estadísticas"} />
      <div className='min-w-full py-4'></div>
      {/* Capital total */}
      <div className='flex md:flex-row flex-col justify-around min-w-full mb-4'>
        <div className='py-2 px-6 rounded-full shadow-lg bg-vetgreen-100 text-vetbrown'>
          <p className='text-center'>Capital Total: <strong>S/. {datos.capital}</strong> </p>
        </div>
      </div>
      <div className='flex flex-col xl:flex-row flex-wrap justify-center items-center xl:items-stretch gap-5'>
        <div className={ContainerStyle + " w-full md:w-5/6 xl:w-[calc(40%)]"}>
          <DefaultTitle message={"Productos más vendidos del mes"} />
          <BarChart sale={datos.sale} />
        </div>
        <div className={ContainerStyle + " w-full md:w-3/6 xl:w-2/6"}>
          <DefaultTitle message={"Servicios más solicitados del mes"} />
          <Piechart services={datos.services} />
        </div>
        <div className={ContainerStyle + " w-full md:w-5/6 xl:w-[calc(40%)]"}>
          <DefaultTitle message={"Ingreso Neto"} />
          <div>
            <LinesChart neto={datos.neto} />
          </div>
        </div>
      </div>
      <ExcelButton />
      <Footer />
    </div>
  )
}

function ExcelButton() {
    const [date, setDate] = useState('')
    return (
      <div className='bg-vetwhite shadow-2xl p-5 rounded-xl'>
        <span className='font-semibold text-lg text-gray-600'>Productos y servicios más vendidos del mes</span>
        <input type='month' className='p-2 rounded-xl bg-gray-300 w-full mt-2'
          value={date}
          onChange={(e) => {
            setDate(e.target.value)
          }}
        />
        <a
          href={date.length > 0 ? `/graphics/get_excel_products_by_month?month=${date.split('-')[1]}&year=${date.split('-')[0]}` : '#'}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex mt-5 w-full'
        >
          <span className='mx-auto'>
            <Icon icon={faFileExcel} css={'mr-2'} size='25px' />
            Descargar Excel
          </span>
        </a>
      </div>
    )
  }

const Index = ReactDOM.createRoot(document.getElementById('graphics'));
Index.render(<Graphics />)
