import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from './defaultURL';

interface Response {
  error: string;
  message: string;
}

axios.defaults.baseURL = SERVER_BASE_URL;

const DeleteWatchAPI = async (id: string) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const res: Response = await axios
    .delete(`/watches/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return res;
};

export default DeleteWatchAPI;
