import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

interface UpdateUserProfileAPIProps {
  bio?: string;
  avatar?: string;
  username: string;
  background_profile?: string;
  password: string;
}

export interface UserProfileUpdateResponse {
  data: Data;
  error: boolean;
  message: string;
  status: string;
}

export interface Data {
  token: string;
}

export const UpdateUserProfileAPI = async (data: UpdateUserProfileAPIProps) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const res: UserProfileUpdateResponse = await axios
    .patch<UserProfileUpdateResponse>(`/users/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      cookies.remove('token', { path: '/' });
      cookies.set('token', res.data.data.token, { path: '/' });

      window.location.href = data.username;

      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return res;
};
