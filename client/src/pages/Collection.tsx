import React from 'react';
import styled from 'styled-components';
import WatchCollection from '@components/collection/WatchCollection';
import useWatches from '@hooks/useWatches';
import { Empty } from 'antd';
import Tab from '@components/collection/trending/Tab';
import CarouselBox from '@components/collection/carousel/CarouselBox';

const Collection: React.FC = () => {
  const { watch } = useWatches();

  return (
    <Box>
      {watch ? (
        <div>
          <CarouselBox />
          <Tab />
          <WatchCollection watch={watch} />
        </div>
      ) : (
        <Center>
          <Empty />
        </Center>
      )}
    </Box>
  );
};

export default Collection;

const Box = styled.div`
  min-height: 80vh;
  overflow: hidden;
`;

const Center = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
