import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import SearchItemAPI from '@api/SearchItem';
import { ScreenSize } from '@common/ScreenSize';
import useDebounce from '@hooks/useDebounce';
import { AutoComplete, Input, SelectProps } from 'antd';
import styled from 'styled-components';
import SearchItem from './SearchItem';

const SearchBar: React.FC = () => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const [searchValue, setValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const handleSearch = (val: string) => {
    setValue(val);
  };

  useEffect(() => {
    async function getSearch(searchKey: string) {
      const res = await SearchItemAPI(searchKey);
      if (!res.users) {
        setOptions([]);
        return;
      }

      const options = res.users.map((item) => ({
        value: item.username,
        label: (
          <SearchItem
            avatar={item.avatar}
            username={item.username}
            id={item.id}
            bio={item.bio}
            post={item.post?.length}
          />
        ),
      }));

      setOptions(options);
    }

    if (debouncedSearchValue) {
      getSearch(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);

  const handleSelect = (data: string) => {
    window.location.href = `/${data}`;
  };

  return (
    <InputGroup>
      <AutoComplete
        style={{ width: '100%', fontWeight: 600 }}
        size='large'
        onSearch={handleSearch}
        placeholder={
          <div>
            <SearchOutlined />
            <PlaceholderFull>Find account</PlaceholderFull>
            <PlaceholderShort>Find account</PlaceholderShort>
          </div>
        }
        options={options}
        notFoundContent={'No results found'}
        allowClear
        onSelect={handleSelect}
      />
    </InputGroup>
  );
};

export default SearchBar;

const PlaceholderFull = styled.span`
  margin-left: 0.5rem;
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const PlaceholderShort = styled.span`
  margin-left: 0.5rem;
  display: none;
  @media only screen and (max-width: 500px) {
    display: inline;
  }
`;

const InputGroup = styled(Input.Group)`
  padding: 0 2.5rem;
  @media only screen and (max-width: ${ScreenSize.mobile}) {
    padding: 0;
  }
`;
