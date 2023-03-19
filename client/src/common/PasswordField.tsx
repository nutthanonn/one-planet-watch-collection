import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { ScreenSize } from './ScreenSize';

interface PasswordFieldProps {
  label?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
  return (
    <div>
      <Label htmlFor='' error={props.error}>
        Password *
      </Label>
      <InputPassword
        placeholder='Password'
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        type='password'
        onChange={props.onChange}
        required={true}
        error={props.error}
        minLength={6}
      />
      {props.error && <ErrorLabel>{props.error}</ErrorLabel>}
    </div>
  );
};

export default PasswordField;

const InputPassword = styled(Input.Password)`
  border-radius: 2px;
  width: 25vw;
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    width: 100%;
  }
  border-color: ${(props: { error?: string }) => (props.error ? 'red' : '')};
`;

const Label = styled.label`
  display: block;
  font-weight: 300;
  color: ${(props: { error?: string }) => (props.error ? 'red' : 'black')};
  padding-bottom: 0.25rem;
`;

const ErrorLabel = styled.label`
  display: block;
  font-weight: 300;
  color: red;
  padding: 0.25rem;
  font-size: 0.6rem;
`;
