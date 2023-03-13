import React from 'react';
import styled from 'styled-components';
import UserBackground from '@components/profile/UserBackground';
import UserHeading from '@components/profile/UserHeading';
import UserCollection from '@components/profile/UserCollection';
import { useParams } from 'react-router-dom';
import useUserProfile from '@hooks/useUserProfile';

const UserProfile: React.FC = () => {
  const { username } = useParams();
  const { profile } = useUserProfile(username as string);

  return (
    <Box>
      <UserBackground avatar={profile?.avatar} backgroundProfile={profile?.background_profile} />
      <UserHeading {...profile} />
      <UserCollection />
    </Box>
  );
};

export default UserProfile;

const Box = styled.div`
  min-height: 100vh;
`;
