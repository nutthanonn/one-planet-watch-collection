import React, { useEffect } from 'react';
import styled from 'styled-components';
import Backdrop from '../createPost/Backdrop';
import ModalHeader from '../createPost/ModalHeader';
import { Post } from '@interfaces/UserProfile';
import ImageSlider from './ImageSlider';
import UserPostDescription from './UserPostDescription';

interface UserPostBodyProps {
  handleCloseModal: () => void;
  post: Post;
  username: string;
  user_id: string;
  avatar?: string;
  location?: string;
}

const UserPostBody: React.FC<UserPostBodyProps> = (props) => {
  const { handleCloseModal, username, avatar, user_id, post } = props;

  return (
    <Backdrop handleCloseModal={handleCloseModal}>
      <Box>
        <ModalHeader handleCloseModal={handleCloseModal} title='Post' />
        <GridModal>
          <ImageSlider post={post} />
          <UserPostDescription
            username={username}
            avatar={avatar}
            create_date={post.created_at}
            post={post}
            location={props.location}
            user_id={user_id}
          />
        </GridModal>
      </Box>
    </Backdrop>
  );
};

export default UserPostBody;

const Box = styled.div`
  position: absolute;
  width: 70rem;
  height: 35rem;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -55%);
  border-radius: 0.5rem;
  overflow: hidden;

  background-color: white;
`;

const GridModal = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  height: 100%;
`;
