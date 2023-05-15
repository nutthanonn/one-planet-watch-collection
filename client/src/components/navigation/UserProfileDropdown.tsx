import React, { useEffect } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Cookies } from 'react-cookie';
import Auth from '@api/Auth';

const DEFAILT_STYLE: React.CSSProperties = {
  fontSize: '1rem',
  padding: '0.75rem 1rem',
  minWidth: '10rem',
  color: 'rgba(0,0,0,0.7)',
  fontWeight: 'bold',
};

const UserProfileDropdown: React.FC = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const deleteCookie = () => {
    cookies.remove('token');

    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 500);
  };

  const handleClick = async () => {
    const res = await Auth();

    if (res.error) {
      navigate('/login');
      return;
    }

    navigate(`/${res.claims.name}`);
  };

  const PROFILE_ITEMS: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={handleClick}>Profile</div>,
      style: DEFAILT_STYLE,
      icon: <UserOutlined style={{ fontSize: 20 }} />,
    },
  ];

  const [profileItem, setProfileItem] = React.useState<MenuProps['items']>(PROFILE_ITEMS);

  useEffect(() => {
    if (cookies.get('token')) {
      setProfileItem([
        ...PROFILE_ITEMS,
        {
          key: '4',
          label: <div onClick={() => deleteCookie()}>Logout</div>,
          style: DEFAILT_STYLE,
          icon: <LogoutOutlined style={{ fontSize: 20 }} onClick={() => deleteCookie()} />,
        },
      ]);
    } else {
      setProfileItem(PROFILE_ITEMS);
    }
  }, []);

  return (
    <>
      <Hover_div onClick={handleClick}>
        <Dropdown menu={{ items: profileItem }}>
          <UserCustom style={{ fontSize: 25 }} />
        </Dropdown>
      </Hover_div>
    </>
  );
};

export default UserProfileDropdown;

const Hover_div = styled.div`
  cursor: pointer;
`;

const UserCustom = styled(UserOutlined)`
  &:hover {
    color: rgba(0, 0, 0, 0.7);
    transition: all 0.2s ease-in-out;
  }
`;
