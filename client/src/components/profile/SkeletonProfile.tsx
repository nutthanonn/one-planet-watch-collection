import React from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';

const SkeletonProfile: React.FC = () => {
  return (
    <Box>
      <BackgroundImg>
        <UserImg active={true} />
      </BackgroundImg>
    </Box>
  );
};

export default SkeletonProfile;

const Box = styled.div`
  position: relative;
`;

const BackgroundImg = styled.div`
  width: 100vw;
  height: 320px;
  background-color: #f5f5f5;
`;

const UserImg = styled(Skeleton.Image)`
  position: absolute;
  left: 1rem;
  bottom: -1rem;
  border-radius: 15px;
  object-fit: cover;

  .ant-skeleton-image {
    width: 12rem !important;
    height: 12rem !important;
  }
`;
