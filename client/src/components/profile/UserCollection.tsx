import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonBackground from '@assets/images/skeleton-background.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

const UserCollection: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Img
            src='https://source.unsplash.com/random/900x1000/?Computer'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
          />
          <Img
            src='https://source.unsplash.com/random/900x700/?Engineer'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
          />
        </Col>
        <Col>
          <Img
            src='https://source.unsplash.com/random/900x700/?Animal'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
          />
          <Img
            src='https://source.unsplash.com/random/900x700/?Chemistry'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
          />
        </Col>
        <Col>
          <Img
            src='https://source.unsplash.com/random/900x1000/?Planet'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
          />
          <Img
            src='https://source.unsplash.com/random/900x700/?Zoo'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserCollection;

const Container = styled.div`
  padding: 1rem 3rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
`;

const Col = styled.div`
  flex: 33%;
  padding: 0 4px;
`;

const Img = styled(LazyLoadImage)`
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
  object-fit: cover;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  transition: all 0.25s ease-in-out;
`;
