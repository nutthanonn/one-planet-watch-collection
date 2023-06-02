import React, { useState } from 'react';
import { Avatar, Modal, Popconfirm, message } from 'antd';
import { Comment } from '@ant-design/compatible';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonBackground from '@assets/images/skeleton-background.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PostCarousel from './PostCarousel';
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import DeletePostAPI from '@api/DeletePost';

interface ModalPostProps {
  post_id: string;
  image: string[];
  description: string;
  avatar?: string;
  username: string;
  create_at?: string;
  isMe: boolean;
}

const ModalPost: React.FC<ModalPostProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    const res = await DeletePostAPI(props.post_id);

    if (res.error) {
      message.error('Error deleting post');
      return;
    }

    message.success('Post deleted');
    window.location.reload();
  };

  return (
    <Box>
      <Img
        src={props.image[0]}
        alt={props.description}
        placeholderSrc={SkeletonBackground}
        draggable={false}
        width='100%'
        height={400}
        onClick={() => setIsModalOpen(true)}
      />
      <Modal open={isModalOpen} onCancel={handleCancel} centered footer={null}>
        <PostCarousel image={props.image} />
        <Comment
          author={<a href={props.username}>{props.username}</a>}
          avatar={<Avatar src={props.avatar} alt={props.username} />}
          content={<p>{props.description}</p>}
          datetime={<span>{new Date(props.create_at as string).toLocaleString()}</span>}
        />
      </Modal>
      {props.isMe && (
        <Popconfirm
          title='Delete post'
          description='Are you sure to delete this post?'
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={handleDelete}
        >
          <DeleteIcon />
        </Popconfirm>
      )}
    </Box>
  );
};

export default ModalPost;

const Box = styled.div`
  position: relative;
  margin-top: 10px;
  border: 1px solid black;
`;

const DeleteIcon = styled(InfoCircleOutlined)`
  position: absolute;
  top: 20px;
  right: 10px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
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
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  vertical-align: middle;
  width: 100%;
`;
