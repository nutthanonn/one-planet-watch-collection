import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styled from 'styled-components';
import { H3 } from '@common/Typography';
import Trending from './Trending';

const Tab: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <HeadingTab>Trending</HeadingTab>,
    },
  ];
  return (
    <Container>
      <Box>
        <Tabs defaultActiveKey='1' items={items} style={{ color: 'black', flex: '70%' }} />
      </Box>

      <Trending />
    </Container>
  );
};

export default Tab;

const Container = styled.div`
  padding: 3rem;
  background-color: #ffffff;
`;

const HeadingTab = styled(H3)`
  color: black;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Box = styled.div``;
