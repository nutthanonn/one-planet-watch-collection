import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';

import 'swiper/css';
import '@styles/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Collection } from '@interfaces/WatchApi';
import { H4 } from '@common/Typography';
import { Empty } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { ScreenSize } from '@common/ScreenSize';

interface ImgSwiperProps {
  collection: Collection[];
  handleDeleteCollection: (id: string) => void;
}

const ImgSwiper: React.FC<ImgSwiperProps> = (props) => {
  const { collection } = props;

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
      {collection.length === 0 && (
        <SwiperSlideCenter>
          <Empty />
        </SwiperSlideCenter>
      )}

      {collection.map((item, index) => {
        return (
          <SwiperSlideCustom key={index}>
            <Img src={item.image} />
            <DeleteIcon onClick={() => props.handleDeleteCollection(item.id)} />
            <Title>{item.name}</Title>
          </SwiperSlideCustom>
        );
      })}
    </SwiperCustom>
  );
};

export default ImgSwiper;

const SwiperCustom = styled(Swiper)``;

const SwiperSlideCenter = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SwiperSlideCustom = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  padding-top: 4rem;
  position: relative;
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

const Title = styled(H4)`
  font-weight: 400;
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: black;
  z-index: 3;
`;

const DeleteIcon = styled(DeleteFilled)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 3;
  cursor: pointer;

  &:hover {
    color: #f57c7c;
  }
  font-size: 1.5rem;
  color: black;

  transition: all 0.25s ease-in-out;
`;
