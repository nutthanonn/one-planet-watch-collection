import React from 'react';
import styled from 'styled-components';

import useAdmin from '@hooks/useAdmin';
import useUserRequest from '@hooks/useUserRequest';
import MailTable from '@components/mail/MailTable';

const AdminMail: React.FC = () => {
  useAdmin();
  const { request } = useUserRequest();

  return (
    <Box>
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
