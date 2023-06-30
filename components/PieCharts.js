import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, user, myProker }) => {
  const chartRef = useRef(null);
  console.log(data);
  console.log(myProker)
  const userku = user.filter((item) => item.role !== "kemahasiswaan" && item.role !== "waket");
  const calculatePercentage = (value, totalValue) => {
    return ((value * 100) / totalValue).toFixed(2) + "%";
  };

  // Assuming data is an array of objects with a 'value' property
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  const valueData = data.map((item) => {
    const itemPercentage = calculatePercentage(item.value, totalValue);
    return <div><a href="#" className={`block max-w-sm p-3 ${item.color} border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
      <h5 className="mb-2 text-base font-black tracking-tight text-black dark:text-white">{item.label}</h5>
      <p className="font-bold text-black dark:text-gray-400">{itemPercentage}</p>
    </a></div>;
  });




  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chartData = {
      labels: userku.map((item) => item.role),
      datasets: [
        {
          data: data.map((item) => item.value),
          backgroundColor: data.map((item) => item.sector),
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      // maintainAspectRatio: false, // Disable maintaining aspect ratio
      aspectRatio: 1.5, // Set the desired aspect ratio (width:height)
      plugins: {
        legend: {
          position: 'bottom',
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.raw || '';
              const percentage = ((value * 100) / chartData.datasets[0].data.reduce((acc, curr) => acc + curr)).toFixed(2) + "%";
              return `${label}: ${value} (${percentage})`;
            },
            display: "outside",
          },
        },
      },
    };

    const chart = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div className='grid grid-cols-2'>
      <div>
        <canvas ref={chartRef} className='' />
      </div>
      <div className='grid grid-cols-4 gap-1 m-4'>
        {valueData}
      </div>
    </div>
  );
};

export default PieChart;
