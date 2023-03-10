import Heading from '@components/landing/Heading';
import React, { useRef } from 'react';
import HEADING_GSAP from '@gsap/landing/Heading_GSAP';
import ShowModel from '@components/landing/ShowModel';
import Brand_model_GSAP from '@gsap/landing/Brand_model_GSAP';
import TextMakeCollection from '@components/landing/TextMakeCollection';
import Text_collection_GSAP from '@gsap/landing/Text_collection_GSAP';
import ActivateUser from '@components/landing/ActivateUser';
import Banner from '@components/landing/Banner';
import EndCredit from '@components/landing/EndCredit';
import ImgSlide from '@components/landing/ImgSlide';
import ImgSlide_GSAP from '@gsap/landing/ImgSlide_GSAP';
import styled from 'styled-components';

const Home: React.FC = () => {
  const root = useRef(null);
  HEADING_GSAP(root);
  Brand_model_GSAP(root);
  Text_collection_GSAP(root);
  ImgSlide_GSAP(root);

  return (
    <Box ref={root}>
      <Heading />
      <ImgSlide />
      <ShowModel />
      <TextMakeCollection />
      <ActivateUser />
      <Banner />
      <EndCredit />
    </Box>
  );
};

export default Home;

const Box = styled.div`
  overflow: hidden;
  background-color: #ffffff;
  background-image: radial-gradient(#000 0.5px, #ffff 0.5px);
  background-size: 30px 30px;
`;
