import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from './defaultURL';

axios.defaults.baseURL = SERVER_BASE_URL;

interface RequestData {
  name: string;
  description: string;
  image: string;
  brand: string;
}

interface Response {
  message: string;
  error: string;
}

const CreateRequestAPI = async (data: RequestData) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  console.log(token);

  const res: Response = await axios
    .post('/request', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

export default CreateRequestAPI;
