import { Divider } from 'antd';
import styled from 'styled-components';
import useBrandWatch from '@hooks/useBrandWatch';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import BrandSidebar from '@components/brandCollection/BrandSidebar';
import SearchWatch from '@components/brandCollection/SearchWatch';
import BrandCardCollection from '@components/brandCollection/BrandCardCollection';

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

const BrandCollection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const brand = searchParams.get('q');
  const { watchModel } = useBrandWatch(brand as string);
  const [modelList, setModelList] = useState<string[]>([]);

  const [modelCtl, setModelCtl] = useState<Watch[]>([]);

  useEffect(() => {
    if (watchModel) {
      setModelList(['ALL', ...watchModel.map((model) => model.model)]);
      setModelCtl(watchModel.map((data) => data.watches).flat());
    }
  }, [watchModel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = watchModel
      .map((data) => data.watches)
      .flat()
      .filter((data) => data.name.toLowerCase().includes(e.target.value.toLowerCase()));

    setModelCtl(filtered);
  };

  const handleSelect = (e: string) => {
    if (e == 'ALL') {
      setModelCtl(watchModel.map((data) => data.watches).flat());
    } else {
      setModelCtl(
        watchModel
          .filter((data) => data.model == e)
          .map((data) => data.watches)
          .flat(),
      );
    }
  };

  return (
    <Container>
      <Box>
        <Heading>
          <SpanColor>{brand?.split('-').join(' ')}</SpanColor> Collection
        </Heading>
      </Box>
      <Divider style={{ margin: 0 }} />
      <Grid>
        <div>
          <SearchWatch onChange={handleChange} />
          <BrandSidebar modelList={modelList} onSelect={handleSelect} />
        </div>
        <div>
          <BrandCardCollection watches={modelCtl} />
        </div>
      </Grid>
    </Container>
  );
};

export default BrandCollection;

const Container = styled.div`
  min-height: 100vh;
`;

const Box = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;

const SpanColor = styled.span`
  color: ${(props) => props.theme.colors.primary};
  text-transform: capitalize;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 2rem;
  height: 80vh;
  overflow: hidden;
`;
