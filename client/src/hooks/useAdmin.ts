import GetRoleAPI from '@api/GetRole';
import { useEffect, useState } from 'react';

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    async function admin() {
      const res = await GetRoleAPI();

      if (res) {
        setIsAdmin(true);
      }
    }

    admin();
  }, []);

  return { isAdmin };
};

export default useAdmin;
