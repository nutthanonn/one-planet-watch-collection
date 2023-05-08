import React from 'react';
import styled from 'styled-components';
import RolexSVG from '@assets/images/rolex-logo.svg';
import PatekSVG from '@assets/images/patek-philippe-logo.svg';
import RolexShowCase from '@assets/images/rolex-show-case.png';
import RichardMilleSVG from '@assets/images/richard-mille-logo.svg';

import BackgroundLanding from '@assets/images/background-landing.png';

const ShowModel: React.FC = () => {
  return (
    <Box>
      <Background className='background__animate' />
      <Heading>
        <span className='title__1'>Your</span>
        <span className='title__2'>watch</span>
        <span className='title__3'>collection.</span>
      </Heading>
      <Square>
        <SubHeading>
          <div className='subtitle__animte1'>Discover</div>
          <div className='subtitle__animte2'>the Top</div>
          <div className='subtitle__animte3'>Brand</div>
          <div className='subtitle__animte4'>for You</div>
          <div className='subtitle__animte5'>Today!</div>
        </SubHeading>
        <Rolex src={RolexSVG} className='brand__animate' alt='brand' />
        <Patek src={PatekSVG} className='brand__animate' alt='brand' />
        <RichardMille src={RichardMilleSVG} className='brand__animate' />
      </Square>
      <RolexShowCaseStyle src={RolexShowCase} alt='rolex-showcase' className='rolex__showcase' />
    </Box>
  );
};

export default ShowModel;

const Box = styled.div`
  height: 600vh;
  clip-path: inset(0%);
  background: black;
`;

const Background = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: ${`url(${BackgroundLanding})`};
  width: 50%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 2;
`;

const Heading = styled.h1`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 7rem;
  font-weight: 600;
  color: white;
  display: flex;
  gap: 1rem;
  z-index: 2;
`;

const Square = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubHeading = styled.h5`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6rem;
  font-weight: 700;
  padding: 2rem;
  color: white;
  > div {
    opacity: 0;
  }
`;

const BaseImage = styled.img`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10rem;
`;

const Rolex = styled(BaseImage)``;

const Patek = styled(BaseImage)`
  /* transform: translate(-50%, -50%); */
  left: -80%;
`;

const RichardMille = styled(BaseImage)`
  /* transform: translate(-50%, -50%); */
  left: 180%;
  top: 70%;
`;

const RolexShowCaseStyle = styled(BaseImage)`
  opacity: 0;
  width: 100%;
  background-position: center;
`;
