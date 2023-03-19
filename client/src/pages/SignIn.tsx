import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@common/TextField';
import { Button } from 'antd';
import { H1, H6 } from '@common/Typography';
import { ScreenSize } from '@common/ScreenSize';
import PasswordField from '@common/PasswordField';
import SignInAPI from '@api/Sign-in';
import useAuth from '@hooks/useAuth';
import { Cookies } from 'react-cookie';
import { LoadingOutlined } from '@ant-design/icons';

interface UserForm {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  useAuth();
  const cookie = new Cookies();
  const [waiting, setWaiting] = useState<boolean>(false);
  const [userForm, setUserForm] = useState<UserForm>({
    username: '',
    password: '',
  });

  const [errForm, setErrForm] = useState<UserForm>({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    setErrForm({
      username: '',
      password: '',
    });

    const res = await SignInAPI(userForm);

    if (res.message === 'password is not match') {
      setErrForm({
        ...errForm,
        password: 'Password is not match',
      });
      setWaiting(false);
    }

    if (res.message === 'user not found') {
      setErrForm({
        ...errForm,
        username: 'user not found',
      });
      setWaiting(false);
    }

    if (res.error === false) {
      cookie.set('token', res.data?.token, { path: '/' });
      window.location.href = `${userForm.username}`;
    }
  };

  return (
    <Center>
      <div>
        <H1_Custom>Login</H1_Custom>
      </div>
      <Form onSubmit={handleSubmit}>
        <TextField
          placeholder='Username'
          label='Username'
          type='text'
          onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
          required={true}
          error={errForm.username}
          value={userForm.username}
        />
        <PasswordField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserForm({ ...userForm, password: e.target.value })
          }
          required={true}
          error={errForm.password}
        />
        <Forgot>
          <H6>Forgot password?</H6>
        </Forgot>
        {waiting ? <LoadingOutlined /> : <BtnCustom htmlType='submit'>Login</BtnCustom>}
      </Form>
      <SuggessSignUp>
        <H6>Don&apos;t have an account?</H6>
        <a href='/register'>
          <SpanSignUp>Sign up</SpanSignUp>
        </a>
      </SuggessSignUp>
    </Center>
  );
};

export default SignIn;

const Center = styled.section`
  display: flex;
  align-items: center;
  height: 75vh;
  flex-direction: column;
  opacity: 0.8;
  margin-top: 3rem;
`;

const H1_Custom = styled(H1)`
  font-size: 5rem;
  padding-bottom: 3rem;
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    font-size: 3rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Forgot = styled.div`
  display: flex;
  justify-content: flex-end;
  > h6 {
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;

    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
    transition: all 0.2s ease-in-out;
  }
  width: 25vw;
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    width: 100%;
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

const SuggessSignUp = styled.div`
  display: flex;
  padding-top: 2rem;
  gap: 0.5rem;
  > h6 {
    color: rgba(0, 0, 0, 0.5);
  }
  > a {
    text-decoration: none;
  }
`;

const SpanSignUp = styled.span`
  font-weight: 600;
  cursor: pointer;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;
