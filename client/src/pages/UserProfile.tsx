import React from 'react';
import styled from 'styled-components';
import UserBackground from '@components/profile/UserBackground';
import UserHeading from '@components/profile/UserHeading';
import UserCollection from '@components/profile/UserCollection';
import { useParams } from 'react-router-dom';
import useUserProfile from '@hooks/useUserProfile';
import NotFound from './NotFound';
import useVerifyToken from '@hooks/useVerifyToken';

const UserProfile: React.FC = () => {
  const { username } = useParams();
  const { profile } = useUserProfile(username as string);
  const { claims } = useVerifyToken();

  return (
    <Box>
      {profile?.username ? (
        <>
          <UserBackground avatar={profile.avatar} background_profile={profile.background_profile} />
          <UserHeading {...profile} isMe={claims?.name === profile?.username} />
          <UserCollection posts={profile.posts} />
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
