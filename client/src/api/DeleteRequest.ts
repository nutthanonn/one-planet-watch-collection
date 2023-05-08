import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

interface Response {
  message: string;
  error: string;
}

const DeleteRequestAPI = async (id: string) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const res: Response = await axios
    .delete(`/request/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return res;
};

export default DeleteRequestAPI;
