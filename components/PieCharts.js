import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, user, myProker }) => {
  const chartRef = useRef(null);
  const prokerku = myProker;
  const [dataProker, setDataProker] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const userku = user.filter((item) => item.role !== "kemahasiswaan" && item.role !== "waket");
  const calculatePercentage = (value, totalValue) => {
    return ((value * 100) / totalValue).toFixed(2) + "%";
  };

  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  const filterTable = (label) => {
    const dataku = prokerku.filter((item) => item.author === label.toLowerCase());
    setDataProker(dataku);
    setIsOpen(!isOpen);
  }

  const valueData = data.map((item) => {
    const itemPercentage = calculatePercentage(item.value, totalValue);
    return <div><a href="#" onClick={() => filterTable(item.label)} className={`block max-w-sm p-3 ${item.color} border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
      <h5 className="mb-2 text-base font-black tracking-tight text-black dark:text-white">{item.label}</h5>
      <p className="font-bold text-black dark:text-gray-400">{itemPercentage}</p>
    </a>

    </div>;
  });

  function parseToRupiah(numberString) {
    const number = parseFloat(numberString);
    if (isNaN(number)) {
      return "Invalid number";
    }
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(number);
  }


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
      aspectRatio: 1.5,
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
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
              <div className="px-4 py-3 border-b">
                <h3 className="text-lg font-bold">Table Proker</h3>
              </div>

              <div className="p-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rencana Strategis
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Anggaran
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataProker.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.nama_proker}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{parseToRupiah(item.total_anggaran)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.status}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-4 py-3 border-t">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close Modal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChart;
