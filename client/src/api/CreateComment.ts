import axios from 'axios';
import { Cookies } from 'react-cookie';
import { SERVER_BASE_URL } from '@config/BASE_URL';

axios.defaults.baseURL = SERVER_BASE_URL;

interface CommentI {
  post_id: string;
  user_id: string;
  avatar: string;
  username: string;
  content: string;
}

interface CommentResponse {
  status: string;
  error: string;
}

const CreateCommentAPI = async (data: CommentI) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const res: CommentResponse = await axios
    .post(`/user/post/${data.post_id}/${data.user_id}/comment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => error.response.data);

  return res;
};

export default CreateCommentAPI;
