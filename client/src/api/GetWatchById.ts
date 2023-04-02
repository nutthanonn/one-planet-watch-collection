import axios from 'axios';
import { SERVER_BASE_URL } from './defaultURL';

axios.defaults.baseURL = SERVER_BASE_URL;

export interface Response {
  data: WatchI;
  error: string | null;
  status: string;
}

export interface WatchI {
  id: string;
  brand: string;
  model: string;
  name: string;
  description: string;
  image: string;
  sub_images: string[];
  sub_descriptions: string[];
  favorite: number;
}

const GetWatchByIdAPI = async (id: string) => {
  const res: Response = await axios
    .get<Response>(`/watches/${id}`)
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

export default GetWatchByIdAPI;
