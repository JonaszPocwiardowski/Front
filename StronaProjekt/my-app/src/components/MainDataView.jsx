import { useEffect, useState } from "react";
import weatherData from '../data/StationData.json';
import { useWeather } from "./WeatherContext";

function MainDataView() {
  const [latestWeatherS, setLatestWeather] = useState(null);
  const { latestWeather, apiWeather } = useWeather();

  useEffect(() => {
    if (!weatherData || weatherData.length === 0) return;

    let latest = weatherData[0];

    weatherData.forEach((entry) => {
      const currentDate = new Date(entry.year, entry.month - 1, entry.day, entry.hour);
      const latestDate = new Date(latest.year, latest.month - 1, latest.day, latest.hour);

      if (currentDate > latestDate) {
        latest = entry;
      }
    });

    setLatestWeather(latest);
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-[2fr_1fr] ">
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 flex flex-col justify-between relative">
        <div>
          <h2 className="text-3xl font-bold mb-1">Toruń</h2>
        <p className="text-sm opacity-90">Aktualne warunki pogodowe: {latestWeatherS?.day}/{latestWeatherS?.month}/{latestWeatherS?.year} {latestWeatherS?.hour}:00</p>
        </div>
        {latestWeatherS ? (

          <div className="space-y-4">
            <div className="text-6xl font-black drop-shadow-lg">
              {latestWeatherS.temperature}°C
            </div>

            <div className="flex items-center space-x-3">
              <i className="fas fa-cloud-sun-rain text-2xl"></i>
              <span className="text-lg font-medium">Warunki: {apiWeather?.weather ?? latestWeather.weather}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
            <p className="bg-white/10 p-2 rounded-lg flex items-center space-x-3">
            <i className="fas fa-tachometer-alt text-cyan-400"></i>
            <span>Ciśnienie: {latestWeatherS.pressure} hPa</span>
            </p>

              <p className="bg-white/10 p-2 rounded-lg">
                💧 Wilgotność: {latestWeatherS.humidity}%
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg">Ładowanie danych...</p>
        )}
      </div>

      <div className="relative h-96">
        <img
          src="Torun.jpg"
          alt="Toruń"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/30 to-blue-700/30" />
      </div>
    </div>
  );
}

export default MainDataView;

