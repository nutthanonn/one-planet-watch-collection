import GetWatchesAPI, { WatchData } from '@api/GetWatches';
import { useState, useEffect } from 'react';

const useWatches = () => {
  const [watch, setWatch] = useState<WatchData[]>([]);

  useEffect(() => {
    async function fetchWatches() {
      const res = await GetWatchesAPI();
      setWatch(res.data);
    }

    fetchWatches();
  }, []);

  return { watch };
};

export default useWatches;
