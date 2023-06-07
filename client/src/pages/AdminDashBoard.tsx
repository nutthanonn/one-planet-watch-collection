import React from 'react';
import styled from 'styled-components';
import { H1 } from '@common/Typography';
import { Divider } from 'antd';
import useAdminPage from '@hooks/useAdminPage';
import AdminHeading from '@components/admin/AdminHeading';

const AdminDashBoard: React.FC = () => {
  useAdminPage();

  return (
    <Box>
      <Heading>Dashboard</Heading>
      <Divider />
      <AdminHeading />
    </Box>
  );
};

export default AdminDashBoard;

const Box = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Heading = styled(H1)`
  font-size: 3.5rem;
  font-weight: 700;
`;
