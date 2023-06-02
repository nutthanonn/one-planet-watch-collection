import GetTrendingAPI, { WatchTrending } from '@api/GetTrending';
import { useState, useEffect } from 'react';

const useTrending = () => {
  const [trending, setTrending] = useState<WatchTrending>();

  useEffect(() => {
    async function getTrending() {
      const res = await GetTrendingAPI();

      setTrending(res);
    }
    getTrending();
  }, []);

  return { trending };
};

export default useTrending;
