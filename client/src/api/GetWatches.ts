import axios from 'axios';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

export interface Response {
  data: WatchData[];
  error: string;
  status: string;
}

export interface WatchData {
  brand: string;
  models: Model[];
}

export interface Model {
  id: string;
  brand: string;
  model: string;
  name: string;
  description: string;
  image: string;
  sub_images?: string[];
  sub_descriptions?: string[];
  favorite: string[];
}

const GetWatchesAPI = async () => {
  const res: Response = await axios
    .get<Response>('/watches?q=20')
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

export default GetWatchesAPI;
