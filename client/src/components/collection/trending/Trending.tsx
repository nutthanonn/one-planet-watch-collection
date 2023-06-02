import React from 'react';
import styled from 'styled-components';
import TrendingTable from './TrendingTable';
import useTrending from '@hooks/useTrending';
import SkeletonTable from './TrendingSkeleton';

const Trending: React.FC = () => {
  const { trending } = useTrending();

  return (
    <Grid>
      {trending ? (
        <TrendingTable start_number={1} data={trending.data.slice(0, 5)} />
      ) : (
        <SkeletonTable />
      )}
      {trending ? (
        <TrendingTable start_number={6} data={trending.data.slice(5, 10)} />
      ) : (
        <SkeletonTable />
      )}
    </Grid>
  );
};

export default Trending;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
`;
