import axios from 'axios';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

interface UserForm {
  username: string;
  email: string;
  password: string;
}

export interface Data {
  token: string;
}

export interface SignUpResponse {
  data: Data;
  error: boolean;
  message: string;
  status: string;
}

const SignUpAPI = async (props: UserForm) => {
  const res: SignUpResponse = await axios
    .post<SignUpResponse>(
      '/users/register',
      { username: props.username, email: props.email, password: props.password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });

  return res;
};

export default SignUpAPI;
