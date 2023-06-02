import { WATCH_CAROUSEL_MOCK } from '@common/WatchCarouselMock';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface CarouselBackgroundProps {
  currentSlide: number;
}

const CarouselBackground: React.FC<CarouselBackgroundProps> = (props) => {
  return <BackgroundBlur img={WATCH_CAROUSEL_MOCK[props.currentSlide].image[0]} />;
};

export default CarouselBackground;

const BackgroundBlur = styled.div`
  position: absolute;
  inset: 0px 0px -1px;
  background-image: ${(props: { img: string }) => `url(${props.img})`};
  background-size: cover;
  transition: background 0.3s linear 0s;
  height: 90vh;

  &:after {
    backdrop-filter: blur(60px);
    background: linear-gradient(0deg, rgb(255, 255, 255) 5%, rgba(0, 0, 0, 0) 60%)
      rgba(0, 0, 0, 0.5);
    pointer-events: none;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
