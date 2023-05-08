import GetRoleAPI from '@api/GetRole';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function admin() {
      const res = await GetRoleAPI();

      if (res) {
        setIsAdmin(true);
      } else {
        navigate('/');
      }
    }

    admin();
  }, []);

  return { isAdmin };
};

export default useAdmin;
