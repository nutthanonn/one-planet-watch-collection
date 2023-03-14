import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserBackground from '@components/profile/UserBackground';
import UserHeading from '@components/profile/UserHeading';
import UserCollection from '@components/profile/UserCollection';
import { useParams } from 'react-router-dom';
import useUserProfile from '@hooks/useUserProfile';
import NotFound from './NotFound';

const UserProfile: React.FC = () => {
  const { username } = useParams();
  const { profile } = useUserProfile(username as string);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <Box>
      {profile?.username ? (
        <>
          <UserBackground avatar={profile.avatar} backgroundProfile={profile.background_profile} />
          <UserHeading {...profile} />
          <UserCollection />
        </>
      ) : (
        <NotFound />
      )}
    </Box>
  );
};

export default UserProfile;

const Box = styled.div`
  min-height: 80vh;
`;
