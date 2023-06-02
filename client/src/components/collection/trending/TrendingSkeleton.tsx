import React from 'react';
import { Skeleton, Tag } from 'antd';
import styled from 'styled-components';
import SkeletonImage from 'antd/es/skeleton/Image';

const SkeletonTable: React.FC = () => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <TH># &nbsp;&nbsp;&nbsp;&nbsp;Model</TH>
            <TH>Brand</TH>
            <TH style={{ textAlign: 'right' }}>Favorite 24 hr.</TH>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <Column key={index}>
                <TD>
                  <Center>
                    <SkeletonImage />
                    <div>
                      <Skeleton paragraph={{ rows: 1 }} />
                    </div>
                  </Center>
                </TD>
                <TD>
                  <Tag color=''></Tag>
                </TD>
                <TD>
                  <Percent percent={0}>0</Percent>
                </TD>
              </Column>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SkeletonTable;

const TH = styled.th`
  text-align: left;
  font-weight: 300;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.5);

  &:first-child {
    width: 50%;
  }

  width: 25%;
`;

const Column = styled.tr`
  height: 3rem;
  font-weight: 600;

  &:hover {
    background-color: #f5f5f5;
  }
  cursor: pointer;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.5rem;
  gap: 1rem;
`;

const TextHeading = styled.p`
  font-size: 1rem;
  font-weight: 700;
  line-height: 120%;
  padding: 0;
  margin: 0;
`;

const Text = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 120%;
  padding: 0;
  margin: 0;

  width: 13rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Percent = styled.div`
  text-align: right;

  color: red;

  &:before {
    content: '-';

    ${(props: { percent: number }) => (props.percent >= 0 ? "content:'+'" : '')}
  }

  ${(props: { percent: number }) => (props.percent >= 0 ? 'color:#34c77b' : '')}
`;

const TD = styled.td`
  padding: 1rem;
`;
