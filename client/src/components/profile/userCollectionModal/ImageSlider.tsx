import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import '@styles/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styled from 'styled-components';
import { Post } from '@interfaces/UserProfile';
import { ScreenSize } from '@common/ScreenSize';

interface ImageSliderProps {
  post: Post;
}

const ImageSlider: React.FC<ImageSliderProps> = (props) => {
  const { post } = props;

  return (
    <SwiperCustom
      modules={[Navigation, Pagination]}
      pagination={{ clickable: true }}
      navigation={{
        enabled: true,
      }}
      slidesPerView={1}
      onSlideChange={(swiper) => {
        console.log(swiper.activeIndex);
      }}
    >
      {post.images.map((item, index) => {
        return (
          <SwiperSlideCustom key={index}>
            <Img src={item} />
          </SwiperSlideCustom>
        );
      })}
    </SwiperCustom>
  );
};

export default ImageSlider;

const SwiperCustom = styled(Swiper)``;

const SwiperSlideCustom = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  padding-top: 4rem;
  position: relative;

  @media (max-width: ${ScreenSize.tablet}) {
    padding-top: 0;
    height: 10rem;
  }
`;

const Img = styled.div`
  width: 80%;
  height: 80%;
  background: url(${(props: { src: string }) => props.src}) no-repeat;
  background-size: contain;
  background-position: center;
  z-index: 2;

  @media (max-width: ${ScreenSize.tablet}) {
    width: 100%;
    height: 100%;
  }
`;
