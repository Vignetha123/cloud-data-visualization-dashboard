import React from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProductChart({ products }) {
  const countsByDay = {};
  (products || []).forEach((product) => {
    const date = product.date;
    if (!date || date === 'N/A') return;
    countsByDay[date] = (countsByDay[date] || 0) + 1;
  });

  // Use the actual dates from the data, sorted
  const labels = Object.keys(countsByDay).sort();

  // If no data, show a placeholder
  if (labels.length === 0) {
    labels.push('No Data');
  }

  const data = labels.map((day) => (day === 'No Data' ? 0 : countsByDay[day]));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Product Count',
        data,
        borderColor: '#007BFF',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: false,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: '#007BFF',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Products',
        },
        ticks: {
          stepSize: 1,
        },
        min: 0,
        max: Math.max(...data, 7) + 1,
      },
      x: {
        title: {
          display: true,
          text: 'Day',
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ProductChart;