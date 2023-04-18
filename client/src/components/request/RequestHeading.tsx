import React from 'react';
import styled from 'styled-components';

const RequestHeading: React.FC = () => {
  return (
    <>
      <Text>
        <Heading>Request</Heading>
        <SubHeading>Help, us to make new model by send this form</SubHeading>
      </Text>
    </>
  );
};

export default RequestHeading;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
`;

const SubHeading = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
`;
