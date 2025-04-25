import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import localWeatherData from "../data/StationData.json";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [latestWeather, setLatestWeather] = useState(null);
  const [apiWeather, setApiWeather] = useState(null);

  const findLatestEntry = () => {
    if (!localWeatherData || localWeatherData.length === 0) return null;

    return localWeatherData.reduce((latest, current) => {
      const currentDate = new Date(current.year, current.month - 1, current.day, current.hour);
      const latestDate = new Date(latest.year, latest.month - 1, latest.day, latest.hour);
      return currentDate > latestDate ? current : latest;
    });
  };

  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light",
    53: "Drizzle: Moderate",
    55: "Drizzle: Dense",
    61: "Rain: Slight",
    63: "Rain: Moderate",
    65: "Rain: Heavy",
    80: "Rain showers: Slight",
    81: "Rain showers: Moderate",
    82: "Rain showers: Violent",
  };
  

  useEffect(() => {
    const fetchWeatherFromAPI = async (date) => {
      try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude: 53.0138,
            longitude: 18.5984,
            hourly: "temperature_2m,relative_humidity_2m,pressure_msl,weather_code",
            start_date: `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`,
            end_date: `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`,
            timezone: "Europe/Warsaw",
          },
        });

        const targetHour = date.hour.toString().padStart(2, "0") + ":00";
        const hourIndex = response.data.hourly.time.findIndex((t) => t.endsWith(targetHour));

        if (hourIndex === -1) throw new Error("Nie znaleziono danych dla podanej godziny");

        setApiWeather({
          temperature: response.data.hourly.temperature_2m[hourIndex],
          humidity: response.data.hourly.relative_humidity_2m[hourIndex],
          pressure: response.data.hourly.pressure_msl[hourIndex],
          weather: weatherDescriptions[response.data.hourly.weather_code[hourIndex]] || "Unknown",        });
      } catch (error) {
        console.error("Błąd API:", error.message);
      }
    };

    const latestEntry = findLatestEntry();
    if (latestEntry) {
      setLatestWeather(latestEntry);
      fetchWeatherFromAPI(latestEntry);
    }
  }, []);

  return (
    <WeatherContext.Provider value={{ latestWeather, apiWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
