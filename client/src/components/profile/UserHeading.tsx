import React, { useState } from 'react';
import { H3 } from '@common/Typography';
import styled from 'styled-components';
import { Divider, Tooltip } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import MemberShip from '@assets/images/membership.svg';
import UpdateProfile from './update/UpdateProfile';
import ModalCreatePost from './createPost/ModalCreatePost';

interface UserHeadingProps {
  username: string;
  bio?: string;
  membership?: boolean;
  created_at?: Date;
  isMe?: boolean;
  post: number;
}

const UserHeading: React.FC<UserHeadingProps> = (props) => {
  const [copyState, setCopyState] = useState('Share Profile');

  const handleClick = () => {
    window.navigator.clipboard.writeText(window.location.href);
    setCopyState('Copied!');

    setTimeout(() => {
      setCopyState('Share Profile');
    }, 2000);
  };

  return (
    <Box>
      <Flex>
        <Heading>
          {props.username} &nbsp;&nbsp;&nbsp;
          {props.membership ? <img src={MemberShip} alt='membership' width={30} /> : ''}
        </Heading>
        <FlexChild>
          {props.isMe ? (
            <Inline>
              <ModalCreatePost />
              <UpdateProfile {...props} />
            </Inline>
          ) : (
            ''
          )}
          <Tooltip placement='top' title={copyState}>
            <ShareIcon onClick={handleClick} />
          </Tooltip>
        </FlexChild>
      </Flex>
      <SubHeading>
        <div>
          <Head>Post&nbsp;&nbsp;</Head>
          <HeadData>{props.post}</HeadData>
        </div>
        <div>
          <Head>Created&nbsp;</Head>
          <HeadData>{new Date(props.created_at ?? '').toDateString()}</HeadData>
        </div>
      </SubHeading>
      <Description>
        <Paragraph>{props.bio}</Paragraph>
      </Description>
      <Divider />
    </Box>
  );
};

export default UserHeading;

const Box = styled.div`
  padding: 5rem 3rem 1rem 3rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const FlexChild = styled.div`
  display: flex;
`;

const Heading = styled(H3)`
  font-size: 2rem;
  font-weight: 600;
`;

const ShareIcon = styled(ShareAltOutlined)`
  font-size: 25px;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  transition: all 0.1s ease-in-out;
`;

const SubHeading = styled(H3)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Head = styled.p`
  font-size: 1rem;
  font-weight: 500;
  display: inline;
`;

const HeadData = styled.h6`
  font-size: 1rem;
  font-weight: 600;
  display: inline;
`;

const Description = styled.div`
  padding: 1rem 0;
  display: flex;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.4);
  width: 50vw;
`;

const Inline = styled.div`
  display: flex;
`;
