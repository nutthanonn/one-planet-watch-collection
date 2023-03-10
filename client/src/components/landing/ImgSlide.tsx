import { ScreenSize } from '@common/ScreenSize';
import React from 'react';
import styled from 'styled-components';

const ImgSlide: React.FC = () => {
  return (
    <Container>
      <ImageControl />
    </Container>
  );
};

export default ImgSlide;

const Container = styled.section``;

const ImageControl = styled.img`
  background-image: url('https://media.richardmille.com/wp-content/uploads/2022/09/22120100/baseplate34.jpg?dpr=2&width=2000');
  height: 50vw;
  width: 100%;
  background-size: cover;
  object-fit: cover;
  background-position: center;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  background-attachment: fixed;

  @media only screen and (max-width: ${ScreenSize.mobile}) {
    display: none;
  }
`;
