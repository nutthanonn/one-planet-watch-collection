import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';

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
  const res = await axios.post<SignUpResponse>('/users/register', props, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.data;
};

export default SignUpAPI;
