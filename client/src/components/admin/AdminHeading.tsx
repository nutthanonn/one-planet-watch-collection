import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import useAllWatch from '@hooks/useAllWatch';
import styled from 'styled-components';
import { Model } from '@api/GetAllWatch';
import AdminTable from './AdminTable';

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

interface OptionsType {
  value: string;
  label: string;
}

const AdminHeading: React.FC = () => {
  const { allWatch } = useAllWatch();
  const [watchData, setWatchData] = useState<DataType[]>([]);
  const [searchValue, setSearchValue] = useState<OptionsType[]>([]);

  function createDataType(watch: Model): DataType {
    return {
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
      <AdminTable watchData={watchData} />
    </Box>
  );
};

export default AdminHeading;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Inline = styled.div`
  display: flex;
  gap: 2rem;
`;
