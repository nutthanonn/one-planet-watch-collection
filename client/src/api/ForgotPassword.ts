import axios from 'axios';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

const ForgotPasswordAPI = async (username: string) => {
  const response = await axios
    .post('/users/forgot/password', {
      username,
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
  return response;
};

export default ForgotPasswordAPI;
