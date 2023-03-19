import Auth, { Claims } from '@api/Auth';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';

const useVerifyToken = () => {
  const cookies = new Cookies();
  const [claims, setClaims] = useState<Claims>();

  useEffect(() => {
    const token = cookies.get('token');
    if (!token) {
      return;
    }

    async function fetchAuth() {
      const res = await Auth();
      setClaims(res.claims);
    }

    fetchAuth();
  }, []);

  return { claims };
};

export default useVerifyToken;
