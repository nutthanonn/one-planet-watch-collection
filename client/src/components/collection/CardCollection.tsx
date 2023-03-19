import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from '@assets/images/skeleton-background.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

const { Meta } = Card;

interface CardCollectionProps {
  img: string;
  name: string;
  description: string;
}

const CardCollection: React.FC<CardCollectionProps> = (props) => {
  return (
    <CardCustom
      hoverable
      style={{ minWidth: 250 }}
      cover={
        <Img
          alt='example'
          src={props.img}
          width={150}
          height={200}
          draggable={false}
          effect='blur'
          placeholderSrc={Skeleton}
        />
      }
    >
      <Meta
        title={props.name}
        description={props.description}
        style={{ marginTop: 'auto', height: '50px' }}
      />
    </CardCustom>
  );
};

export default CardCollection;

const CardCustom = styled(Card)`
  > .ant-card-cover {
    margin: auto;
    display: flex;
    justify-content: center;
  }
`;

const Img = styled(LazyLoadImage)`
  object-fit: cover;
  display: flex;
`;
