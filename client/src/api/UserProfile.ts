import axios from 'axios';
import { SERVER_BASE_URL } from './defaultURL';
import { UserProfileI } from '@interfaces/UserProfile';

axios.defaults.baseURL = SERVER_BASE_URL;

export interface UserProfileAPIResponse {
  data: UserProfileI;
  error: boolean;
  message: string;
  status: string;
}

const UserProfileAPI = async (username: string) => {
  const response: UserProfileAPIResponse = await axios
    .get<UserProfileAPIResponse>(`/users/profile/${username}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};

export default UserProfileAPI;
