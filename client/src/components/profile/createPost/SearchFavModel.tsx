import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { ScreenSize } from '@common/ScreenSize';
import useDebounce from '@hooks/useDebounce';
import { AutoComplete, Input, SelectProps } from 'antd';
import styled from 'styled-components';
import useFavoriteWatch from '@hooks/useFavoriteWatch';
import { MyProfileImpl } from '@store/MyProfileStore';
import { observer } from 'mobx-react';
import SearchItem from '../SearchItem';
import { Collection } from '@interfaces/WatchApi';

interface SearchFavModelProps {
  store: MyProfileImpl;
  AddPost: (watch: Collection) => void;
  selectFavoriteList: Collection[];
}

const SearchFavModel: React.FC<SearchFavModelProps> = observer((props) => {
  const { store } = props;
  const { watchData } = useFavoriteWatch(store.favorite_list);

  const [searchValue, setSearchValue] = useState<string>('');
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const handleSetOptions = (item: Collection[]) => {
    if (item !== undefined) {
      setOptions(
        item.map((item) => {
          return {
            value: item.id,
            label: <SearchItem {...item} />,
          };
        }),
      );
    }
  };

  useEffect(() => {
    if (watchData) {
      handleSetOptions(watchData);
    }

    const selected_id = props.selectFavoriteList.map((item) => item.id);

    const filtered = watchData?.filter((item) => {
      return !selected_id.includes(item.id);
    });

    handleSetOptions(filtered);
  }, [watchData, props.selectFavoriteList]);

  useEffect(() => {
    if (debouncedSearchValue) {
      const filtered = watchData.filter((item) => {
        return item.name.toLowerCase().includes(debouncedSearchValue.toLowerCase());
      });

      handleSetOptions(filtered);
    } else {
      setOptions([]);
    }
  }, [debouncedSearchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSelect = (data: string) => {
    props.AddPost(watchData.filter((item) => item.id === data)[0]);
    setOptions(options?.filter((item) => item.value !== data));
    setSearchValue('');
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
            <PlaceholderFull>Search favorite model</PlaceholderFull>
            <PlaceholderShort>Search favorite model</PlaceholderShort>
          </div>
        }
        options={options}
        notFoundContent={'No results found'}
        allowClear
        bordered={false}
        onSelect={handleSelect}
        value={searchValue}
      />
    </InputGroup>
  );
});

export default SearchFavModel;

const PlaceholderFull = styled.span`
  font-weight: 400;
  margin-left: 0.5rem;
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const PlaceholderShort = styled.span`
  font-weight: 400;
  margin-left: 0.5rem;
  display: none;
  @media only screen and (max-width: 500px) {
    display: inline;
  }
`;

const InputGroup = styled(Input.Group)`
  @media only screen and (max-width: ${ScreenSize.mobile}) {
    padding: 0;
  }
`;
