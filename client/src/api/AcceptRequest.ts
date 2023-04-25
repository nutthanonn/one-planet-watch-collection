import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from './defaultURL';

axios.defaults.baseURL = SERVER_BASE_URL;

interface Response {
  message: string;
  error: string;
}

const AcceptRequestAPI = async (id: string) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  console.log(token);

  const res: Response = await axios
    .post(`/request/accept/${id}`, null, {
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

export default AcceptRequestAPI;
