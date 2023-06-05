import React, { useState } from 'react';
import styled from 'styled-components';
import { DataType } from './AdminTable';
import { Input, Modal, message } from 'antd';
import UploadPicture from './UploadPicture';
import { H4 } from '@common/Typography';
import UpdateModelAPI from '@api/UpdateModel';

interface UpdateModelButtonProps {
  data: DataType;
}

const UpdateModelButton: React.FC<UpdateModelButtonProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<DataType>(props.data);

  const handleOk = async () => {
    const res = await UpdateModelAPI(formData);
    if (res.status === 200) {
      setIsModalOpen(false);
      message.success(res.data.message ? res.data.message : 'Model updated');

      return;
    }

    message.error(res.data.message ? res.data.message : 'Something went wrong');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePicture = (key: string, val: string) => {
    setFormData({ ...formData, [key]: val });
  };

  const InputElementData = [
    {
      placeholder: 'model',
      name: 'model',
      value: formData.model,
    },
    {
      placeholder: 'name',
      name: 'name',
      value: formData.name.title,
    },
    {
      placeholder: 'description',
      name: 'description',
      value: formData.description,
    },
  ];

  return (
    <>
      <Flex onClick={() => setIsModalOpen(true)}>
        <Paragraph>UPDATE</Paragraph>
      </Flex>
      <Modal
        title='Update watch model'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText='Update'
      >
        <form action='' onSubmit={handleOk}>
          <ModalInput>
            <UploadPicture image={props.data.image} handleChangePicture={handleChangePicture} />
            {InputElementData.map((input, index) => {
              return (
                <Box key={index}>
                  <Title>{input.name}</Title>
                  <Input
                    required
                    placeholder={input.placeholder}
                    name={input.name}
                    value={input.value}
                    onChange={handleChange}
                  />
                </Box>
              );
            })}
          </ModalInput>
        </form>
      </Modal>
    </>
  );
};

export default UpdateModelButton;

const Flex = styled.div`
  display: flex;
`;

const Paragraph = styled.h5`
  color: #000;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 600;
  &:hover {
    background-color: #f5f5f5;
  }
  transition: all 0.2s ease-in-out;
`;

const ModalInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const Box = styled.div`
  width: 100%;
`;

const Title = styled(H4)`
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  text-transform: capitalize;
`;
