import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { ScreenSize } from './ScreenSize';

interface TextxFieldProps {
  label?: string;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const TextField: React.FC<TextxFieldProps> = (props) => {
  return (
    <div>
      <Label htmlFor='' err={props.error}>
        {props.label} {props.required && '*'}
      </Label>
      <InputCustom {...props} />
    </div>
  );
};

export default TextField;

const Label = styled.label`
  display: block;
  font-weight: 300;
  color: ${(props: { err?: boolean }) => (props.err ? 'red' : 'black')};
  padding-bottom: 0.25rem;
`;

const InputCustom = styled(Input)`
  border-radius: 2px;
  width: 25vw;
  @media only screen and (max-width: ${ScreenSize.tablet}) {
    width: 17rem;
  }
`;
