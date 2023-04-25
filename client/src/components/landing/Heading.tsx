import { ScreenSize } from '@common/ScreenSize';
import { H1, H5 } from '@common/Typography';
import React from 'react';
import styled from 'styled-components';

const Heading: React.FC = () => {
  return (
    <BoxSticky className='landing__target'>
      <Center className='landing__watch'>
        <H1_Custom>
          Watch
          <br />
          Collection
        </H1_Custom>
        <H5_Custom>
          power by
          <span>
            &nbsp;
            <ZeroMake className='landing__heading' />
            nePlanet
          </span>
        </H5_Custom>
      </Center>
    </BoxSticky>
  );
};

export default Heading;

const BoxSticky = styled.section`
  position: relative;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
`;

const H1_Custom = styled(H1)`
  font-size: 8rem;
  text-align: center;
  color: #1d1d1d;

  @media only screen and (max-width: ${ScreenSize.tablet}) {
    font-size: 3rem;
  }

  @media only screen and (max-width: ${ScreenSize.mobile}) {
    font-size: 2rem;
  }
`;

const H5_Custom = styled(H5)`
  font-size: 1.5rem;
  font-weight: lighter;
  > span {
    color: ${(props) => props.theme.colors.primary};
    font-weight: bold;
  }
`;

const ZeroMake = styled.span`
  display: inline-flex;
  width: 20px;
  height: 20px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 4px solid ${(props) => props.theme.colors.primary};
    border-radius: 100px;
  }
`;
