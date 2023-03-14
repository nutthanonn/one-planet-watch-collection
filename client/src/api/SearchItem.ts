import axios from 'axios';

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

export interface User {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  post?: string[];
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

axios.defaults.baseURL = 'http://localhost:8080/api';

const SearchItemAPI = async (searchKey: string) => {
  const res: Response = await axios
    .get<Response>(`/search/user?q=${searchKey}`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });

  return res.data;
};

export default SearchItemAPI;
