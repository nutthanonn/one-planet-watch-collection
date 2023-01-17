import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { RocketFilled } from '@ant-design/icons';

const Layout: React.FC = () => {
  return (
    <>
      <Nav>
        <div>
          <RocketFilled style={{ fontSize: '100px', color: '#08c' }} />
        </div>
      </Nav>
      <Outlet />
    </>
  );
};

export default Layout;

const Nav = styled.nav`
  display: inline-flex;
`;
