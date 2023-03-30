import React, { useState } from 'react';
import styled from 'styled-components';
import { H5 } from '@common/Typography';
import { HeartFilled } from '@ant-design/icons';
import { ScreenSize } from '@common/ScreenSize';

const FavoriteCollection: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Inline onClick={handleClick}>
      <HeartIcon active={isActive} />
      <Heading>Add to your collection list</Heading>
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
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  transition: all 0.3s ease-in-out;
  padding: 0.5rem;
`;

const HeartIcon = styled(HeartFilled)`
  color: ${(props: { active: boolean }) => (props.active ? '#ff4d4f' : 'black')};
  font-size: 25px;
  cursor: pointer;
  &:hover {
    color: #ff4d4f;
  }
  transition: all 0.05s ease-in-out;
`;

const Heading = styled(H5)`
  @media only screen and (max-width: ${ScreenSize.mobile}) {
    display: none;
  }
`;
