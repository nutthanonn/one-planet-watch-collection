import { H5 } from '@common/Typography';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { FacebookFilled, InstagramFilled } from '@ant-design/icons';
import styled from 'styled-components';

const DEFAULT_STLE: React.CSSProperties = {
  fontSize: '1rem',
  padding: '0.75rem 1rem',
  minWidth: '10rem',
  color: 'rgba(0,0,0,0.7)',
  fontWeight: 'bold',
};

const RESOURCE_ITEMS: MenuProps['items'] = [
  {
    key: '1',
    label: 'Facebook',
    style: DEFAULT_STLE,
    icon: <FacebookFilled style={{ fontSize: 20 }} />,
  },
  {
    key: '2',
    label: 'Instagram',
    style: DEFAULT_STLE,
    icon: <InstagramFilled style={{ fontSize: 20 }} />,
  },
];

const ResourseDropdown: React.FC = () => {
  return (
    <>
      <Hover_div>
        <Dropdown menu={{ items: RESOURCE_ITEMS }}>
          <H5_Custom>Resouces</H5_Custom>
        </Dropdown>
      </Hover_div>
    </>
  );
};

export default ResourseDropdown;

const Hover_div = styled.div`
  cursor: pointer;
`;

const H5_Custom = styled(H5)`
  &:hover {
    color: rgba(0, 0, 0, 0.7);
    transition: all 0.2s ease-in-out;
  }
`;
