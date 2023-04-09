import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from './defaultURL';

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

  if (res.role !== 'admin') {
    window.location.href = '/';
  }

  return res;
};

export default GetRoleAPI;
