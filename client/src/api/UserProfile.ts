import { UserProfileI } from '@interfaces/UserProfile';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';

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
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });

  return response;
};

export default UserProfileAPI;
