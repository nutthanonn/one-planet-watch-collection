import GetWatchByBrandAPI from '@api/GetWatchByBrand';
import { useEffect, useState } from 'react';

interface WatchModel {
  model: string;
  watches: Watch[];
}

interface Watch {
  id: string;
  brand: string;
  model: string;
  name: string;
  description: string;
  image: string;
  sub_images: string[];
  sub_descriptions: string[];
  favorite: number;
}

const useBrandWatch = (query: string) => {
  const [watchModel, setWatchModel] = useState<WatchModel[]>([]);

  useEffect(() => {
    async function fetch(query: string) {
      const res = await GetWatchByBrandAPI(query);
      setWatchModel(res.data);
    }

    fetch(query);
  }, []);

  return { watchModel };
};

export default useBrandWatch;
