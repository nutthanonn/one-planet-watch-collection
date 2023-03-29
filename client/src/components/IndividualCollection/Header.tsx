import React from 'react';
import styled from 'styled-components';
import SkeletonBackground from '@assets/images/skeleton-background.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { H3 } from '@common/Typography';
import useWatchById from '@hooks/useWatchById';
import { Spin } from 'antd';
import { ScreenSize } from '@common/ScreenSize';

// const WATCH = {
//   image:
//     'https://content.rolex.com/dam/2022-11/upright-cc/m226658-0001.png?impolicy=main-configurator&amp;imwidth=900',
//   name: 'Yacht-Master 42',
//   description: 'Oyster, 42 mm, yellow gold',
// };

const IndividualCollectionHeader: React.FC = () => {
  const { watch } = useWatchById();

  return (
    <div>
      {watch ? (
        <Center>
          <Img
            src={watch.image}
            alt={watch.id}
            placeholderSrc={SkeletonBackground}
            draggable={false}
            width={350}
          />
          <Box>
            <Heading>{watch.name}</Heading>
            <Paragraph>{watch.description}</Paragraph>
          </Box>
        </Center>
      ) : (
        <Loading style={{ height: '100vh' }}>
          <Spin tip='Loading' size='large'>
            <div className='content' />
          </Spin>
        </Loading>
      )}
    </div>
  );
};

export default IndividualCollectionHeader;

const Center = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  background: linear-gradient(13deg, rgba(27, 19, 19, 0.75) 0%, rgba(255, 255, 255, 1) 100%),
    url('https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1933&q=80');
  background-size: cover;
  min-height: 70vh;
  align-items: center;

  /* background: linear-gradient(167deg, rgba(255,255,255,1) 0%, rgba(27,19,19,1) 100%); */

  object-fit: cover;
  background-position: center;
`;

const Img = styled(LazyLoadImage)`
  object-fit: cover;
`;

const Box = styled.div`
  position: absolute;
  bottom: 8rem;
  left: 5rem;
`;

const Heading = styled(H3)`
  color: white;
  font-weight: 600;
  font-size: 2rem;
`;

const Paragraph = styled.p`
  font-weight: 100;
  color: white;
  font-size: 1.5rem;
  width: 30vw;

  @media only screen and (max-width: ${ScreenSize.tablet}) {
    width: 70vw;
  }
`;

const Loading = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .content {
    padding: 50px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
`;
