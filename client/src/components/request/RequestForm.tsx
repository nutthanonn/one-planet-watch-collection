import TextField from '@common/TextField';
import { Button, Input, Select, message, notification } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import UploadButton from './UploadButton';
import { ScreenSize } from '@common/ScreenSize';
import CreateRequestAPI from '@api/CreateRequest';
import { SmileOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const RequestForm: React.FC = () => {
  const [value, setValue] = useState({
    name: '',
    description: '',
    brand: '',
    image: '',
  });

  const handleChangeImage = (val: string) => {
    setValue({ ...value, image: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(value);

    if (!value.name || !value.description || !value.brand || !value.image) {
      message.error('Please fill all fields');
      return;
    }

    const res = await CreateRequestAPI(value);

    if (res.error) {
      message.error(res.error);
    }

    setValue({
      name: '',
      description: '',
      brand: '',
      image: '',
    });

    message.success('Request created');
    notification.open({
      message: 'Thank you for your request',
      description:
        'We will update you when your request is approved. Please check your email for more information',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      placement: 'bottomRight',
    });

    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <TextField
          label='Model name'
          placeholder='model name'
          required={true}
          onChange={(e) => setValue({ ...value, name: e.target.value })}
          value={value.name}
        />
        <TextAreaCustom
          value={value.description}
          onChange={(e) => setValue({ ...value, description: e.target.value })}
          placeholder='Model Description'
          autoSize={{ minRows: 3, maxRows: 5 }}
          size='large'
          required
        />
        <div>
          <Select
            options={[
              { value: 'ROLEX', label: 'Rolex' },
              { value: 'RICHARD MILLE', label: 'Richard Mille' },
              { value: 'PATEK PHILIPPE', label: 'Patek Philippe' },
              { value: 'DANIEL WELLINGTON', label: 'Danial Wellington' },
            ]}
            onChange={(val) => setValue({ ...value, brand: val })}
            placeholder='Select brand'
            style={{ marginRight: '2rem', width: '22    0px' }}
          />
          <UploadButton HandleChangeImage={handleChangeImage} />
        </div>
        <BtnCustom htmlType='submit'>Submit form</BtnCustom>
      </Form>
    </>
  );
};

export default RequestForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TextAreaCustom = styled(TextArea)`
  width: 25vw;
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    width: 20rem;
  }
`;

const BtnCustom = styled(Button)`
  border-radius: 2px;
  color: white;
  font-size: 600;
  width: 100%;
  background-color: black;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border: 0;
  }
  transition: all 0.2s ease-in-out;
`;
