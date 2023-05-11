import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

const GetRoleAPI = async () => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const res = await axios
    .get('/users/check/role', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return res;
};

export default GetRoleAPI;
