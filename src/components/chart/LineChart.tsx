import { Line } from "react-chartjs-2";
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
import ComponentLineChart from "../../types/ComponentLineChart";


const LineChart: React.FC<ComponentLineChart> = ({ labels, data, dataLabel, text }) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
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
                backgroundColor: "rgba(75, 192, 192, 0.2)"
            }
        ]
    };

    return (
        <div className="w-full">
            <Line options={options} data={renderData} />
        </div>
    );
}

export default LineChart;