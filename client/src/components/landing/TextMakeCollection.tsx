import { ScreenSize } from '@common/ScreenSize';
import { H1 } from '@common/Typography';
import React from 'react';
import styled from 'styled-components';

const TextMakeCollection: React.FC = () => {
  return (
    <Center>
      <Heading_animate className='text__collection'>
        Make your collection
        <br />
        with us
      </Heading_animate>
    </Center>
  );
};

export default TextMakeCollection;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10rem 0;
`;

const Heading_animate = styled(H1)`
  font-size: 5.5rem;
  color: black;
  text-align: center;
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    font-size: 3rem;
  }

  @media only screen and (max-width: ${ScreenSize.mobile}) {
    font-size: 2rem;
  }
`;
