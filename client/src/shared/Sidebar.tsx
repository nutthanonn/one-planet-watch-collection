import React from 'react';
import { Drawer } from 'antd';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <>
      <Drawer title='Basic Drawer' placement='right' onClose={props.onClose} open={props.open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Sidebar;
