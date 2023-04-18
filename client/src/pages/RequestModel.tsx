import React from 'react';
import styled from 'styled-components';

import RequestHeading from '@components/request/RequestHeading';
import RequestForm from '@components/request/RequestForm';
const RequestModel: React.FC = () => {
  return (
    <Box>
      <RequestHeading />
      <RequestForm />
    </Box>
  );
};

export default RequestModel;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  min-height: 80vh;
`;
