import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import CardCollection from '@components/collection/CardCollection';

interface BrandCardCollectionProps {
  watches: Watch[];
}

interface Watch {
  id: string;
  brand: string;
  model: string;
  name: string;
  description: string;
  image: string;
  sub_images: string[];
  sub_descriptions: string[];
  favorite: number;
}

const BrandCardCollection: React.FC<BrandCardCollectionProps> = (props) => {
  return (
    <div>
      {props.watches.length === 0 ? (
        <Center>
          <Spin tip='Loading' size='large'>
            <Content />
          </Spin>
        </Center>
      ) : (
        <Grid>
          {props.watches.map((watch) => {
            return (
              <div key={watch.id}>
                <CardCollection
                  id={watch.id}
                  img={watch.image}
                  name={watch.name}
                  description={watch.description}
                  isBrandCollection={true}
                />
              </div>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default BrandCardCollection;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  margin: 1rem 0;
  overflow: scroll;
  height: 75vh;
`;

const Content = styled.div`
  padding: 50px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;
