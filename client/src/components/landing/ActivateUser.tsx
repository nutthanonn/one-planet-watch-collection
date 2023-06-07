import { H1 } from '@common/Typography';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Col, Row, Statistic } from 'antd';
import Logo from '@assets/images/one-planet-logo.svg';

const ActivateUser: React.FC = () => {
  return (
    <section>
      <Center>
        <Heading_LOGO>ONE PLANET</Heading_LOGO>
      </Center>

      <Card>
        <Row align={'middle'} justify='center' gutter={100} style={{ padding: '3rem' }}>
          <Col span={12}>
            <ImgControl>
              <img src={Logo} alt='one planet logo' width={300} className='img__rotate' />
            </ImgControl>
          </Col>
          <Col span={12}>
            <Statistic
              title='Brand'
              value={4}
              style={{ fontWeight: 'bold' }}
              valueStyle={{
                fontWeight: 'bold',
                fontSize: '3rem',
              }}
            />
            <Statistic
              title='Collection'
              value={1953}
              style={{ fontWeight: 'bold' }}
              valueStyle={{ fontWeight: 'bold', fontSize: '3rem' }}
            />
          </Col>
        </Row>
      </Card>
    </section>
  );
};

export default ActivateUser;

const Card = styled.div`
  display: flex;
  justify-content: center;
  > div {
    display: inline-flex;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      scale: 1.02;
    }

    transition: all 0.3s ease-in-out;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const text_animte = keyframes`
    to {
        background-position: 200% center;
    }
`;

const Heading_LOGO = styled(H1)`
  font-size: 5.5rem;
  color: black;
  text-align: center;
  text-transform: uppercase;
  background-image: linear-gradient(-225deg, #231557 0%, #44107a 29%, #ff1361 67%, #fff800 100%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${text_animte} 2s linear infinite;
  display: inline-block;
`;

const ImgControl = styled(Center)`
  align-items: flex-end;
  justify-content: flex-end;
`;
