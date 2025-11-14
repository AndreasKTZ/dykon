// Duvet types matching duvets.json structure

export type WarmthLevel = 'light' | 'medium' | 'warm' | 'extra-warm';
export type SeasonType = 'summer' | 'all-year' | 'winter';
export type FillingType = 'down' | 'eiderdown' | 'feathers' | 'blend';
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
  width: number;
  length: number;
  availableSizes?: string[];
}

export interface CareInstructions {
  wash: string;
  bleach: string;
  tumbleDry: string;
  iron: string;
  dryCleaning: string;
  maintenance: string;
}

export interface Certifications {
  oekotex?: boolean;
  nomite?: boolean;
  downafresh?: boolean;
  allergyFriendly?: boolean;
  downpass?: boolean;
}

export interface DuvetVariant {
  size: string;
  price: number;
  fillWeight: string;
  totalWeight?: string;
  insulationLevel: string;
  articleNumber: string;
}

export interface DuvetSpecifications {
  type: string; // e.g., "Sommerdyne", "Helårsdyne"
  duvetType: string; // e.g., "Enkeltdyne"
  fillType: string; // e.g., "Moskusdundyne"
  filling: string;
  fillPower: number;
  casing: string;
  construction: string;
  color: string;
  edging?: string;
  packaging?: string;
  quality: string;
  insulationLevel: string; // e.g., "Sval", "Medium", "Varm"
  warranty: string;
  dimensions: DuvetDimensions;
  care: CareInstructions;
  certifications: Certifications;
}

export interface ScoreBreakdown {
  comfort: number;
  temperature: number;
  weight: number;
  season: number;
  price: number;
  quality: number;
  total: number;
}

export interface Duvet {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  // Matching properties
  characteristics: DuvetCharacteristics;
  mood: string[];
  temperature: TemperaturePreference[];
  weightPreference: number;
  seasons: SeasonType[];
  priceLevel: number;
  // Display properties
  features: string[];
  specifications: DuvetSpecifications;
  variants?: DuvetVariant[];
  // Computed properties
  matchingScore?: number;
  scoreBreakdown?: ScoreBreakdown;
}

export interface DuvetsData {
  duvets: Duvet[];
}

