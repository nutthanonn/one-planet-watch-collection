import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, message } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { ScreenSize } from '@common/ScreenSize';
import ForgotPasswordAPI from '@api/ForgotPassword';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [onLoad, setOnLoad] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.toLowerCase());
  };

  const handleSubmit = async () => {
    setOnLoad(true);
    if (!username) {
      message.error('Please enter your username');
      setOnLoad(false);
      return;
    }

    const res = await ForgotPasswordAPI(username);

    if (res.status === 'success') {
      message.success(res.message);
      setOnLoad(false);
      navigate('/password/reset/send');
      return;
    }

    message.error(res.message);
    setOnLoad(false);
  };

  return (
    <form action='' onSubmit={handleSubmit}>
      <Box>
        <Heading>Reset Password</Heading>
        <TextField>
          <InputCustom
            size='middle'
            placeholder='Enter you username'
            prefix={<UserOutlined />}
            onChange={handleChange}
            value={username}
            name='username'
            required
          />
          <Button
            type='primary'
            style={{ width: '100%', backgroundColor: 'black' }}
            onClick={handleSubmit}
          >
            {onLoad ? <LoadingOutlined /> : 'Send mail'}
          </Button>
        </TextField>
      </Box>
    </form>
  );
};

export default ForgotPassword;

const Box = styled.div`
  padding: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 80vh;
`;

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 700;
`;

const TextField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

const InputCustom = styled(Input)`
  width: 25rem;

  @media only screen and (max-width: ${ScreenSize.mobile}) {
    width: 80vw;
  }
`;
