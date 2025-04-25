import { useState } from "react";
import WeatherModal from "./WeatherModal";


function WeatherCard({ title, value, unit, iconClass, dataKey, weatherData, bgColor, borderColor, hoverColor, textColor, ChartColor, ChartColorLine }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <div >
      <div 
        className={`border ${borderColor} ${bgColor} rounded-lg shadow-md p-6 w-full ${hoverColor} transition-colors duration-300 ease-in-out cursor-pointer`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center space-x-4">
          <i className={`${iconClass} ${textColor} text-3xl`}></i>
          <div>
            <p className="text-gray-900 font-medium">{title}:</p>
            <p className="text-gray-800 font-semibold text-xl">{value}{unit}</p>
          </div>
        </div>
      </div>
      </div>

      {isModalOpen && (
        <WeatherModal 
          title={title} 
          dataKey={dataKey} 
          weatherData={weatherData} 
          ChartColor={ChartColor}
          ChartColorLine={ChartColorLine}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default WeatherCard;


  