import React from 'react';
import StationDataColumn from '../components/StationDataColumn';
import WeatherFromAPI from '../components/APIDataColumn';
import MainDataView from '../components/MainDataView';

function Home() {
  return (
    <div className=" w-full bg-gray-100 p-3 flex flex-col items-center">
      <div className="w-full max-w-screen p-1 mb-4">
        <MainDataView />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-300">
          <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">Dane ze Stacji</h2>
          <StationDataColumn />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-300">
          <h2 className="text-xl font-semibold text-center text-green-600 mb-4">Dane z API</h2>
          <WeatherFromAPI />
        </div>

      </div>
    </div>
  );
}


export default Home;

