import React from 'react';
import styled from 'styled-components';
import WatchCollection from '@components/collection/WatchCollection';
import useWatches from '@hooks/useWatches';
import { Empty } from 'antd';

const Collection: React.FC = () => {
  const { watch } = useWatches();

  return (
    <Box>
      {watch ? (
        <WatchCollection watch={watch} />
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
`;

const Center = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
