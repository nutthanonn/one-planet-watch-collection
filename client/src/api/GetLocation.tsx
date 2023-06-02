import axios from 'axios';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

export interface LocationResponse {
  message: Message;
}

export interface Message {
  status: Status;
  rate: Rate;
  results: LocationResult[];
}

export interface Status {
  code: number;
  message: string;
}

export interface Rate {
  limit: number;
  remaining: number;
  reset: number;
}

export interface LocationResult {
  confidence: number;
  formatted: string;
  geometry: Geometry;
  bounds: Bounds;
}

export interface Geometry {
  lat: number;
  lng: number;
}

export interface Bounds {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

const GetLocationAPI = async (location: string) => {
  const res: LocationResponse = await axios
    .post('/location', { location })
    .then((res) => res.data)
    .catch((err) => err);

  return res;
};

export default GetLocationAPI;
