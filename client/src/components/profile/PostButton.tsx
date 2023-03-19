import React, { useState } from 'react';
import styled from 'styled-components';
import { FolderAddOutlined } from '@ant-design/icons';
import { Modal, Tooltip } from 'antd';

const PostButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Tooltip placement='top' title='Post'>
        <AddIcon onClick={showModal} />
      </Tooltip>
      <Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default PostButton;

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
