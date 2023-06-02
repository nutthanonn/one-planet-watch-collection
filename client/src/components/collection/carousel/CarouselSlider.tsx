import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';

import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import '@styles/swiper.css';
import 'swiper/css/navigation';

import CarouselNavigationButton from './CarouselNavigationButton';
import { H5 } from '@common/Typography';
import { WATCH_CAROUSEL_MOCK } from '@common/WatchCarouselMock';

interface CarouselSliderProps {
  handleChangeSlide: (i: number) => void;
}

const CarouselSlider: React.FC<CarouselSliderProps> = (props) => {
  return (
    <>
      <SwiperCustom
        modules={[Autoplay, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          enabled: true,
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => {
          props.handleChangeSlide(swiper.realIndex);
        }}
      >
        {WATCH_CAROUSEL_MOCK.map((item, indexOut) => (
          <SwiperSlide key={indexOut}>
            {item.image.map((url, index) => (
              <Box key={index}>
                <BoxInside>
                  <Img src={url} alt='Carousel image' />
                </BoxInside>
                <Content>
                  <H5>{item.brand}</H5>
                </Content>
              </Box>
            ))}
          </SwiperSlide>
        ))}
        <CarouselNavigationButton />
      </SwiperCustom>
    </>
  );
};

export default CarouselSlider;

const SwiperCustom = styled(Swiper)`
  height: 20.75rem;
  z-index: 2;

  &:hover {
    .swiper-button-prev-custom,
    .swiper-button-next-custom {
      opacity: 1;
    }
  }
`;

const Box = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 16px;

  max-height: 100%;
  max-width: 100%;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    inset: 0px 0px -1px;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%);
  }

  &:hover img {
    transform: scale(1.1);
  }
  background-color: white;
`;

const BoxInside = styled.span`
  display: inline-block;
  overflow: hidden;
  width: initial;
  height: initial;
  background: none;
  opacity: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: auto;
`;

const Img = styled.img`
  transition: all 0.5s ease;
  object-fit: cover;
  background-position: center;
  height: 20.75rem;
  background-size: cover;
`;

const Content = styled.div`
  position: absolute;
  gap: 2px;
  bottom: 0px;
  padding-bottom: 12px;
  z-index: 1;
  padding-left: 16px;
  color: white;
`;
