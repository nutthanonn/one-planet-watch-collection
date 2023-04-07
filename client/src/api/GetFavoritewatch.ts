import axios from 'axios';
import { SERVER_BASE_URL } from './defaultURL';
import { Collection } from '@interfaces/WatchApi';

axios.defaults.baseURL = SERVER_BASE_URL;

interface Response {
  favorite_list: Collection[];
}

const GetFavoriteWatchAPI = async (watch_id: string[]) => {
  const res: Response = await axios
    .post(`/users/favorite`, { watch_id })
    .then((res) => res.data)
    .catch((err) => err.response.data);

  console.log(res);

  return res;
};

export default GetFavoriteWatchAPI;
