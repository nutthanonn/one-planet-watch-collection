import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';

interface SearchWatchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchWatch: React.FC<SearchWatchProps> = (props) => {
  return (
    <Box>
      <InputCustom
        size='large'
        placeholder='Search watch'
        prefix={<SearchOutlined />}
        bordered={false}
        onChange={props.onChange}
      />
    </Box>
  );
};

export default SearchWatch;

const Box = styled.div`
  border-right: 1px solid #f0f0f0;
`;

const InputCustom = styled(Input)`
  padding: 1rem 2rem;
  color: ${(props) => props.theme.colors.primary};
  > * {
    font-weight: 500;
  }
`;
