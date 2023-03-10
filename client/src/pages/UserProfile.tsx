import React from 'react';
import styled from 'styled-components';
import UserBackground from '@components/profile/UserBackground';
import UserHeading from '@components/profile/UserHeading';
import UserCollection from '@components/profile/UserCollection';

const UserProfile: React.FC = () => {
  return (
    <Box>
      <UserBackground />
      <UserHeading />
      <UserCollection />
    </Box>
  );
};

export default UserProfile;

const Box = styled.div`
  min-height: 100vh;
`;
