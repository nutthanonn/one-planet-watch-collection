import React from 'react';
import styled from 'styled-components';
import { H5 } from '@common/Typography';
import { HeartOutlined } from '@ant-design/icons';

const FavoriteCollection: React.FC = () => {
  return (
    <Inline>
      <HeartIcon />
      <H5>Add to your collection list</H5>
    </Inline>
  );
};

export default FavoriteCollection;

const Inline = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  > h5 {
    font-size: 1.5rem;
    font-weight: 400;
  }
`;

const HeartIcon = styled(HeartOutlined)`
  font-size: 25px;
  cursor: pointer;
  &:hover {
    color: #ff4d4f;
  }
  transition: all 0.3s ease-in-out;
`;
