import { H5 } from '@common/Typography';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DEFAULT_STYLE: React.CSSProperties = {
  fontSize: '1rem',
  padding: '0.75rem 1rem',
  width: '10rem',
  color: 'rgba(0,0,0,0.7)',
  fontWeight: 'bold',
};

const StatsDropdown: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const STATS_ITEMS: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={() => handleNavigate('/ranking')}>Ranking</div>,
      style: DEFAULT_STYLE,
    },
    {
      key: '2',
      label: <div onClick={() => handleNavigate('/activity')}>Activity</div>,
      style: DEFAULT_STYLE,
    },
  ];

  return (
    <>
      <Hover_div onClick={() => navigate('/ranking')}>
        <Dropdown menu={{ items: STATS_ITEMS }}>
          <H5_Custom>Stats</H5_Custom>
        </Dropdown>
      </Hover_div>
    </>
  );
};

export default StatsDropdown;

const Hover_div = styled.div`
  cursor: pointer;
`;

const H5_Custom = styled(H5)`
  &:hover {
    color: rgba(0, 0, 0, 0.7);
    transition: all 0.2s ease-in-out;
  }
`;
