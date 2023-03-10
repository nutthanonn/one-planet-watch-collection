import React from 'react';
import { H3 } from '@common/Typography';
import styled from 'styled-components';
import { ShareAltOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const UserHeading: React.FC = () => {
  return (
    <Box>
      <Flex>
        <Heading>Nutthanon Ape Yacht Club</Heading>
        <FlexChild>
          <Tooltip placement='top' title='share profile'>
            <ShareIcon />
          </Tooltip>
        </FlexChild>
      </Flex>
      <SubHeading>
        <div>
          <Head>items&nbsp;</Head>
          <HeadData>19K</HeadData>
        </div>
        <div>
          <Head>Created&nbsp;</Head>
          <HeadData>Aug 2021</HeadData>
        </div>
      </SubHeading>
      <Description>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sint placeat sunt. Tempore
          laboriosam, aperiam molestias obcaecati molestiae harum sint iusto saepe doloremque quod
          adipisci rerum aliquam, delectus qui doloribus.
        </Paragraph>
      </Description>
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
