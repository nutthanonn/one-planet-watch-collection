import axios from 'axios';
import { SERVER_BASE_URL } from './defaultURL';

export interface Model {
  id: string;
  brand: string;
  model: string;
  name: string;
  description: string;
  image: string;
  sub_images?: string[];
  sub_descriptions?: string[];
  favorite: string[];
}

interface Post {
  id: string;
  images: string[];
  description: string;
}

export interface User {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  post?: Post[];
  follower?: string[];
  following?: string[];
}

export interface Data {
  users: User[];
}

export interface Response {
  data: Data;
  error?: string;
  status: string;
}

axios.defaults.baseURL = SERVER_BASE_URL;

const SearchItemAPI = async (searchKey: string) => {
  const res: Response = await axios
    .get<Response>(`/search/user?q=${searchKey}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });

  return res.data;
};

export default SearchItemAPI;
