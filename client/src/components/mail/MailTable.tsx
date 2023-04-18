import React, { useEffect, useState } from 'react';
import { Table, Tag, Image, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BRAND_COLOR_MAP } from '@common/BrandColorMap';
import { UserRequestData } from '@api/GetUserRequest';
import styled from 'styled-components';
import ManageItem from './ManageItem';

interface DataType {
  key: React.Key;
  image: string;
  model: string;
  name: string;
  description: string;
  tags: string;
}

interface MailTableProps {
  data?: UserRequestData[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Model',
    dataIndex: 'image',
    key: 'image',
    render: (text) => <Image src={text} alt='watch' draggable={false} width={40} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
      <Tag color={BRAND_COLOR_MAP[tag as keyof typeof BRAND_COLOR_MAP]}>{tag.toUpperCase()}</Tag>
    ),
  },
  {
    title: 'Manage',
    key: 'manage',
    render: (text) => <ManageItem id={text.key} />,
  },
];

const MailTable: React.FC<MailTableProps> = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const newData = props.data?.map((item) => {
      return {
        key: item.id,
        image: item.image,
        name: item.name,
        description: item.description,
        tags: item.brand,
      };
    });

    setData(newData as DataType[]);
  }, [props]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <span style={{ marginBottom: 8 }}>
          {hasSelected ? (
            <Box>
              Selected {selectedRowKeys.length} items
              <Button type='dashed' danger>
                READ ALL
              </Button>
            </Box>
          ) : (
            ''
          )}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default MailTable;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
