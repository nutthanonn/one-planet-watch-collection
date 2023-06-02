import { SendOutlined } from '@ant-design/icons';
import { Avatar, Input, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MyProfileStore } from '@store/MyProfileStore';
import CreateCommentAPI from '@api/CreateComment';
import { CommentUser } from '@interfaces/UserProfile';

interface CommentInputProps {
  post_id: string;
  user_id: string;
  handleComment: (newComment: CommentUser) => void;
}

const CommentInput: React.FC<CommentInputProps> = (props) => {
  const [value, setValue] = useState<string>('');

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      user_id: props.user_id,
      post_id: props.post_id,
      username: MyProfileStore.username,
      avatar: MyProfileStore.profile_avatar as string,
      content: value,
    };

    if (value === '') {
      message.error('Comment cannot be empty');
      return;
    }

    const res = await CreateCommentAPI(data);

    if (res) {
      message.success('Comment successfully');

      props.handleComment({
        username: MyProfileStore.username,
        avatar: MyProfileStore.profile_avatar as string,
        created_at: new Date().toUTCString(),
        content: value,
      });

      setValue('');

      return;
    }

    message.error('Comment failed');
  };

  return (
    <>
      <form action='' onSubmit={handlePost}>
        <InlineFlex>
          <div>
            <Avatar src={MyProfileStore.profile_avatar} />
          </div>
          <Input
            maxLength={300}
            showCount
            bordered={false}
            placeholder={MyProfileStore.username === '' ? 'You are not login' : 'Write a comment'}
            disabled={MyProfileStore.username === ''}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <SendIcon onClick={handlePost} />
        </InlineFlex>
      </form>
    </>
  );
};

export default CommentInput;

const InlineFlex = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  justify-content: space-between;
`;

const SendIcon = styled(SendOutlined)`
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;
