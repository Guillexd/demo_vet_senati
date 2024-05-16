import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
export default function BarChart({ sale }) {
    const names = sale.map(item => item.name);
    const repeticiones = sale.map(item => parseInt(item.repeticiones, 10));
    const datos = {
        labels: names,
        datasets: [
            {
                label: 'Ventas',
                data: repeticiones,
                borderColor: '#70d6ea',
                backgroundColor: '#70d6ea',
            },
        ],
    };


    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        maintainAspectRatio: true,
        borderRadius: 5,
    };
    return <Bar data={datos} options={options} />

}
