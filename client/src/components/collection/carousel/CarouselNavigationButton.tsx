import React from 'react';
import styled from 'styled-components';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const CarouselNavigationButton: React.FC = () => {
  return (
    <>
      <NextBtn className='swiper-button-prev-custom'>
        <LeftOutlined />
      </NextBtn>
      <PrevBtn className='swiper-button-next-custom'>
        <RightOutlined />
      </PrevBtn>
    </>
  );
};

export default CarouselNavigationButton;

const SwiperButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;

  background-color: white;
  cursor: pointer;
  border-radius: 50%;

  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;

  transition: all 0.3s ease-in-out;
`;

const NextBtn = styled(SwiperButton)`
  left: 0;
`;

const PrevBtn = styled(SwiperButton)`
  right: 0;
`;
