import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import ComponentLineChart from "../../types/ComponentLineChart";


const BarChart: React.FC<ComponentLineChart> = ({ labels, data, dataLabel, text }) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        BarElement,
        Title,
        Tooltip,
        Legend,
        Filler
    );

    const options = {
        responsive: true,
        tension: 0.3,
        plugins: {
            legend: {
                position: "top" as const
            },
            title: {
                display: true,
                text: text
            }
        },
        scales: {
            y: {
                ticks: {
                    precision: 0
                }
            }
        }
    };

    const renderData = {
        labels,
        datasets: [
            {
                label: dataLabel,
                data: data,
                borderColor: "rgba(75, 192, 192, 0.2)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true
            }
        ]
    };

    return (
        <div className="w-full">
            <Bar options={options} data={renderData} />
        </div>
    );
}

export default BarChart;