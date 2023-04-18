import React, { useEffect, useState } from 'react';
import { Badge, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TableOutlined, MailOutlined } from '@ant-design/icons';
import { H5 } from '@common/Typography';
import { observer } from 'mobx-react';
import useUserRequest from '@hooks/useUserRequest';

const DEFAILT_STYLE: React.CSSProperties = {
  fontSize: '1rem',
  padding: '0.75rem 1rem',
  minWidth: '10rem',
  color: 'rgba(0,0,0,0.7)',
  fontWeight: 'bold',
};

const AdminDropdown: React.FC = observer(() => {
  const navigate = useNavigate();
  const { request } = useUserRequest();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const count = request?.filter((item) => !item.read).length;
    setCount(count || 0);
  }, [request]);

  const PROFILE_ITEMS: MenuProps['items'] = [
    {
      key: '1',
      label: <a href='/dashboard'>Dashboard</a>,
      style: DEFAILT_STYLE,
      icon: <TableOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: '2',
      label: <a href='/admin/mail'>Mail</a>,
      style: DEFAILT_STYLE,
      icon: (
        <Badge count={count}>
          <MailOutlined style={{ fontSize: 20 }} />
        </Badge>
      ),
    },
  ];

  return (
    <>
      <Hover_div onClick={() => navigate('/dashboard')}>
        <Dropdown menu={{ items: PROFILE_ITEMS }}>
          <Badge count={count}>
            <H5_Custom>
              <a href='/dashboard'>Admin</a>
            </H5_Custom>
          </Badge>
        </Dropdown>
      </Hover_div>
    </>
  );
});

export default AdminDropdown;

const Hover_div = styled.div`
  cursor: pointer;
`;

const H5_Custom = styled(H5)`
  > a {
    &:hover {
      color: rgba(0, 0, 0, 0.7);
      transition: all 0.2s ease-in-out;
    }
    text-decoration: none;
    color: black;
  }
`;
