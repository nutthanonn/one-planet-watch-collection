import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@common/TextField';
import { Button, Popover } from 'antd';
import { H1, H6 } from '@common/Typography';
import PasswordLevel from '@components/SignUp/PasswordLevel';
import { InfoCircleFilled, LoadingOutlined } from '@ant-design/icons';
import PopoverContent from '@components/SignUp/PopoverContent';
import SignUpAPI from '@api/Sign-up';
import { ScreenSize } from '@common/ScreenSize';
import PasswordField from '@common/PasswordField';

interface UserForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [waiting, setWaiting] = useState<boolean>(false);
  const [userForm, setUserForm] = useState<UserForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errForm, setErrForm] = useState<UserForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);

    if (userForm.password !== userForm.confirmPassword) {
      setErrForm({ ...errForm, confirmPassword: 'Password does not match' });
      setWaiting(false);
      return;
    }

    const res = await SignUpAPI(userForm);

    if (res.message === 'username already exists') {
      setErrForm({ ...errForm, username: 'Username already exists' });
      setWaiting(false);
      return;
    }

    if (res.message === 'password is too short') {
      setErrForm({ ...errForm, password: 'password is too short' });
      setWaiting(false);
      return;
    }

    if (res.error === false) {
      window.location.href = '/register/complete';
    }
  };

  return (
    <Center>
      <div>
        <H1_Custom>Register</H1_Custom>
      </div>
      <Form action='' onSubmit={handleSubmit}>
        <TextField
          placeholder='Username'
          label='Username'
          type='text'
          required={true}
          onChange={(e) => setUserForm({ ...userForm, username: e.target.value.toLowerCase() })}
          error={errForm.username}
          value={userForm.username}
        />
        <TextField
          placeholder='Email'
          label='Email'
          type='email'
          required={true}
          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
          error={errForm.email}
          value={userForm.email}
        />
        <PasswordField
          onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
          error={errForm.password}
        />
        <TextField
          placeholder='Confirm password'
          label='Confirm password'
          type='password'
          required={true}
          onChange={(e) => setUserForm({ ...userForm, confirmPassword: e.target.value })}
          error={errForm.confirmPassword}
          value={userForm.confirmPassword}
        />
        <PasswordLevel password={userForm.password} />
        <PasswordSuggest>
          <H6>4 characters containing</H6>
          <div>
            <Popover placement='bottom' content={<PopoverContent pass={userForm.password} />}>
              <InfoCircleFilled style={{ color: 'rgba(0,0,0,0.5)', cursor: 'pointer' }} />
            </Popover>
          </div>
        </PasswordSuggest>
        {waiting ? <LoadingOutlined /> : <BtnCustom htmlType='submit'>Let&apos;s Roll</BtnCustom>}
      </Form>

      <SuggessSignUp>
        <H6>Already have account?</H6>
        <a href='/login'>
          <SpanSignUp>Sign in</SpanSignUp>
        </a>
      </SuggessSignUp>
    </Center>
  );
};

export default SignUp;

const Center = styled.section`
  display: flex;
  align-items: center;
  height: 85vh;
  flex-direction: column;
  opacity: 0.8;
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

const PasswordSuggest = styled.div`
  display: flex;
  justify-content: space-between;
  > h6 {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const BtnCustom = styled(Button)`
  border-radius: 2px;
  color: white;
  font-size: 300;
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
