import React from 'react';
import styled from 'styled-components';

import useUserRequest from '@hooks/useUserRequest';
import MailTable from '@components/mail/MailTable';
import { Divider } from 'antd';
import useAdminPage from '@hooks/useAdminPage';

const AdminMail: React.FC = () => {
  const { request } = useUserRequest();
  useAdminPage();

  return (
    <Box>
      <Heading>Admin Mail</Heading>
      <Divider />
      <MailTable data={request} />
    </Box>
  );
};

export default AdminMail;

const Box = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 80vh;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;
