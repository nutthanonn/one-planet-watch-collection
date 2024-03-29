import React from 'react';
import styled from 'styled-components';
import useWatchById from '@hooks/useWatchById';
import ModelTrend from '@components/IndividualCollection/ModelTrend';
import BetaBanner from '@components/IndividualCollection/BetaBanner';
import IndividualCollectionHeader from '@components/IndividualCollection/Header';
import FavoriteCollection from '@components/IndividualCollection/FavoriteCollection';
import ModelDescription from '@components/IndividualCollection/ModelDescription';
import { MyProfileStore } from '@store/MyProfileStore';

const IndividualCollection: React.FC = () => {
  const { watch } = useWatchById();

  return (
    <div>
      <IndividualCollectionHeader {...watch} />
      <SpaceInline>
        <ModelTrend favorite={watch?.favorite} />
        <FavoriteCollection my_store={MyProfileStore} watch_id={watch?.id} />
      </SpaceInline>
      <ModelDescription
        sub_description={watch?.sub_descriptions}
        sub_image={watch?.sub_images}
        brand={watch?.brand}
      />
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
