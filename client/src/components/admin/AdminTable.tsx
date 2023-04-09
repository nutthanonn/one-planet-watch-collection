import React, { useEffect, useState } from 'react';
import { Table, Tag, Image, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useAllWatch from '@hooks/useAllWatch';
import { BRAND_COLOR_MAP } from '@common/BrandColorMap';
import styled from 'styled-components';
import { Model } from '@api/GetAllWatch';
import ConfirmDelete from './ConfirmDelete';

interface DataType {
  key: string;
  image: string;
  model: string;
  name: {
    href: string;
    title: string;
  };
  description: string;
  tags: string;
  action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '',
    dataIndex: 'image',
    key: 'image',
    render: (text) => <Image src={text} alt='watch' draggable={false} width={40} />,
  },
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
    // render
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href={`/model/${text.href}`}>{text.title}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tag) => (
      //color={BRAND_COLOR_MAP[props.brand as keyof typeof BRAND_COLOR_MAP]}
      <Tag color={BRAND_COLOR_MAP[tag as keyof typeof BRAND_COLOR_MAP]}>{tag.toUpperCase()}</Tag>
    ),
  },
  {
    title: 'Manage',
    key: 'manage',
    render: (text) => <ConfirmDelete id={text.key} />,
  },
];

interface OptionsType {
  value: string;
  label: string;
}

const AdminTable: React.FC = () => {
  const { allWatch } = useAllWatch();
  const [watchData, setWatchData] = useState<DataType[]>([]);
  const [searchValue, setSearchValue] = useState<OptionsType[]>([]);

  function createDataType(watch: Model): DataType {
    const data: DataType = {
      image: watch.image,
      key: watch.id,
      model: watch.model,
      name: {
        href: watch.id,
        title: watch.name,
      },
      description: watch.description,
      tags: watch.brand,
      action: watch.id,
    };
    return data;
  }

  useEffect(() => {
    allWatch.map((watch) => {
      const data = createDataType(watch);
      setWatchData((prevState) => [...prevState, data]);
    });
  }, [allWatch]);

  const handleChange = (value: string) => {
    const filterWatch = allWatch.filter((watch) => watch.brand === value);
    setWatchData(
      filterWatch.map((watch) => {
        const data = createDataType(watch);
        return data;
      }),
    );

    const options = filterWatch.map((watch) => {
      const data: OptionsType = {
        value: watch.id,
        label: watch.name + ' ' + watch.description,
      };
      return data;
    });

    setSearchValue(options);
  };

  const handleChangeSearchValue = (value: string) => {
    const filterWatch = allWatch.filter((watch) => watch.id === value);
    setWatchData(
      filterWatch.map((watch) => {
        const data = createDataType(watch);
        return data;
      }),
    );
  };

  return (
    <Box>
      <Inline>
        <Select
          placeholder='Select brand'
          style={{ width: 200 }}
          onChange={handleChange}
          options={[
            { value: 'ROLEX', label: 'Rolex' },
            { value: 'RICHARD MILLE', label: 'Richard Mille' },
            { value: 'PATEK PHILIPPE', label: 'Patek Philippe' },
            { value: 'DANIEL WELLINGTON', label: 'Danial Wellington' },
          ]}
        />
        <Select
          showSearch
          style={{ width: 400 }}
          placeholder='Search to Select'
          optionFilterProp='children'
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={searchValue}
          onChange={handleChangeSearchValue}
        />
      </Inline>
      <Table columns={columns} dataSource={watchData} />
    </Box>
  );
};

export default AdminTable;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Inline = styled.div`
  display: flex;
  gap: 2rem;
`;
