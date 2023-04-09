import GetRoleAPI from '@api/GetRole';
import { useEffect } from 'react';

const useAdmin = () => {
  useEffect(() => {
    async function admin() {
      await GetRoleAPI();
    }
    admin();
  }, []);
};

export default useAdmin;
