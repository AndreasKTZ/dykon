import type { ReactNode } from 'react';
import { Sun, CloudRain, Snowflake } from 'lucide-react';
import type { SeasonType } from '../../types/duvet';

interface WeatherRecommendationProps {
  temp: number;
  location: string;
  suggestedSeason: SeasonType;
}

const getSeasonLabel = (season: SeasonType): string => {
  const labels: Record<SeasonType, string> = {
    'summer': 'sommerdyne',
    'all-year': 'helårsdyne',
    'winter': 'vinterdyne'
  };
  return labels[season];
};

const getSeasonIcon = (season: SeasonType): ReactNode => {
  const icons: Record<SeasonType, ReactNode> = {
    'summer': <Sun size={20} />,
    'all-year': <CloudRain size={20} />,
    'winter': <Snowflake size={20} />,
  };
  return icons[season];
};

export const WeatherRecommendation = ({ temp, location, suggestedSeason }: WeatherRecommendationProps) => {
  return (
    <div className="weather-recommendation">
      <div className="weather-recommendation__content">
        <div className="weather-recommendation__info">
          <span className="weather-recommendation__temp">{temp}°C</span>
          <span className="weather-recommendation__location">{location}</span>
        </div>
        <div className="weather-recommendation__suggestion">
          <span className="weather-recommendation__icon">
            {getSeasonIcon(suggestedSeason)}
          </span>
          <span className="weather-recommendation__text">
            Vi anbefaler en {getSeasonLabel(suggestedSeason)}
          </span>
        </div>
      </div>
    </div>
  );
};

