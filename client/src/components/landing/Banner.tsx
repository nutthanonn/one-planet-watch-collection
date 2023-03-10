import React from 'react';
import styled, { keyframes } from 'styled-components';
import { brandImg } from '@mocks/brand_img';
import { ScreenSize } from '@common/ScreenSize';

const Banner: React.FC = () => {
  return (
    <BannerBox>
      <FlexBox>
        {brandImg.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.img} alt={item.name} width={150} />
            </div>
          );
        })}
      </FlexBox>
      <FlexBox className='flex-2'>
        {brandImg.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.img} alt={item.name} width={150} />
            </div>
          );
        })}
      </FlexBox>
    </BannerBox>
  );
};

export default Banner;

const slide = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
`;

const BannerBox = styled.section`
  margin: 10rem 0 0 0;
  width: 100%;
  height: 10rem;
  background-color: black;
  display: flex;
  align-items: center;

  > .flex-2 {
    @media only screen and (max-width: ${ScreenSize.tablet}) {
      display: none;
    }
  }
`;

const FlexBox = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 5rem;
  gap: 10rem;
  animation: ${slide} 10s linear infinite;
  flex-shrink: 0;

  @media only screen and (max-width: ${ScreenSize.tablet}) {
    animation-direction: alternate-reverse;
  }
`;
