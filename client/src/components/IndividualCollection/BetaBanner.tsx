import { H5 } from '@common/Typography';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const BetaBanner: React.FC = () => {
  return (
    <Banner>
      <FlexBox>
        <Heading>
          We&apos;re still in the process of refining our website. If you notice anything that seems
          off or have suggestions for new content, please click here to share your feedback.
        </Heading>
      </FlexBox>
      <FlexBox>
        <Heading>
          We&apos;re still in the process of refining our website. If you notice anything that seems
          off or have suggestions for new content, please click here to share your feedback.
        </Heading>
      </FlexBox>
    </Banner>
  );
};

export default BetaBanner;

const slide = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
`;

const Banner = styled.div`
  background: black;
  display: flex;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
`;

const Heading = styled(H5)`
  color: white;
  font-weight: 400;
  font-size: 0.8rem;
`;

const FlexBox = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 5rem;
  gap: 5rem;
  animation: ${slide} 20s linear infinite;
  flex-shrink: 0;
`;
