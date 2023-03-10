import React from 'react';
import styled from 'styled-components';

const Container: React.FC<{ children: React.ReactNode }> = (props) => {
  return <ContainerDiv>{props.children}</ContainerDiv>;
};

export default Container;

const ContainerDiv = styled.div`
  padding: 2rem 3rem;
`;
