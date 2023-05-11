import GetRoleAPI from '@api/GetRole';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function admin() {
      const res = await GetRoleAPI();
      if (res.role !== 'admin') {
        navigate('/');
      }
    }

    admin();
  }, []);
};

export default useAdminPage;
