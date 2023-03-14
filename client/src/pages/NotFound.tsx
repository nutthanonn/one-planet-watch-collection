import React from 'react';
import { H4 } from '@common/Typography';
import styled from 'styled-components';

const NotFound: React.FC = () => {
  return (
    <Center>
      <H4>Sorry, this page isn&apos;t available.</H4>
      <p>
        The link you followed may be broken, or the page may have been removed. &nbsp;
        <GoBack href='/'>Go back to OnePlanet.</GoBack>
      </p>
    </Center>
  );
};

export default NotFound;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
  gap: 1rem;
`;

const GoBack = styled.a`
  color: #0095f6;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
