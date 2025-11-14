import type { SeasonType } from './duvet';

export interface WeatherInfo {
  temp: number;
  location: string;
  condition: string;
  suggestedSeason: SeasonType;
}

export interface GeolocationResponse {
  latitude: number;
  longitude: number;
  city: string;
  country_name: string;
}

export interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
  };
}

