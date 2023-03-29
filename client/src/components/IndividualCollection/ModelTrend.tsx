import React from 'react';
import styled from 'styled-components';
import { LikeOutlined } from '@ant-design/icons';
import { H5 } from '@common/Typography';

const MOCK = {
  like: 273589,
  percent: 10.32,
};

const ModelTrend: React.FC = () => {
  return (
    <div>
      <FlexCol>
        <Inline>
          <Circle />
          <Heading>Favorite this model</Heading>
        </Inline>
        <Inline>
          <LikeOutlined style={{ fontSize: '1.75rem' }} />
          <HeadingNumber>{MOCK.like.toLocaleString()}</HeadingNumber>
        </Inline>
        <div>
          <Inline>
            <span style={{ fontSize: '1rem' }}>Trend title</span>
            <Inline>
              <Triangle percent={MOCK.percent} />
              <TrendPercent percent={MOCK.percent}>{MOCK.percent}%</TrendPercent>
            </Inline>
          </Inline>
        </div>
      </FlexCol>
    </div>
  );
};

export default ModelTrend;

const Circle = styled.div`
  width: 7px;
  height: 7px;
  background: #ff4d4f;
  border-radius: 50%;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Heading = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const HeadingNumber = styled(H5)`
  font-weight: 400;
  font-size: 1.5rem;
`;

const Triangle = styled.div`
  clip-path: ${(props: { percent: number }) =>
    props.percent > 0 ? 'polygon(50% 20%, 0 70%, 100% 70%)' : 'polygon(51% 90%, 0 40%, 100% 40%);'};

  background-color: ${(props: { percent: number }) => (props.percent > 0 ? '#52c41a' : '#ff4d4f')};
  width: 10px;
  height: 10px;
`;

const TrendPercent = styled.h6`
  margin: 0;
  font-size: 1rem;
  color: ${(props: { percent: number }) => (props.percent > 0 ? '#52c41a' : '#ff4d4f')};
`;
