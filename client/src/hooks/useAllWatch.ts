import GetAllWatchAPI, { Model } from '@api/GetAllWatch';
import { useState, useEffect } from 'react';

const useAllWatch = () => {
  const [allWatch, setAllWatch] = useState<Model[]>([]);

  useEffect(() => {
    async function fetchWatch() {
      const res = await GetAllWatchAPI();
      setAllWatch(res.data);
    }

    fetchWatch();
  }, []);

  return { allWatch };
};

export default useAllWatch;
