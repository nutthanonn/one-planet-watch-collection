import React, { useState } from 'react';
import styled from 'styled-components';
import { STATS_MOCK } from '@mocks/stats_mock';
import TableRow from './TableRow';
import Selected from './Selected';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { ScreenSize } from '@common/ScreenSize';

const TableRanking: React.FC = () => {
  const [sorted, setSorted] = useState<boolean>(false);

  return (
    <div>
      <Selected />
      <Table>
        <thead>
          <tr>
            <TableHeader>Collection</TableHeader>
            <TableHeader>Brand</TableHeader>
            <TableHeader onClick={() => setSorted(!sorted)}>
              Favorite &nbsp;
              {sorted ? <CaretDownOutlined /> : <CaretUpOutlined />}
            </TableHeader>
            <TableHeader>% change</TableHeader>
            <TableHeader></TableHeader>
          </tr>
        </thead>
        <tbody>
          {STATS_MOCK.map((item, index) => {
            return <TableRow {...item} index={index} key={item.key} />;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableRanking;

const Table = styled.table`
  width: 100%;
  /* border: 1px solid black; */
  background-color: white;
`;

const TableHeader = styled.th`
  text-align: left;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.3);

  &:nth-child(1) {
    padding-left: 4rem;
  }

  &:nth-child(3) {
    cursor: pointer;
  }

  @media only screen and (max-width: ${ScreenSize.tablet}) {
    &:nth-child(4) {
      display: none;
    }
    &:nth-child(2) {
      display: none;
    }
  }

  &:nth-child(3) {
    cursor: pointer;
  }
`;
