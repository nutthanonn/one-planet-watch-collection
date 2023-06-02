import React from 'react';

import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Avatar, Input, Space, Button } from 'antd';
import { MyProfileStore } from '@store/MyProfileStore';
import SearchFavModel from './SearchFavModel';
import { Collection } from '@interfaces/WatchApi';
import SelectLocation from './SelectLocation';

const { TextArea } = Input;

interface ModalInputProps {
  handleCollection: (data: Collection) => void;
  handleForm: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handlePost: () => void;
  collectionList: Collection[];
}

const ModalInput: React.FC<ModalInputProps> = observer((props) => {
  const AddPost = (watch: Collection) => {
    props.handleCollection(watch);
  };

  const handleChange = (value: string) => {
    props.handleForm({
      target: { name: 'location', value },
    } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  return (
    <>
      <Box>
        <Space>
          <Avatar src={MyProfileStore.profile_avatar} alt='profile' />
          <span style={{ fontWeight: 600 }}>{MyProfileStore.username}</span>
        </Space>
        <InputCustom
          placeholder='What do you want to talk about?'
          bordered={false}
          autoSize={{ minRows: 6, maxRows: 6 }}
          maxLength={500}
          showCount
          name='description'
          onChange={props.handleForm}
        />
        <SearchFavModel
          AddPost={AddPost}
          selectFavoriteList={props.collectionList}
          store={MyProfileStore}
        />
        <SelectLocation handleChange={handleChange} />
        <Button
          type='primary'
          style={{ width: '100%', marginTop: '1rem', background: 'black' }}
          onClick={props.handlePost}
        >
          Post
        </Button>
      </Box>
    </>
  );
});

export default ModalInput;

const Box = styled.div`
  padding: 1rem;
  border-left: 1px solid #dbdbdb;
`;

const InputCustom = styled(TextArea)`
  padding: 0.5rem 0;
  height: 13rem;
`;
