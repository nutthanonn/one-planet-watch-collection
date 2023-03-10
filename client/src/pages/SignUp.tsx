import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@common/TextField';
import { Button, Input, Popover } from 'antd';
import { H1, H6 } from '@common/Typography';
import PasswordLevel from '@components/SignUp/PasswordLevel';
import { InfoCircleFilled } from '@ant-design/icons';
import PopoverContent from '@components/SignUp/PopoverContent';
import { ScreenSize } from '@common/ScreenSize';

interface UserForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [userForm, setUserForm] = useState<UserForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <Center>
      <div>
        <H1_Custom>Register</H1_Custom>
      </div>
      <Form action=''>
        <TextField
          placeholder='Username'
          label='Username'
          type='text'
          required={true}
          onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
        />
        <TextField
          placeholder='Email'
          label='Email'
          type='email'
          required={true}
          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
        />
        <div>
          <Label htmlFor='' err={false}>
            Password *
          </Label>
          <InputPassword
            placeholder='Password'
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            required={true}
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
          />
        </div>
        <TextField
          placeholder='Confirm password'
          label='Confirm password'
          type='password'
          required={true}
          onChange={(e) => setUserForm({ ...userForm, confirmPassword: e.target.value })}
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

        <BtnCustom htmlType='submit'>Let&apos;s Roll</BtnCustom>
      </Form>

      <SuggessSignUp>
        <H6>Already have account?</H6>
        <a href='/sign-in'>
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
