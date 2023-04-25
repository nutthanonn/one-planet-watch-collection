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
import ImgSlide_GSAP from '@gsap/landing/ImgSlide_GSAP';
import styled from 'styled-components';
import Background_GSAP from '@gsap/landing/Background_GSAP';
import Brand_name_GSAP from '@gsap/landing/Brand_name_GSAP';

const Home: React.FC = () => {
  const root = useRef(null);
  HEADING_GSAP(root);
  Brand_model_GSAP(root);
  Text_collection_GSAP(root);
  ImgSlide_GSAP(root);
  Background_GSAP(root);
  Brand_name_GSAP(root);

  return (
    <Box ref={root}>
      <Heading />
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
`;
