import axios from 'axios';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

export interface WatchTrending {
  data: DataPercentage[];
  status: string;
}

export interface DataPercentage {
  watch: Watch;
  percentage: number;
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

const GetTrendingAPI = async () => {
  const res: WatchTrending = await axios
    .get('/stats')
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

export default GetTrendingAPI;
