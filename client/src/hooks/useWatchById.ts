import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GetWatchByIdAPI, { WatchI } from '@api/GetWatchById';

const useWatchById = () => {
  const { brand } = useParams();
  const [watch, setWatch] = useState<WatchI>();

  useEffect(() => {
    async function getWatch(id: string) {
      const response = await GetWatchByIdAPI(id);
      setWatch(response.data);
    }
    getWatch(brand as string);
  }, []);

  return { watch };
};

export default useWatchById;
