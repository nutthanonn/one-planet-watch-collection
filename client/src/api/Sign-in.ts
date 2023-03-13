import axios from 'axios';
import { Cookies } from 'react-cookie';

axios.defaults.baseURL = 'http://localhost:8080/api';

export interface SignInResponse {
  data?: {
    token: string;
  };
  error: boolean;
  message: string;
  status: string;
}

interface SignInAPIProps {
  username: string;
  password: string;
}

const SignInAPI = async (props: SignInAPIProps) => {
  const cookies = new Cookies();
  const post_data = {
    username: props.username,
    password: props.password,
  };

  const response: SignInResponse = await axios
    .post<SignInResponse>('/users/login', post_data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.data.status === 'success') {
        cookies.set('token', res.data.data?.token, { path: '/' });
      }
      return res.data;
    })
    .catch((err) => err.response.data);

  return response;
};

export default SignInAPI;
