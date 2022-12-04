export type Suggestion = {
  name: string;
  latitude: string;
  longitude: string;
  score: number;
  distance?: number;
};

export type City = {
  city: string;
  lat: number;
  lng: number;
  country: string;
  population: number;
  distance?: number;
};
