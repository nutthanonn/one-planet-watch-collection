import React, { useState } from 'react';
import styled from 'styled-components';
import Container from './Container';
import Logo from '@assets/images/one-planet-logo.svg';
import { H3, H5 } from '@common/Typography';
import { MenuOutlined } from '@ant-design/icons';
import UserProfileDropdown from '@components/navigation/UserProfileDropdown';
import { ScreenSize } from '@common/ScreenSize';
import Sidebar from './Sidebar';
import SearchBar from '@components/navigation/SearchBar';
import useAdmin from '@hooks/useAdmin';
import AdminDropdown from '@components/navigation/AdminDropdown';

const Navigation: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { isAdmin } = useAdmin();

  const onClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Container>
      <Nav>
        <InlineNav>
          <div>
            <Link href='/'>
              <ImgControl alt='one planet logo' src={Logo} width={50} />
            </Link>
          </div>
          <div>
            <Link href='/'>
              <H3_Custom>OnePlanet</H3_Custom>
            </Link>
          </div>
          <SearchBar />
          <Inline>
            <H5_Custom>
              <a href='/collection'>Collection</a>
            </H5_Custom>
            <H5_Custom>
              <a href='/request'>Request</a>
            </H5_Custom>
            {isAdmin && <AdminDropdown />}
            {/* <StatsDropdown /> */}
            <UserProfileDropdown />
          </Inline>
          <SidebarMobile>
            <MenuOutlined size={25} onClick={() => setOpenDrawer(!openDrawer)} />
            <Sidebar onClose={onClose} open={openDrawer} isAdmin={isAdmin} />
          </SidebarMobile>
        </InlineNav>
      </Nav>
    </Container>
  );
};

export default Navigation;

const Nav = styled.nav`
  padding: 0.5rem 3rem;
  width: 100%;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  background: rgba(255, 255, 255);
  @media only screen and (max-width: ${ScreenSize.mobile}) {
    padding: 0.5rem 1rem;
  }
`;

const InlineNav = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

const Link = styled.a`
  text-decoration: none;
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

const H3_Custom = styled(H3)`
  font-weight: bolder;
  color: #1868d7;

  @media only screen and (max-width: ${ScreenSize.mobile}) {
    display: none;
  }
`;

const ImgControl = styled.img`
  @media only screen and (max-width: ${ScreenSize.mobile}) {
    width: 10vw;
  }
`;

const Inline = styled.div`
  display: inline-flex;
  gap: 2rem;
  align-items: center;

  @media only screen and (max-width: ${ScreenSize.tablet}) {
    display: none;
  }
`;

const SidebarMobile = styled.div`
  display: none;
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    display: block;
  }
`;
