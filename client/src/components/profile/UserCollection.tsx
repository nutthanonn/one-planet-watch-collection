import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonBackground from '@assets/images/skeleton-background.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ScreenSize } from '@common/ScreenSize';
import { H3 } from '@common/Typography';
import { DisconnectOutlined } from '@ant-design/icons';

const UserCollection: React.FC = () => {
  return (
    <Container>
      <NoContent>
        <DisconnectOutlined style={{ color: 'rgba(0,0,0,0.25)', fontSize: '2rem' }} />
        <Heading>This user havn&apos;t collection</Heading>
      </NoContent>
      {/* <Row>
        <Col>
          <Img
            src='https://source.unsplash.com/random/900x1000/?Computer'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
            draggable={false}
          />
          <Img
            src='https://source.unsplash.com/random/900x700/?Engineer'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
            draggable={false}
          />
        </Col>
        <Col>
          <Img
            src='https://source.unsplash.com/random/900x700/?Animal'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
            draggable={false}
          />
          <Img
            src='https://source.unsplash.com/random/900x700/?Chemistry'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
            draggable={false}
          />
        </Col>
        <Col>
          <Img
            src='https://source.unsplash.com/random/900x1000/?Planet'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
            draggable={false}
          />
          <Img
            src='https://source.unsplash.com/random/900x700/?Zoo'
            alt='user collection'
            placeholderSrc={SkeletonBackground}
            draggable={false}
          />
        </Col>
      </Row> */}
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
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    flex: 50%;
  }

  @media only screen and (max-width: ${ScreenSize.mobile}) {
    flex: 100%;
  }
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

const NoContent = styled.div`
  display: flex;
  justify-content: center;
  height: 20vh;
  gap: 1rem;
`;

const Heading = styled(H3)`
  font-size: 2rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.25);
`;
