import React from 'react';
import { message } from 'antd';
import styled from 'styled-components';
import DeleteRequestAPI from '@api/DeleteRequest';
import AcceptRequestAPI from '@api/AcceptRequest';

interface ConfirmDeleteProps {
  id: string;
}

const ManageItem: React.FC<ConfirmDeleteProps> = (props) => {
  const handleDecline = async () => {
    const res = await DeleteRequestAPI(props.id);

    if (res.error) {
      message.error(res.error);
      return;
    }
    message.success('Request declined');

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleAccept = async () => {
    const res = await AcceptRequestAPI(props.id);

    if (res.error) {
      message.error(res.error);
      return;
    }
    message.success('Accept this request');

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Flex>
      <Delete onClick={handleDecline}>DECLINE</Delete>
      <Accept onClick={handleAccept}>APPROVE</Accept>
    </Flex>
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
