import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCart';
import localWeatherData from '../data/StationData.json';
import { useWeather } from './WeatherContext';
import WeatherCardAPI from './WeatherCartAPI';

function WeatherFromAPI() {
  const { latestWeather, apiWeather } = useWeather();

  return (
    <div className="flex flex-col w-full items-center space-y-4 p-4">
        <div className="w-full bg-gray-100 rounded-lg shadow-md p-4 border border-gray-200">
        <WeatherCardAPI
          temperature={apiWeather?.temperature ?? latestWeather?.temperature}
          humidity={apiWeather?.humidity ?? latestWeather?.humidity}
          pressure={apiWeather?.pressure ?? latestWeather?.pressure}
        />
      </div>
    </div>
  );
}

export default WeatherFromAPI;
