import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

interface CreatePostProps {
  images: string[];
  description: string;
  location: string;
}

interface Response {
  status: string;
  error: string;
}

const CreatePostAPI = async (data: CreatePostProps) => {
  const cookie = new Cookies();

  const token = cookie.get('token');

  const res: Response = await axios
    .post('/user/post', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

export default CreatePostAPI;
