import React from 'react';
import { H3 } from '@common/Typography';
import styled from 'styled-components';
import { Divider, Tooltip } from 'antd';
import { SettingOutlined, ShareAltOutlined } from '@ant-design/icons';
import MemberShip from '@assets/images/membership.svg';
import PostButton from './PostButton';

interface UserHeadingProps {
  username?: string;
  bio?: string;
  membership?: boolean;
  created_at?: Date;
  isMe?: boolean;
}

const UserHeading: React.FC<UserHeadingProps> = (props) => {
  return (
    <Box>
      <Flex>
        <Heading>
          {props.username} &nbsp;&nbsp;&nbsp;
          {props.membership ? <img src={MemberShip} alt='membership' width={30} /> : ''}
        </Heading>
        <FlexChild>
          <Tooltip placement='top' title='share profile'>
            <ShareIcon />
          </Tooltip>
          {props.isMe ? (
            <Inline>
              <Tooltip placement='top' title='setting'>
                <SettingIcon />
              </Tooltip>
              <PostButton />
            </Inline>
          ) : (
            ''
          )}
        </FlexChild>
      </Flex>
      <SubHeading>
        <div>
          <Head>Post&nbsp;&nbsp;</Head>
          <HeadData>10</HeadData>
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

const SettingIcon = styled(SettingOutlined)`
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
