import Auth, { Claims } from '@api/Auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';

const useAuth = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [claims, setClaims] = useState<Claims>();

  useEffect(() => {
    const token = cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    async function fetchAuth() {
      const res = await Auth();

      if (res.error) {
        navigate('/login');
        return;
      }

      setClaims(res.claims);
      navigate(`/${res.claims.name}`);
    }

    fetchAuth();
  }, []);

  return { claims };
};

export default useAuth;
