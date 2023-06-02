import React from 'react';
import { Avatar, Space } from 'antd';
import styled from 'styled-components';

interface PostHeadingProps {
  username: string;
  avatar?: string;
  location?: string;
  create_date?: string;
}

const PostHeading: React.FC<PostHeadingProps> = (props) => {
  return (
    <>
      <Padding>
        <Space>
          <Avatar src={props.avatar} alt='post author' />
          <Center>
            <Title>{props.username}</Title>
            <Description>
              <b>{props.location}</b> {new Date(props.create_date as string).toUTCString()}
            </Description>
          </Center>
        </Space>
      </Padding>
    </>
  );
};

export default PostHeading;

const Padding = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e8e8e8;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const Description = styled.div`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.25);
`;
