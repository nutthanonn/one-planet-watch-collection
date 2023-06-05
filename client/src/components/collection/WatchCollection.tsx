import React from 'react';
import CardCollection from './CardCollection';
import styled from 'styled-components';
import { H3 } from '@common/Typography';
import { CaretRightOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { WatchData } from '@api/GetWatches';
import { useNavigate } from 'react-router-dom';
import { ScreenSize } from '@common/ScreenSize';

interface WatchCollectionProps {
  watch: WatchData[];
}

const WatchCollection: React.FC<WatchCollectionProps> = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {props.watch.map((item) => {
        return (
          <div key={item.brand}>
            <Heading>
              <ColorChange
                onClick={() =>
                  navigate(`/collection/brand?q=${item.brand.toLowerCase().split(' ').join('-')}`)
                }
              >
                <span id='change__color'>{item.brand}</span> Collection
              </ColorChange>
              <ViewCategory
                onClick={() =>
                  navigate(`/collection/brand?q=${item.brand.toLowerCase().split(' ').join('-')}`)
                }
              >
                View caterogy
              </ViewCategory>
            </Heading>
            <Slide>
              {item.models.map((card, index) => {
                return (
                  <CardCollection
                    description={card.description}
                    name={card.name}
                    img={card.image}
                    id={card.id}
                    key={index}
                  />
                );
              })}
              <Box
                onClick={() =>
                  navigate(`/collection/brand?q=${item.brand.toLowerCase().split(' ').join('-')}`)
                }
              >
                <Tooltip placement='top' title='More'>
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
  padding: 3.5rem 3rem 1rem 3rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: lowercase;

  @media only screen and (max-width: ${ScreenSize.mobile}) {
    font-size: 1.25rem;
  }

  > span {
    cursor: pointer;
  }
  display: flex;
  justify-content: space-between;
`;

const ColorChange = styled.span`
  &::first-letter {
    text-transform: uppercase;
  }
  &:hover #change__color {
    color: ${(props) => props.theme.colors.primary};
    transition: all 0.2s ease-in-out;
  }
`;

const ViewCategory = styled.div`
  background: none;
  cursor: pointer;
  padding: 1rem 2rem;
  border-radius: 10px;
  height: 3rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: ${ScreenSize.mobile}) {
    font-size: 0.75rem;
    text-align: center;
  }
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
