import { H6 } from '@common/Typography';
import styled from 'styled-components';
import React from 'react';

interface PopoverContentProps {
  pass: string;
}

const PopoverContent: React.FC<PopoverContentProps> = (props) => {
  return (
    <Container>
      <Heading_Custom pass={props.pass.length >= 8}>At least 8 characters</Heading_Custom>
      <Heading_Custom pass={/[a-z]/.test(props.pass)}>At least one lowercase letter</Heading_Custom>
      <Heading_Custom pass={/[A-Z]/.test(props.pass)}>At least one uppercase letter</Heading_Custom>
      <Heading_Custom pass={/[0-9]/.test(props.pass)}>At least one number</Heading_Custom>
      <Heading_Custom pass={/[#?!@$%^&*-_]/.test(props.pass)}>
        At least one special character
      </Heading_Custom>
    </Container>
  );
};

export default PopoverContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Heading_Custom = styled(H6)`
  font-weight: 300;
  color: ${(props: { pass?: boolean }) => (props.pass ? 'green' : 'red')};
`;
