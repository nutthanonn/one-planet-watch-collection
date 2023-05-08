import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';

type MenuItem = Required<MenuProps>['items'][number];

interface BrandSidebarProps {
  modelList: string[];
  onSelect: (model: string) => void;
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const BrandSidebar: React.FC<BrandSidebarProps> = (props) => {
  const { modelList, onSelect } = props;

  const items: MenuProps['items'] = [
    getItem('Model Menu', 'sub1', <MenuOutlined />, [
      getItem(
        'Model',
        'g1',
        null,
        modelList.map((model) => getItem(model, model)),
        'group',
      ),
    ]),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    onSelect(e.key.toString());
  };

  return (
    <MenuCustom
      onClick={onClick}
      style={{ width: 300 }}
      defaultSelectedKeys={['ALL']}
      defaultOpenKeys={['sub1']}
      mode='inline'
      items={items}
    />
  );
};

export default BrandSidebar;

const MenuCustom = styled(Menu)`
  height: 72vh;
  overflow-y: scroll;
`;
