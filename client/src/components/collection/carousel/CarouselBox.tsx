import React, { useState } from 'react';
import styled from 'styled-components';

import CarouselSlider from './CarouselSlider';
import CarouselBackground from './CarouselBackground';
import { H1 } from '@common/Typography';

const CarouselBox: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleChangeSlide = (i: number) => {
    setCurrentSlide(i);
  };

  return (
    <Box>
      <H1>Collection</H1>
      <CarouselSlider handleChangeSlide={handleChangeSlide} />
      <CarouselBackground currentSlide={currentSlide} />
    </Box>
  );
};

export default CarouselBox;

const Box = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;
