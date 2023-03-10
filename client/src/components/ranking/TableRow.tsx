import React from 'react';
import { Tag, Tooltip } from 'antd';
import styled from 'styled-components';
import { H4 } from '@common/Typography';
import { StarOutlined } from '@ant-design/icons';
import { BRAND_COLOR_MAP } from '@common/BrandColorMap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ScreenSize } from '@common/ScreenSize';

interface TableRowProps {
  index: number;
  image: string;
  name: string;
  description: string;
  favorite: number;
  brand: string;
  percent_change: number;
}

const TableRow: React.FC<TableRowProps> = (props) => {
  return (
    <BodyRow>
      <FirstBodyCol>
        <Heading>{props.index + 1}</Heading>
        <ImgCtl
          alt='example'
          src={props.image}
          width={70}
          height={70}
          draggable={false}
          effect='blur'
        />
        <BoxTitle>
          <Heading>{props.name}</Heading>
          <Paragraph>{props.description}</Paragraph>
        </BoxTitle>
      </FirstBodyCol>

      <DefaultStyleBodyCol>
        <Tag color={BRAND_COLOR_MAP[props.brand as keyof typeof BRAND_COLOR_MAP]}>
          {props.brand}
        </Tag>
      </DefaultStyleBodyCol>

      <DefaultStyleBodyCol>
        <Heading>{props.favorite.toLocaleString()}</Heading>
        <MobilOnly>
          <PercentChangeHeading change={props.percent_change}>
            {props.percent_change.toLocaleString()}%
          </PercentChangeHeading>
        </MobilOnly>
      </DefaultStyleBodyCol>

      <DefaultStyleBodyCol>
        <PercentChangeHeading change={props.percent_change}>
          {props.percent_change.toLocaleString()}%
        </PercentChangeHeading>
      </DefaultStyleBodyCol>

      <DefaultStyleBodyCol>
        <Tooltip placement='top' title='add to collection list'>
          <StarOutlined style={{ fontSize: 20 }} />
        </Tooltip>
      </DefaultStyleBodyCol>
    </BodyRow>
  );
};

export default TableRow;

const BodyRow = styled.tr`
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
  transition: all 0.25s ease-in-out;
`;

const ImgCtl = styled(LazyLoadImage)`
  border-radius: 5px;
  object-fit: cover;
`;

const DefaultStyleBodyCol = styled.td`
  padding: 0.5rem 0;

  &:nth-child(1) {
    padding-left: 1rem;
  }
  &:nth-child(4) {
    padding-right: 1rem;
  }

  @media only screen and (max-width: ${ScreenSize.tablet}) {
    &:nth-child(4) {
      display: none;
    }
    &:nth-child(2) {
      display: none;
    }
  }
`;

const FirstBodyCol = styled(DefaultStyleBodyCol)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Heading = styled(H4)`
  color: black;
  font-weight: 600;
  font-size: 1rem;

  @media only screen and (max-width: ${ScreenSize.tablet}) {
    font-size: 0.8rem;
  }

  @media only screen and (max-width: ${ScreenSize.mobile}) {
    font-size: 3vw;
  }
`;

const PercentChangeHeading = styled(Heading)`
  color: ${(props: { change: number }) => (props.change > 0 ? 'green' : 'red')};

  &::before {
    content: ${(props: { change: number }) => (props.change > 0 ? '"+"' : '')};
  }
`;

const BoxTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const Paragraph = styled.p`
  color: rgba(0, 0, 0, 0.5);
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    display: none;
  }
`;

const MobilOnly = styled.div`
  display: none;
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    display: block;
    > h4 {
      font-size: 0.5rem;
    }
  }
`;
