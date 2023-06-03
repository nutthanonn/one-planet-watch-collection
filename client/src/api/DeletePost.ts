import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

interface Response {
  status: string;
  error: string;
}

const DeletePostAPI = async (post_id: string) => {
  const cookies = new Cookies();

  const token = cookies.get('token');

  const res: Response = await axios
    .delete(`/user/post/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

export default DeletePostAPI;
