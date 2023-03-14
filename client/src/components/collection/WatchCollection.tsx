import React from 'react';
import CardCollection from './CardCollection';
import styled from 'styled-components';
import { H3 } from '@common/Typography';
import { CaretRightOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { WATCH_API } from '@mocks/watch_api';

// interface IWatch {
//   brand: string;
//   models: {
//     name: string;
//     description: string;
//     image: string;
//   }[];
// }

const WatchCollection: React.FC = () => {
  // const [data, setData] = useState<IWatch[]>(WATCH_API);

  return (
    <>
      {WATCH_API.map((item) => {
        return (
          <div
            key={Math.floor(Math.random() * 100)
              .toString()
              .slice(0, 5)}
          >
            <Heading>
              {item.brand} Collection
              <span>
                <Link href='#'>View all</Link>
              </span>
            </Heading>
            <Slide>
              {item.models.map((card, index) => {
                return (
                  <CardCollection
                    description={card.description}
                    name={card.name}
                    img={card.image}
                    key={index}
                  />
                );
              })}
              <Box>
                <Tooltip placement='top' title='see more collection'>
                  <Arrow>
                    <CaretRightOutlined style={{ fontSize: 25, color: 'rgba(0,0,0,0.25)' }} />
                  </Arrow>
                </Tooltip>
              </Box>
            </Slide>
          </div>
        );
      })}
    </>
  );
};

export default WatchCollection;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled(H3)`
  padding: 1.5rem 3rem;
  font-size: 2.5rem;
  font-weight: 600;
  text-transform: lowercase;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const Link = styled.a`
  color: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
  padding: 0 0 0 1rem;

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }

  transition: all 0.5s ease-in-out;
`;

const Slide = styled.div`
  overflow: auto;
  white-space: nowrap;
  display: flex;
  gap: 1.5rem;
  padding: 1rem 5rem;
`;

const Arrow = styled.div`
  display: flex;
  cursor: pointer;
  border: 1.5px solid rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  > * {
    padding: 0.5rem;
  }
  &:hover {
    border: 1.5px solid rgba(0, 0, 0, 0.8);
  }
  transition: all 0.5s ease-in-out;
`;
