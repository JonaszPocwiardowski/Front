function WeatherCardAPI({ temperature, humidity, pressure }) {
    return (
      <div className="flex flex-col w-full space-y-4 p-4">
        <div className="bg-yellow-200 border border-yellow-300 rounded-lg shadow-md p-6 w-full">
          <div className="flex items-center space-x-4">
            <i className="fas fa-thermometer-half text-red-500 text-3xl"></i>
            <div>
              <p className="text-gray-900 font-medium">Temperatura:</p>
              <p className="text-gray-800 font-semibold text-xl">{temperature}°C</p>
            </div>
          </div>
        </div>
        <div className="bg-green-200 border border-green-300 rounded-lg shadow-md p-6 w-full">
          <div className="flex items-center space-x-4">
            <i className="fas fa-tint text-green-500 text-3xl"></i>
            <div>
              <p className="text-gray-900 font-medium">Wilgotność:</p>
              <p className="text-gray-800 font-semibold text-xl">{humidity}%</p>
            </div>
          </div>
        </div>
        <div className="bg-pink-200 border border-pink-300 rounded-lg shadow-md p-6 w-full">
          <div className="flex items-center space-x-4">
            <i className="fas fa-tachometer-alt text-yellow-400 text-3xl"></i>
            <div>
              <p className="text-gray-900 font-medium">Ciśnienie:</p>
              <p className="text-gray-800 font-semibold text-xl">{pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
    );
}

  
  export default WeatherCardAPI;