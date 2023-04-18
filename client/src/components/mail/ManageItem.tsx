import React from 'react';
import { Popconfirm } from 'antd';
import styled from 'styled-components';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface ConfirmDeleteProps {
  id: string;
}

const ManageItem: React.FC<ConfirmDeleteProps> = (props) => {
  return (
    <Popconfirm
      title='Delete model'
      description='Are you sure to delete this?'
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      //   onConfirm={handleDelete}
    >
      <Flex>
        <Delete>DECLINE</Delete>
        <Accept>ACCEPT</Accept>
      </Flex>
    </Popconfirm>
  );
};

export default ManageItem;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Delete = styled.h5`
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

const Accept = styled.h5`
  color: green;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 600;
  &:hover {
    background-color: #f5f5f5;
  }
  transition: all 0.2s ease-in-out;
`;
