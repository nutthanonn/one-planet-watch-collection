import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ScreenSize } from '@common/ScreenSize';
import type { Post, UserProfileI } from '@interfaces/UserProfile';
import ModalPost from './ModalPost';

interface UserCollectionProps extends UserProfileI {
  posts: Post[];
  isMe: boolean;
}

const UserCollection: React.FC<UserCollectionProps> = (props) => {
  const { posts } = props;
  const [collections, setCollection] = useState<Post[][]>([[], [], []]);

  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach((post, index) => {
        const collectionIndex = index % 3;
        setCollection((prev) => {
          const newCollection = [...prev];
          newCollection[collectionIndex].push(post);
          return newCollection;
        });
      });
    }
  }, []);

  return (
    <Container>
      <Row>
        {collections.map((collection, index) => (
          <Col key={index}>
            {collection.map((post) => (
              <ModalPost
                post_id={post.id}
                description={post.description}
                image={post.images}
                key={post.id}
                username={props.username}
                avatar={props.avatar}
                create_at={post?.created_at}
                isMe={props.isMe}
              />
            ))}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserCollection;

const Container = styled.div`
  padding: 1rem 3rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
`;

const Col = styled.div`
  @media only screen and (max-width: ${ScreenSize.mobile}) {
    flex: 100%;
  }
  flex: 33%;
  padding: 0 4px;
  > span {
    margin-top: 8px;
  }
`;
