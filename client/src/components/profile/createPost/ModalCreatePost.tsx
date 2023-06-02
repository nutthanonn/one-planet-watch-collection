import React, { useState } from 'react';
import styled from 'styled-components';
import { FolderAddOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import ModalBody from './ModalBody';

const ModalCreatePost: React.FC = () => {
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
      <Tooltip placement='top' title='Create Post'>
        <AddIcon onClick={handleOpenModal} />
      </Tooltip>
      {isModalOpen ? <ModalBody handleCloseModal={handleCloseModal} /> : ''}
    </div>
  );
};

export default ModalCreatePost;

const AddIcon = styled(FolderAddOutlined)`
  font-size: 25px;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  transition: all 0.1s ease-in-out;
`;
