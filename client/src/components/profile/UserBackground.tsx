import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonBackground from '@assets/images/skeleton-background.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface UserBackgroundProps {
  backgroundSrc: string;
  userImgSrc: string;
}

const UserBackground: React.FC = () => {
  return (
    <Box>
      <Img
        src='https://source.unsplash.com/random/900x700/?fruit'
        alt='user profile background'
        placeholderSrc={SkeletonBackground}
        draggable={false}
      />
      <UserImg
        src='https://source.unsplash.com/random/900x700/?Animal'
        alt='user profile'
        placeholderSrc={SkeletonBackground}
        draggable={false}
      />
    </Box>
  );
};

export default UserBackground;

const Box = styled.div`
  position: relative;
`;

const UserImg = styled(LazyLoadImage)`
  position: absolute;
  left: 2rem;
  bottom: -3rem;
  width: 13rem;
  height: 13rem;
  border: 7px solid #fefefe;
  border-radius: 15px;
  object-fit: cover;
`;

const Img = styled(LazyLoadImage)`
  width: 100vw;
  height: 320px;
  object-fit: cover;
`;
