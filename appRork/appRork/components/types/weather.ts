export interface Weather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  icon: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}
