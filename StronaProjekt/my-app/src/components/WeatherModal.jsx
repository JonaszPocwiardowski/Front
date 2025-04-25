import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function WeatherModal({ title, dataKey, weatherData, onClose, ChartColor, ChartColorLine }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!weatherData) return;

    const latestEntry = weatherData[weatherData.length - 1];
    const latestHour = latestEntry.hour;
    const latestDate = new Date(latestEntry.year, latestEntry.month - 1, latestEntry.day, latestHour);

    const filteredData = weatherData.filter(entry => {
      const entryDate = new Date(entry.year, entry.month - 1, entry.day, entry.hour);
      return (latestDate - entryDate) <= 24 * 60 * 60 * 1000; 
    });

    const labels = filteredData.map(entry => `${entry.hour}:00`);
    const dataValues = filteredData.map(entry => entry[dataKey]);

    setChartData({
      labels,
      datasets: [
        {
          label: title,
          data: dataValues,
          borderColor: ChartColorLine,
          backgroundColor: ChartColor,
          borderWidth: 2,
          fill: true,
        },
      ],
    });
  }, [weatherData, dataKey]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">{title} (24h)</h2>
        {chartData ? <Line data={chartData} /> : <p>Ładowanie...</p>}
        <button 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={onClose}
        >
          Zamknij
        </button>
      </div>
    </div>
  );
}

export default WeatherModal;
