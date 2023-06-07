import axios from 'axios';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

const PasswordResetAPI = async (token: string, new_password: string) => {
  const response = await axios
    .patch(
      '/users/password/reset',
      {
        password: new_password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return response;
};

export default PasswordResetAPI;
