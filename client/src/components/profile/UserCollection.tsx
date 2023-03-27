import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonBackground from '@assets/images/skeleton-background.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ScreenSize } from '@common/ScreenSize';
import type { Post } from '@interfaces/UserProfile';

interface UserCollectionProps {
  posts: Post[];
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
              <Img
                key={post.id}
                src={post.images[0]}
                alt={post.description}
                placeholderSrc={SkeletonBackground}
                draggable={false}
                width='100%'
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
`;

const Img = styled(LazyLoadImage)`
  margin-top: 8px;
  vertical-align: middle;
  object-fit: cover;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  transition: all 0.25s ease-in-out;
`;
