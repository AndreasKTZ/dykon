// Duvet types matching duvets.json structure

export type WarmthLevel = 'light' | 'medium' | 'warm' | 'extra-warm';
export type SeasonType = 'summer' | 'all-year' | 'winter' | '4-season';
export type FillingType = 'dun' | 'fjer' | 'blanding';
export type TemperaturePreference = 'cool' | 'moderate' | 'warm';

export interface DuvetCharacteristics {
  warmth: WarmthLevel;
  weight: 'light' | 'medium' | 'heavy';
  season: SeasonType;
  filling: FillingType;
  fillPower: number;
  threadCount: number;
}

export interface DuvetDimensions {
  '140x200': boolean;
  '140x220': boolean;
  '200x200': boolean;
  '200x220': boolean;
}

export interface DuvetSpecifications {
  material: string;
  filling: string;
  fillWeight: string;
  dimensions: DuvetDimensions;
}

export interface Duvet {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  characteristics: DuvetCharacteristics;
  mood: string[];
  temperature: TemperaturePreference[];
  weightPreference: number;
  seasons: SeasonType[];
  priceLevel: number;
  features: string[];
  specifications: DuvetSpecifications;
  matchingScore?: number;
}

export interface DuvetsData {
  duvets: Duvet[];
}

