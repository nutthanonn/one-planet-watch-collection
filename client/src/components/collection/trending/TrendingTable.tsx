import React, { useState } from 'react';
import { Image, Tag } from 'antd';
import styled from 'styled-components';
import { DataPercentage } from '@api/GetTrending';
import { BRAND_COLOR_MAP } from '@common/BrandColorMap';
import { useNavigate } from 'react-router-dom';
import { CaretDownOutlined } from '@ant-design/icons';

interface TrendingTableProps {
  start_number: number;
  data: DataPercentage[];
}

const TrendingTable: React.FC<TrendingTableProps> = (props) => {
  const navigate = useNavigate();
  const [dataSort, setDataSort] = useState<DataPercentage[]>(props.data);
  const [sortType, setSortType] = useState<boolean>(false);

  const handleSort = () => {
    if (sortType) {
      setDataSort(props.data.sort((a, b) => a.watch.favorite - b.watch.favorite));
      setSortType(false);
    } else {
      setDataSort(props.data.sort((a, b) => b.watch.favorite - a.watch.favorite));
      setSortType(true);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <TH># &nbsp;&nbsp;&nbsp;&nbsp;Model</TH>
            <TH>Brand</TH>
            <TH style={{ textAlign: 'right', cursor:"pointer" }} onClick={handleSort}>
              Favorite 24 hr.
              {sortType ? <CaretDownOutlined /> : <CaretDownOutlined rotate={180} />}
            </TH>
          </tr>
        </thead>
        <tbody>
          {dataSort.map((item, index) => {
            return (
              <Column key={index} onClick={() => navigate(`/model/${item.watch.id}`)}>
                <TD>
                  <Center>
                    <div
                      style={{
                        width: '1rem',
                        padding: '0 0.5rem',
                        fontWeight: 300,
                        fontSize: '1rem',
                      }}
                    >
                      {props.start_number + index}
                    </div>
                    <ImageCustom width={50} src={item.watch.image} />
                    <div>
                      <TextHeading>{item.watch.name}</TextHeading>
                      <Text>{item.watch.description}</Text>
                    </div>
                  </Center>
                </TD>
                <TD>
                  <Tag color={BRAND_COLOR_MAP[item.watch.brand as keyof typeof BRAND_COLOR_MAP]}>
                    {item.watch.brand}
                  </Tag>
                </TD>
                <TD>
                  <div style={{ textAlign: 'right' }}>{item.watch.favorite}</div>
                  <Percent percent={item.percentage}>{item.percentage}%</Percent>
                </TD>
              </Column>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TrendingTable;

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

const ImageCustom = styled(Image)`
  border-radius: 10px;
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
