import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H5 } from '@common/Typography';
import { HeartFilled } from '@ant-design/icons';
import { ScreenSize } from '@common/ScreenSize';
import { MyProfileImpl } from '@store/MyProfileStore';
import { observer } from 'mobx-react';
import AddFavoriteAPI from '@api/AddFavorite';

interface FavoriteCollectionProps {
  my_store: MyProfileImpl;
  watch_id?: string;
}

const FavoriteCollection: React.FC<FavoriteCollectionProps> = observer((props) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (props.my_store.favorite_list.includes(props.watch_id as string)) {
      setIsActive(true);
    }
  }, [props.my_store.favorite_list, props.watch_id]);

  const handleClick = () => {
    setIsActive(!isActive);
    if (isActive) {
      props.my_store.removeFavoriteList(props.watch_id as string);
    } else {
      props.my_store.addFavoriteList(props.watch_id as string);
    }
    AddFavoriteAPI(props.watch_id as string);
  };

  return (
    <Inline onClick={handleClick}>
      <HeartIcon is_fav={`${isActive}`} />
      <Heading>Add to your collection list</Heading>
    </Inline>
  );
});

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
  color: ${(props: { is_fav: string }) => (props.is_fav === 'true' ? '#ff4d4f' : '#000000')};
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
