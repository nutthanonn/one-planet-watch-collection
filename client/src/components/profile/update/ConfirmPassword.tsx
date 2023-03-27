import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

interface ConfirmPasswordProps {
  password: string;
  error: boolean;
  setPassword: (password: string) => void;
}

const ConfirmPassword: React.FC<ConfirmPasswordProps> = (props) => {
  return (
    <div>
      <Paragraph error={props.error as boolean}>Confirm password *</Paragraph>
      <Password
        placeholder='Confirm your password'
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
        status={props.error ? 'error' : ''}
      />
    </div>
  );
};

export default ConfirmPassword;

const Password = styled(Input.Password)``;

const Paragraph = styled.p`
  font-size: 1rem;
  ${(props: { error: boolean }) => (props.error ? 'color: red' : 'color: #000')};
`;
