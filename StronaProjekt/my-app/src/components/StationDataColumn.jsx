import { useEffect, useState } from "react";
import weatherData from "../data/StationData.json";
import WeatherCard from "./WeatherCart";

function StationDataColumn() {
  const [latestWeather, setLatestWeather] = useState(null);

  useEffect(() => {
    if (!weatherData || weatherData.length === 0) return;

    setLatestWeather(weatherData[weatherData.length - 1]);
  }, []);

  const weatherCards = [
    {
      title: "Temperatura",
      key: "temperature",
      unit: "°C",
      iconClass: "fas fa-thermometer-half",
      bgColor: "bg-yellow-200",
      borderColor: "border-yellow-300",
      hoverColor: "hover:bg-yellow-300",
      textColor: "text-red-500",
      ChartColor: "rgba(250, 204, 21, 0.4)",
      ChartColorLine: "rgba(204, 149, 0, 1)",
    },
    {
      title: "Wilgotność",
      key: "humidity",
      unit: "%",
      iconClass: "fas fa-tint",
      bgColor: "bg-green-200",
      borderColor: "border-green-300",
      hoverColor: "hover:bg-green-300",
      textColor: "text-green-500",
      ChartColor: "rgba(187, 247, 208, 0.4)", 
      ChartColorLine: "rgba(49, 151, 70, 1)",
    },
    {
      title: "Ciśnienie",
      key: "pressure",
      unit: "hPa",
      iconClass: "fas fa-tachometer-alt",
      bgColor: "bg-pink-200",
      borderColor: "border-pink-300",
      hoverColor: "hover:bg-pink-300",
      textColor: "text-yellow-400",
      ChartColor: "rgba(251, 207, 232, 0.4)", 
      ChartColorLine: "rgba(189, 106, 148, 1)", 
    },
  ];

  return (
    <div className="flex flex-col w-full items-center space-y-4 p-4">
      {latestWeather ? (
        <div className="w-full bg-gray-100 rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex flex-col w-full space-y-4 p-4">
          {weatherCards.map((card) => (
            <WeatherCard
              key={card.key} 
              title={card.title}
              value={latestWeather[card.key]}
              unit={card.unit}
              iconClass={card.iconClass}
              dataKey={card.key}
              weatherData={weatherData}
              bgColor={card.bgColor}
              borderColor={card.borderColor}
              hoverColor={card.hoverColor}
              textColor={card.textColor}
              ChartColor={card.ChartColor}
              ChartColorLine={card.ChartColorLine}
            />
          ))}
          </div>
        </div>
      ) : (
        <p>Ładowanie danych...</p>
      )}
    </div>
  );
}

export default StationDataColumn;




