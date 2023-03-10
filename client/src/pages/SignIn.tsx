import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@common/TextField';
import { Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { H1, H6 } from '@common/Typography';
import { ScreenSize } from '@common/ScreenSize';

interface UserForm {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [userForm, setUserForm] = useState<UserForm>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userForm);
  };

  return (
    <Center>
      <div>
        <H1_Custom>Login</H1_Custom>
      </div>
      <Form onSubmit={handleSubmit}>
        <TextField
          placeholder='Email'
          label='Email'
          type='email'
          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
          required={true}
        />
        <div>
          <Label htmlFor='' err={false}>
            Password
          </Label>
          <InputPassword
            placeholder='Password'
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            type='password'
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
            required={true}
          />
        </div>
        <Forgot>
          <H6>Forgot password?</H6>
        </Forgot>
        <BtnCustom htmlType='submit'>Login</BtnCustom>
      </Form>
      <SuggessSignUp>
        <H6>Don&apos;t have an account?</H6>
        <a href='/sign-up'>
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
  background-image: radial-gradient(#000 0.5px, #ffff 0.5px);
  background-size: 30px 30px;
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

const InputPassword = styled(Input.Password)`
  border-radius: 2px;
  width: 25vw;
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    width: 100%;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 300;
  color: ${(props: { err?: boolean }) => (props.err ? 'red' : 'black')};
  padding-bottom: 0.25rem;
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
