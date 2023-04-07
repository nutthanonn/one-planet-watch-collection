import React, { useState } from 'react';
import styled from 'styled-components';
import { FolderAddOutlined } from '@ant-design/icons';
import { Input, Modal, Tooltip, message } from 'antd';
import SearchFavoriteList from './SelectFavoriteList';
import { MyProfileStore } from '@store/MyProfileStore';
import { Collection } from '@interfaces/WatchApi';
import SelectedImage from './SelectedImage';
import CreatePostAPI from '@api/CreatePost';

const { TextArea } = Input;

const PostButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectFavoriteList, setSelectFavoriteList] = useState<Collection[]>([]);
  const [description, setDescription] = useState<string>('');

  const onDelete = (id: string) => {
    setSelectFavoriteList(selectFavoriteList.filter((item) => item.id !== id));
  };

  const AddPost = (watch: Collection) => {
    setSelectFavoriteList([...selectFavoriteList, watch]);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    const base64Image = selectFavoriteList.map((item) => item.image);
    console.log(base64Image);

    const res = await CreatePostAPI({ images: base64Image, description });

    if (!res.error) {
      message.success('Post success');
      window.location.reload();
    } else {
      message.error(res.error);
    }
  };

  return (
    <div>
      <Tooltip placement='top' title='Post'>
        <AddIcon onClick={() => setIsModalOpen(true)} />
      </Tooltip>
      <Modal
        title={`Create post ${selectFavoriteList.length} of 10`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText='Post'
      >
        <ListPicture>
          {selectFavoriteList.map((item) => {
            return <SelectedImage {...item} key={item.id} onDelete={onDelete} />;
          })}
        </ListPicture>
        {selectFavoriteList.length <= 10 ? (
          <SearchFavoriteList
            store={MyProfileStore}
            AddPost={AddPost}
            selectFavoriteList={selectFavoriteList}
          />
        ) : (
          ''
        )}
        <div style={{ padding: '0 2.5rem' }}>
          <TextField
            size='large'
            autoSize
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default PostButton;

const ListPicture = styled.div`
  max-height: 250px;
  overflow: scroll;
`;

const AddIcon = styled(FolderAddOutlined)`
  font-size: 25px;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  transition: all 0.1s ease-in-out;
`;

const TextField = styled(TextArea)`
  margin-top: 1rem;
  margin: 1rem 0;
`;
