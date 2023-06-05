import { BRAND_COLOR_MAP } from '@common/BrandColorMap';
import { Image, Table, Tag } from 'antd';
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import ManageButton from './ManageButton';
export interface DataType {
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
      <Tag color={BRAND_COLOR_MAP[tag as keyof typeof BRAND_COLOR_MAP]}>{tag.toUpperCase()}</Tag>
    ),
  },
  {
    title: 'Manage',
    key: 'manage',
    render: (text) => <ManageButton data={text} />,
  },
];

interface AdminModelProps {
  watchData: DataType[];
}

const AdminTable: React.FC<AdminModelProps> = (props) => {
  return <Table columns={columns} dataSource={props.watchData} />;
};

export default AdminTable;
