import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from '@config/BASE_URL';
import { DataType } from '@components/admin/AdminTable';

axios.defaults.baseURL = SERVER_BASE_URL;

const UpdateModelAPI = async (data: DataType) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  if (!token) {
    return {
      status: 401,
      data: {
        message: 'Unauthorized',
      },
    };
  }

  if (!data.image || !data.model || !data.name.title || !data.description) {
    return {
      status: 400,
      data: {
        message: 'Please fill all the fields',
      },
    };
  }

  const updateData = {
    image: data.image,
    model: data.model,
    name: data.name.title,
    description: data.description,
  };

  const res = await axios
    .put(`/watches/${data.key}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error.response);

  return res;
};

export default UpdateModelAPI;
