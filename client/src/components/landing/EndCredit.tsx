import { H3, H6 } from '@common/Typography';
import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ScreenSize } from '@common/ScreenSize';

const EndCredit: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Center>
      <Heading>The place for anyone from anywhere to build anything</Heading>
      <Paragraph>Let&apos;s build your collection from here</Paragraph>
      <Button
        block
        style={{ width: '50vw', color: 'white', background: 'black' }}
        onClick={() => navigate('/sign-up')}
      >
        Sign up for OnePlanet
      </Button>
    </Center>
  );
};

export default EndCredit;

const Center = styled.div`
  padding: 10rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  flex-direction: column;
`;

const Heading = styled(H3)`
  font-size: 2.5rem;
  text-align: center;
  padding: 1rem 0;
  @media only screen and (max-width: ${ScreenSize.mobile}) {
    font-size: 2rem;
  }
`;

const Paragraph = styled(H6)`
  font-weight: lighter;
  padding-bottom: 5rem;
`;
