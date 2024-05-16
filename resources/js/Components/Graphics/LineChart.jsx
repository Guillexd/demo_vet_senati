
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export default function LineChart({neto}) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Line Chart',
      // },
    },
  };

  const labels = neto.map(item => item.month);

  const data = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: neto.map(item => parseFloat(item.total)),
        borderColor: '#70d6ea',
        backgroundColor: '#70d6ea',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
