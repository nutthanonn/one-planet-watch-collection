import GetUserRequestAPI, { UserRequestData } from '@api/GetUserRequest';
import { useEffect, useState } from 'react';

export default function useUserRequest() {
  const [request, setRequest] = useState<UserRequestData[]>([]);

  useEffect(() => {
    async function getUserRequest() {
      const response = await GetUserRequestAPI();
      setRequest(response.data);
    }
    getUserRequest();
  }, []);

  return { request };
}
