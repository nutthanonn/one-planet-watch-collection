import React, { useState } from 'react';
import styled from 'styled-components';
import UserPostBody from './UserPostBody';
import { Post } from '@interfaces/UserProfile';
import { EllipsisOutlined, SwitcherOutlined } from '@ant-design/icons';
import ModalDelete from './ModalDelete';
import DeletePostAPI from '@api/DeletePost';
import { message } from 'antd';

interface UserPostProps {
  post: Post;
  username: string;
  avatar?: string;
  location?: string;
  user_id: string;
  isMe: boolean;
}

const UserPost: React.FC<UserPostProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDelete, setModelDelete] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;

    setIsModalOpen(true);
    document.body.classList.add('no-scroll');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('no-scroll');
  };

  const onDelete = async () => {
    const res = await DeletePostAPI(props.post.id);
    console.log(res);

    if (!res.status) {
      message.error('Something went wrong');
      return;
    }

    message.success('Post deleted');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div>
      <Box>
        <Img
          src={props.post.images[0]}
          alt='preset-image'
          draggable={false}
          onClick={handleOpenModal}
        />
        {props.post.images.length > 1 ? <StackIcon /> : ''}
        {props.isMe ? (
          <div>
            <EllipsisIcon
              stack={props.post.images.length > 1 ? 'having' : ''}
              onClick={() => setModelDelete(true)}
            />
            {modalDelete ? (
              <ModalDelete handleCloseModal={() => setModelDelete(false)} onDelete={onDelete} />
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
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

const EllipsisIcon = styled(EllipsisOutlined)`
  position: absolute;
  top: ${(props: { stack: string }) => (props.stack ? '2.5rem' : '0.75rem')};
  right: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;

  &:hover {
    color: rgba(0, 0, 0, 0.8);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }

  transition: all 0.3s ease;
`;
