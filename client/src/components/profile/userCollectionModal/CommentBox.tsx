import React from 'react';
import styled from 'styled-components';
import { CommentUser, Post } from '@interfaces/UserProfile';
import { Avatar, Space } from 'antd';
import { ScreenSize } from '@common/ScreenSize';

interface CommentBoxProps {
  post: Post;
  comments?: CommentUser[];
  username: string;
  avatar?: string;
}

const CommentBox: React.FC<CommentBoxProps> = (props) => {
  return (
    <>
      <Box>
        {props.post.description ? (
          <Padding>
            <Space>
              <Avatar alt='Comment author' src={props.avatar} />
              <Flex>
                <Title>{props.username}</Title>
                <Description>{props.post.description}</Description>
              </Flex>
            </Space>
          </Padding>
        ) : (
          ''
        )}

        {props.comments?.map((comment, index) => {
          return (
            <Padding key={index}>
              <Space style={{ width: '100%' }}>
                <Avatar alt='Comment author' src={comment.avatar} />
                <Flex>
                  <Space>
                    <Title>{comment.username}</Title>
                    <CreateDate>{new Date(comment.created_at as string).toUTCString()}</CreateDate>
                  </Space>
                  <Description>{comment.content}</Description>
                </Flex>
              </Space>
            </Padding>
          );
        })}
      </Box>
    </>
  );
};

export default CommentBox;

const Box = styled.div`
  height: 24rem;
  overflow: scroll;

  @media (max-width: ${ScreenSize.tablet}) {
    height: 12rem;
  }
`;

const Padding = styled.div`
  padding: 1rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: 500;
`;

const Description = styled.div`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  width: 20rem;
`;

const CreateDate = styled.div`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.25);
`;
