import React from 'react';
import styled from 'styled-components';
import BetaBanner from '@components/IndividualCollection/BetaBanner';
import FavoriteCollection from '@components/IndividualCollection/FavoriteCollection';
import IndividualCollectionHeader from '@components/IndividualCollection/Header';
import ModelTrend from '@components/IndividualCollection/ModelTrend';

const IndividualCollection: React.FC = () => {
  return (
    <div>
      <IndividualCollectionHeader />
      <SpaceInline>
        <ModelTrend />
        <FavoriteCollection />
      </SpaceInline>
      <BetaBanner />
    </div>
  );
};

export default IndividualCollection;

const SpaceInline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 5rem;
`;
