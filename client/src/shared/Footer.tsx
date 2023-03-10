import React from 'react';
import styled from 'styled-components';
import Logo from '@assets/images/one-planet-logo.svg';
import { H5 } from '@common/Typography';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import { ScreenSize } from '@common/ScreenSize';

const Footer: React.FC = () => {
  return (
    <Box>
      <Flex>
        <img src={Logo} alt='One planet logo' draggable='false' />
        <Column>
          <H5>© 2021 OnePlanet</H5>
          <p>Make your watch collection</p>
        </Column>
      </Flex>
      <Flex>
        <InstagramOutlined style={{ fontSize: 40, color: 'white' }} />
        <FacebookOutlined style={{ fontSize: 40, color: 'white' }} />
      </Flex>
    </Box>
  );
};

export default Footer;

const Box = styled.footer`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  width: 100%;
  padding: 0 3rem;
  @media only screen and (max-width: ${ScreenSize.mobile}) {
    padding: 0 1rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  > * {
    color: white;
  }
  margin: 1rem 0 0 0;
  @media only screen and (max-width: ${ScreenSize.mobile}) {
    font-size: 0.5rem;
    margin: 0.5rem 0 0 0;
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 1rem;
`;
