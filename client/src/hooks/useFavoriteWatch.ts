import GetFavoriteWatchAPI from '@api/GetFavoritewatch';
import { Collection } from '@interfaces/WatchApi';
import { useEffect, useState } from 'react';

const useFavoriteWatch = (favorite_data: string[]) => {
  const [watchData, setWatchData] = useState<Collection[]>([]);

  useEffect(() => {
    async function fetch(favorite_data: string[]) {
      const res = await GetFavoriteWatchAPI(favorite_data);
      setWatchData(res.favorite_list);
    }

    fetch(favorite_data);
  }, []);

  return { watchData };
};

export default useFavoriteWatch;
