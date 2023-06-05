import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserBackground from '@components/profile/UserBackground';
import UserHeading from '@components/profile/UserHeading';
import UserCollection from '@components/profile/UserCollection';
import { useParams } from 'react-router-dom';
import useUserProfile from '@hooks/useUserProfile';
import NotFound from './NotFound';
import useVerifyToken from '@hooks/useVerifyToken';
import SkeletonProfile from '@components/profile/SkeletonProfile';

const UserProfile: React.FC = () => {
  const { username } = useParams();
  const { profile } = useUserProfile(username as string);
  const { claims } = useVerifyToken();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.username) {
      setLoading(false);
    }
  }, [profile?.username]);

  return (
    <Box>
      {loading ? (
        <SkeletonProfile />
      ) : profile?.username ? (
        <>
          <UserBackground avatar={profile.avatar} background_profile={profile.background_profile} />
          <UserHeading
            {...profile}
            isMe={claims?.name === profile?.username}
            post={profile.posts.length}
          />
          <UserCollection {...profile} isMe={claims?.name === profile?.username} />
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

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #555;
`;
