import React, { useState } from 'react';
import styled from 'styled-components';
import UserPostBody from './UserPostBody';
import { Post } from '@interfaces/UserProfile';
import { SwitcherOutlined } from '@ant-design/icons';

interface UserPostProps {
  post: Post;
  username: string;
  avatar?: string;
  location?: string;
  user_id: string;
}

const UserPost: React.FC<UserPostProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('no-scroll');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('no-scroll');
  };

  return (
    <div>
      <Box onClick={handleOpenModal}>
        <Img src={props.post.images[0]} alt='preset-image' draggable={false} />
        {props.post.images.length > 1 ? <StackIcon /> : ''}
      </Box>
      {isModalOpen ? (
        <UserPostBody
          handleCloseModal={handleCloseModal}
          post={props.post}
          username={props.username}
          avatar={props.avatar}
          location={props.location}
          user_id={props.user_id}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default UserPost;

const Box = styled.div`
  width: 20rem;
  height: 20rem;
  margin: 0.5rem;
  background-color: rgba(0, 0, 0, 0.02);
  overflow: hidden;
  position: relative;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);

    img {
      transform: scale(1.1);
    }
  }

  transition: all 0.2s ease-in-out;
`;

const StackIcon = styled(SwitcherOutlined)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition: all 0.3s ease;
`;
