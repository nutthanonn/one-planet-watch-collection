import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, message } from 'antd';
import { KeyOutlined, LoadingOutlined } from '@ant-design/icons';
import { ScreenSize } from '@common/ScreenSize';
import PasswordResetAPI from '@api/PasswordReset';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState<string>('');
  const [onLoad, setOnLoad] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setOnLoad(true);
    if (!password) {
      message.error('Please enter your username');
      setOnLoad(false);
      return;
    }

    const res = await PasswordResetAPI(token as string, password);

    if (res.status === 'success') {
      message.success(res.message);
      setOnLoad(false);

      navigate('/login');
      return;
    }

    message.error("Couldn't reset password");
    setOnLoad(false);
  };

  return (
    <form action='' onSubmit={handleSubmit}>
      <Box>
        <Heading>Password Reset</Heading>
        <TextField>
          <InputCustom
            size='middle'
            placeholder='Enter new password'
            prefix={<KeyOutlined />}
            onChange={handleChange}
            value={password}
            name='password'
            required
            type='password'
          />
          <Button
            type='primary'
            style={{ width: '100%', backgroundColor: 'black' }}
            onClick={handleSubmit}
          >
            {onLoad ? <LoadingOutlined /> : 'Reset Password'}
          </Button>
        </TextField>
      </Box>
    </form>
  );
};

export default PasswordReset;

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

const InputCustom = styled(Input.Password)`
  width: 25rem;

  @media only screen and (max-width: ${ScreenSize.mobile}) {
    width: 80vw;
  }
`;
