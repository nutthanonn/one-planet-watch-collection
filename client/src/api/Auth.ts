import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from './defaultURL';

axios.defaults.baseURL = SERVER_BASE_URL;

export interface Claims {
  email: string;
  exp: number;
  iat: number;
  name: string;
  sub: string;
  verify: boolean;
}

export interface AuthResponse {
  claims: Claims;
  error?: string;
}

const Auth = async () => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const res: AuthResponse = await axios
    .get<AuthResponse>('/token/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);

  return res;
};

export default Auth;
