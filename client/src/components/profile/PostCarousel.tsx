import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonBackground from '@assets/images/skeleton-background.png';

interface IPostCarouselProps {
  image?: string[];
}

const PostCarousel: React.FC<IPostCarouselProps> = (props) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange}>
      {props.image?.map((item, index) => (
        <Center key={index}>
          <Img src={item} key={index} placeholderSrc={SkeletonBackground} draggable={false} />
        </Center>
      ))}
    </Carousel>
  );
};

export default PostCarousel;

const Center = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  margin-top: 20px;
  border-radius: 10px;
  > span {
    width: 100%;
  }
`;

const Img = styled(LazyLoadImage)`
  width: 200px;
  margin: auto;
`;
