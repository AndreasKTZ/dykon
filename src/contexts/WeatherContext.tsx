import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { WeatherInfo, GeolocationResponse, OpenMeteoResponse } from '../types/weather';
import type { SeasonType } from '../types/duvet';

interface WeatherContextType {
  weather: WeatherInfo | null;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};

// Map temperature to season
const getSeasonFromTemp = (temp: number): SeasonType => {
  if (temp < 15) return 'winter';
  if (temp >= 15 && temp <= 23) return 'all-year';
  return 'summer';
};

// Fetch weather data
const fetchWeatherData = async (): Promise<WeatherInfo | null> => {
  try {
    // Step 1: Get user location via IP geolocation
    const geoResponse = await fetch('https://ipapi.co/json/');
    if (!geoResponse.ok) {
      console.warn('Geolocation fetch failed');
      return null;
    }
    
    const geoData: GeolocationResponse = await geoResponse.json();
    const { latitude, longitude, city } = geoData;

    // Step 2: Get weather data from Open-Meteo
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
    );
    
    if (!weatherResponse.ok) {
      console.warn('Weather fetch failed');
      return null;
    }

    const weatherData: OpenMeteoResponse = await weatherResponse.json();
    const temp = Math.round(weatherData.current.temperature_2m);
    const suggestedSeason = getSeasonFromTemp(temp);

    return {
      temp,
      location: `${city}`,
      condition: temp < 15 ? 'cold' : temp > 23 ? 'hot' : 'moderate',
      suggestedSeason
    };
  } catch (error) {
    console.warn('Weather data fetch failed:', error);
    return null;
  }
};

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    fetchWeatherData().then(data => {
      if (data) {
        setWeather(data);
      }
    });
  }, []);

  return (
    <WeatherContext.Provider value={{ weather }}>
      {children}
    </WeatherContext.Provider>
  );
};

