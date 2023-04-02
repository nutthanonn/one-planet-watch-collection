import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from './defaultURL';

axios.defaults.baseURL = SERVER_BASE_URL;

interface Response {
  error: string | null;
  message: string | null;
}

const AddFavoriteAPI = async (model_id: string) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const res: Response = await axios
    .post<Response>(`/favorite/${model_id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      return err.response.data;
    });

  return res;
};

export default AddFavoriteAPI;
