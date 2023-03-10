import React, { useState } from 'react';
import { Col, Row, Image } from 'antd';
import Container from '@shared/Container';
import { H4 } from '@common/Typography';
import styled from 'styled-components';
import { WATCH_MOCK } from '@mocks/watch_mock';

const ShowModel: React.FC = () => {
  const [current_brand, setCurrentBrand] = useState<number>(0);
  const brand_name = ['Rolex', 'Patek Philippe', 'Richard Mille', 'Daniel Wellington'];

  return (
    <Container>
      <Row justify='center' style={{ overflow: 'hidden' }}>
        <Col span={12}>
          <Center>
            <Image
              src={WATCH_MOCK[current_brand].img}
              className='brand__model'
              width={400}
              alt='watch'
            />
          </Center>
        </Col>
        <Col span={12}>
          <UL>
            {brand_name.map((item, index) => {
              return (
                <LI key={index} curr={index === current_brand}>
                  <span onClick={() => setCurrentBrand(index)}>
                    <H4>{item}</H4>
                  </span>
                </LI>
              );
            })}
          </UL>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowModel;

const UL = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
  justify-content: center;
`;

const LI = styled.li`
  margin-bottom: 1.5rem;
  color: ${(props: { curr: boolean }) => (props.curr ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.5)')};

  transition: all 0.3s ease-in-out;
  cursor: pointer;
  width: fit-content;
`;

const Center = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;
