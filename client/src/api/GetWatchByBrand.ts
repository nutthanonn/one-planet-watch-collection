import axios from 'axios';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

interface Response {
  data: WatchModel[];
  error?: string;
  status: string;
}

interface WatchModel {
  model: string;
  watches: Watch[];
}

interface Watch {
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

const GetWatchByBrandAPI = async (brand: string) => {
  const res: Response = await axios
    .get<Response>(`/watches/brand?brand=${brand}`)
    .then((res) => res.data)
    .catch((error) => error.response.data);

  return res;
};

export default GetWatchByBrandAPI;
