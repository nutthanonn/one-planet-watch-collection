import React from 'react';
import styled from 'styled-components';
import Skeleton from '@assets/images/skeleton-background.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { H4 } from '@common/Typography';

interface ModelDescription {
  brand?: string;
  sub_image?: string[];
  sub_description?: string[];
}

const ModelDescription: React.FC<ModelDescription> = (props) => {
  return (
    <div>
      {props.sub_image ? (
        <Center>
          <Box>
            <LazyLoadImage
              src={props.sub_image[0] ?? ''}
              alt='image'
              placeholderSrc={Skeleton}
              effect='blur'
              width={props.brand == 'RICHARD MILLE' ? 300 : 600}
            />
            <Heading>{props.sub_description}</Heading>
          </Box>
        </Center>
      ) : (
        ''
      )}
    </div>
  );
};

export default ModelDescription;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0;
`;

const Box = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
  background-color: rgba(71, 96, 114, 0.05);
`;

const Heading = styled(H4)`
  font-weight: 500;
  width: 70vw;
  text-align: center;
  line-height: 2rem;
`;
