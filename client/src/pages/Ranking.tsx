import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styled from 'styled-components';
import { H3, H4 } from '@common/Typography';
import TableRanking from '@components/ranking/TableRanking';

const Ranking: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <HeadingTab>Top</HeadingTab>,
      children: <TableRanking />,
    },
  ];
  return (
    <Container>
      <Flex>
        <Heading>Collection stats</Heading>
      </Flex>
      <Box>
        <Tabs defaultActiveKey='1' items={items} style={{ color: 'black', flex: '70%' }} />
      </Box>
    </Container>
  );
};

export default Ranking;

const Container = styled.div`
  padding: 3rem;
  background-color: #ffffff;
  background-image: radial-gradient(#000 0.5px, #ffff 0.5px);
  background-size: 30px 30px;
`;

const HeadingTab = styled(H3)`
  color: black;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 3.5rem 0;
`;

const Heading = styled(H4)`
  color: black;
  font-size: 3rem;
  font-weight: 700;
`;

const Box = styled.div``;
