import React from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  HddOutlined,
  MailOutlined,
  PoweroffOutlined,
  ToTopOutlined,
  UserOutlined,
} from '@ant-design/icons';

interface SidebarProps {
  open: boolean;
  isAdmin?: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const navigate = useNavigate();
  const Route = [
    {
      name: 'Profile',
      value: 'login',
      icon: <UserOutlined style={{ fontSize: '1.5rem' }} />,
    },
    {
      name: 'Collection',
      value: 'collection',
      icon: <HddOutlined style={{ fontSize: '1.5rem' }} />,
    },
    {
      name: 'Request',
      value: 'request',
      icon: <ToTopOutlined style={{ fontSize: '1.5rem' }} />,
    },
  ];

  const AdminRoute = [
    {
      name: 'Dashboard',
      value: 'dashboard',
      icon: <PoweroffOutlined style={{ fontSize: '1.5rem' }} />,
    },
    {
      name: 'mail',
      value: 'admin/mail',
      icon: <MailOutlined style={{ fontSize: '1.5rem' }} />,
    },
  ];

  const handleClick = (value: string) => {
    navigate(value);
    props.onClose();
  };

  return (
    <>
      <Drawer title='One Planet' placement='right' onClose={props.onClose} open={props.open}>
        {Route.map((item, index) => {
          return (
            <Box key={index} onClick={() => handleClick(item.value)}>
              {item.icon}
              <Content>{item.name}</Content>
            </Box>
          );
        })}

        {props.isAdmin &&
          AdminRoute.map((item, index) => {
            return (
              <Box key={index} onClick={() => handleClick(item.value)}>
                {item.icon}
                <Content>
                  {item.name}
                  <Span>Admin Only</Span>
                </Content>
              </Box>
            );
          })}
      </Drawer>
    </>
  );
};

export default Sidebar;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0.5rem;

  &:hover {
    color: #1890ff;
    background-color: #e6f7ff;
  }

  cursor: pointer;

  transition: all 0.3s ease-in-out;
`;

const Content = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

const Span = styled.span`
  font-size: 0.8rem;
  font-weight: 300;
  padding: 1rem;
  color: red;
`;
