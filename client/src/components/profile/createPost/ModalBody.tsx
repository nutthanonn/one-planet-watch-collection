import React, { useState } from 'react';
import styled from 'styled-components';
import Backdrop from './Backdrop';
import ModalHeader from './ModalHeader';
import ModalInput from './ModalInput';
import ImgSwiper from './ImgSwiper';
import { Collection } from '@interfaces/WatchApi';
import CreatePostAPI from '@api/CreatePost';
import { message } from 'antd';

interface ModalBodyProps {
  handleCloseModal: () => void;
}

interface Form {
  description: string;
  location: string;
}

interface UserPost {
  description: string;
  location: string;
  images: string[];
}

const ModalBody: React.FC<ModalBodyProps> = (props) => {
  const { handleCloseModal } = props;
  const [collection, setCollection] = useState<Collection[]>([]);
  const [form, setForm] = useState<Form>({ description: '', location: '' });

  const handleDeleteCollection = (id: string) => {
    const newCollection = collection.filter((item) => item.id !== id);
    setCollection(newCollection);
  };

  const handleCollection = (data: Collection) => {
    setCollection([...collection, data]);
  };

  const handleForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePost = async () => {
    const post: UserPost = {
      description: form.description,
      location: form.location,
      images: collection.map((item) => item.image),
    };

    if (!post.images.length) {
      message.error('Please select your favorite model');
      return;
    }

    const res = await CreatePostAPI(post);

    if (!res.error) {
      message.success('Post success');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      message.error(res.error);
    }
  };

  return (
    <Backdrop handleCloseModal={handleCloseModal}>
      <Box>
        <ModalHeader handleCloseModal={handleCloseModal} />
        <GridModal>
          <ImgSwiper collection={collection} handleDeleteCollection={handleDeleteCollection} />
          <ModalInput
            handleCollection={handleCollection}
            handleForm={handleForm}
            handlePost={handlePost}
            collectionList={collection}
          />
        </GridModal>
      </Box>
    </Backdrop>
  );
};

export default ModalBody;

const Box = styled.div`
  position: absolute;
  width: 60rem;
  height: 30rem;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  overflow: hidden;

  background-color: white;
`;

const GridModal = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  height: 100%;
`;
