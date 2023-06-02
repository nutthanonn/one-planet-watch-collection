import React, { useState } from 'react';
import styled from 'styled-components';
import CommentInput from './CommentInput';
import CommentBox from './CommentBox';
import PostHeading from './PostHeading';
import { CommentUser, Post } from '@interfaces/UserProfile';

interface UserPostDescriptionProps {
  username: string;
  avatar?: string;
  create_date?: string;
  location?: string;
  user_id: string;
  post: Post;
}

const UserPostDescription: React.FC<UserPostDescriptionProps> = (props) => {
  const [comments, setComments] = useState<CommentUser[]>(props.post.comments || []);

  const handleComment = (newComment: CommentUser) => {
    setComments([...comments, newComment]);
  };

  return (
    <>
      <Box>
        <PostHeading
          username={props.username}
          avatar={props.avatar}
          create_date={props.create_date}
          location={props.location}
        />
        <CommentBox
          comments={comments}
          username={props.username}
          avatar={props.avatar}
          post={props.post}
        />
        <CommentInput
          post_id={props.post.id}
          handleComment={handleComment}
          user_id={props.user_id}
        />
      </Box>
    </>
  );
};

export default UserPostDescription;

const Box = styled.div`
  border-left: 1px solid #e8e8e8;
`;
