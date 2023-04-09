import axios from 'axios';
import { SERVER_BASE_URL } from './defaultURL';

axios.defaults.baseURL = SERVER_BASE_URL;

export interface Response {
  data: Model[];
  error: string;
  status: string;
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

const GetAllWatchAPI = async () => {
  const res: Response = await axios
    .get<Response>('/watches')
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

export default GetAllWatchAPI;
