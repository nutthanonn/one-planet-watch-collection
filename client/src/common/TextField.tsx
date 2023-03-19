import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { ScreenSize } from './ScreenSize';

interface TextxFieldProps {
  label?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value?: string;
}

const TextField: React.FC<TextxFieldProps> = (props) => {
  return (
    <div>
      <Label htmlFor='' err={props.error}>
        {props.label} {props.required && '*'}
      </Label>
      <InputCustom {...props} err={props.error} />
      {props.error && <ErrorLabel>{props.error}</ErrorLabel>}
    </div>
  );
};

export default TextField;

const Label = styled.label`
  display: block;
  font-weight: 300;
  color: ${(props: { err?: string }) => (props.err ? 'red' : 'black')};
  padding-bottom: 0.25rem;
`;

const InputCustom = styled(Input)`
  border-radius: 2px;
  width: 25vw;
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    width: 20rem;
  }
  border-color: ${(props: { err?: string }) => (props.err ? 'red' : '')};
`;

const ErrorLabel = styled.label`
  display: block;
  font-weight: 300;
  color: red;
  padding: 0.25rem;
  font-size: 0.6rem;
`;
