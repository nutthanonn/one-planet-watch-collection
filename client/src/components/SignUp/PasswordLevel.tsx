import React from 'react';
import styled from 'styled-components';

interface PasswordLevelProps {
  password: string;
}

function getLevel(password: string) {
  let level = 0;
  if (password.length >= 8) {
    level++;
  }
  if (/[a-z]/.test(password)) {
    level++;
  }
  if (/[A-Z]/.test(password)) {
    level++;
  }
  if (/[0-9]/.test(password)) {
    level++;
  }
  if (/[#?!@$%^&*-_]/.test(password)) {
    level++;
  }
  return level;
}

const PasswordLevel: React.FC<PasswordLevelProps> = (props) => {
  const level: number[] = [1, 2, 3, 4, 5];

  return (
    <div>
      <Column>
        {level.map((item) => {
          return item <= getLevel(props.password) ? (
            <Fragment key={item} />
          ) : (
            <Fragment key={item} style={{ backgroundColor: '#e0e0e0' }} />
          );
        })}
      </Column>
    </div>
  );
};

export default PasswordLevel;

const Column = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Fragment = styled.div`
  height: 3px;
  border-radius: 5px;
  background-color: #4285f4;
  width: 4rem;
`;
