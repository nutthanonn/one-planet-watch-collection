import React from 'react';
import styled from 'styled-components';
import UserPost from './userCollectionModal/UserPost';
import type { Post, UserProfileI } from '@interfaces/UserProfile';
import { ScreenSize } from '@common/ScreenSize';

interface UserCollectionProps extends UserProfileI {
  posts: Post[];

  username: string;
  avatar?: string;
  isMe: boolean;
}

const UserCollection: React.FC<UserCollectionProps> = (props) => {
  const { posts, username, avatar, id } = props;

  return (
    <Container>
      <Grid>
        {posts.map((post, index) => {
          return (
            <UserPost
              post={post}
              key={index}
              username={username}
              avatar={avatar}
              location={post.location}
              user_id={id}
              isMe={props.isMe}
            />
          );
        })}
      </Grid>
    </Container>
  );
};

export default UserCollection;

const Container = styled.div`
  padding: 1rem 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  padding: 0 6rem;

  @media only screen and (max-width: ${ScreenSize.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
  }

  @media only screen and (max-width: ${ScreenSize.mobile}) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0;
  }
`;
