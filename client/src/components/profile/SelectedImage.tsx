import React from 'react';
import { Collection } from '@interfaces/WatchApi';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { H5 } from '@common/Typography';
import { DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

interface SelectedImage extends Collection {
  onDelete: (id: string) => void;
}

const SelectedImage: React.FC<SelectedImage> = (props) => {
  return (
    <SpaceBetween>
      <Flex>
        <LazyLoadImage src={props.image} alt={props.name} effect='blur' width={80} />
        <div>
          <Brand>{props.brand}</Brand>
          <Heading>{props.name}</Heading>
          <Description>{props.description}</Description>
        </div>
      </Flex>
      <Tooltip placement='top' title='delete'>
        <TrashIcon onClick={() => props.onDelete(props.id)} />
      </Tooltip>
    </SpaceBetween>
  );
};

export default SelectedImage;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  } */
  border-radius: 10px;
  transition: all 0.1s ease-in-out;
  margin: 2rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Brand = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.25);
`;

const Heading = styled(H5)`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: 500;
`;

const Description = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  color: #999;
`;

const TrashIcon = styled(DeleteOutlined)`
  font-size: 15px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    color: #ff4d4f;
    background-color: rgba(255, 77, 79, 0.1);
  }
`;
