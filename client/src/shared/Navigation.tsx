import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from './Container';
import Logo from '@assets/images/one-planet-logo.svg';
import { H3, H5 } from '@common/Typography';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import useDebounce from '@hooks/useDebounce';
import UserProfileDropdown from '@components/navigation/UserProfileDropdown';
import ResourseDropdown from '@components/navigation/ResourseDropdown';
import StatsDropdown from '@components/navigation/StatsDropdown';
import { ScreenSize } from '@common/ScreenSize';
import Sidebar from './Sidebar';

const Navigation: React.FC = () => {
  const [searchValue, setValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [options, setOptions] = useState([{ value: 'Rolex' }, { value: 'Patek Philippe' }]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const onClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (debouncedSearchValue) {
      setOptions(options.filter((option) => option.value.includes(debouncedSearchValue)));
    } else {
      setOptions([{ value: 'Rolex' }, { value: 'Patek Philippe' }]);
    }
  }, [debouncedSearchValue]);

  const handleSearch = (val: string) => {
    setValue(val);
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
          <InputGroup compact>
            <AutoComplete
              style={{ width: '100%', fontWeight: 600 }}
              size='large'
              onSearch={handleSearch}
              placeholder={
                <div>
                  <SearchOutlined />
                  <PlaceholderFull>Search items, Collection, Account</PlaceholderFull>
                  <PlaceholderShort>Search items</PlaceholderShort>
                </div>
              }
              options={options}
              notFoundContent={"Can't find anything"}
              allowClear
            />
          </InputGroup>
          <Inline>
            <H5_Custom>
              <a href='/collection'>Collection</a>
            </H5_Custom>
            <ResourseDropdown />
            <StatsDropdown />
            <UserProfileDropdown />
          </Inline>
          <SidebarMobile>
            <MenuOutlined size={25} onClick={() => setOpenDrawer(!openDrawer)} />
            <Sidebar onClose={onClose} open={openDrawer} />
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
  z-index: 1000;
  background: white;
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

const PlaceholderFull = styled.span`
  margin-left: 0.5rem;
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const PlaceholderShort = styled.span`
  margin-left: 0.5rem;
  display: none;
  @media only screen and (max-width: 500px) {
    display: inline;
  }
`;

const InputGroup = styled(Input.Group)`
  padding: 0 2.5rem;
  @media only screen and (max-width: ${ScreenSize.mobile}) {
    padding: 0;
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
