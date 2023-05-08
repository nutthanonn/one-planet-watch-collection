import axios from 'axios';
import { SERVER_BASE_URL } from '@config/BASE_URL';
import { Cookies } from 'react-cookie';

axios.defaults.baseURL = SERVER_BASE_URL;

export interface Root {
  data: UserRequestData[];
  error: string;
  message: string;
}

export interface UserRequestData {
  id: string;
  user_id: string;
  brand: string;
  name: string;
  description: string;
  image: string;
  read: boolean;
}

const GetUserRequestAPI = async () => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const res: Root = await axios
    .get<Root>('/request', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
  return res;
};

export default GetUserRequestAPI;
