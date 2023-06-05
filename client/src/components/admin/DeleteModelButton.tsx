import React from 'react';
import { Popconfirm, message } from 'antd';
import styled from 'styled-components';
import { QuestionCircleOutlined } from '@ant-design/icons';
import DeleteWatchAPI from '@api/DeleteWatch';

interface DeleteModelButtonProps {
  id: string;
}

const DeleteModelButton: React.FC<DeleteModelButtonProps> = (props) => {
  const handleDelete = async () => {
    const res = await DeleteWatchAPI(props.id);

    if (!res.error) {
      message.success('Successfully deleted');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return;
    }

    message.error(res.error);

    return;
  };

  return (
    <Popconfirm
      title='Delete model'
      description='Are you sure to delete this?'
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={handleDelete}
    >
      <Flex>
        <Paragraph>DELETE</Paragraph>
      </Flex>
    </Popconfirm>
  );
};

export default DeleteModelButton;

const Flex = styled.div`
  display: flex;
`;

const Paragraph = styled.h5`
  color: red;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 600;
  &:hover {
    background-color: #f5f5f5;
  }
  transition: all 0.2s ease-in-out;
`;
