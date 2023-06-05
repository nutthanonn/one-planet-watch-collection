import React from 'react';
import styled from 'styled-components';
import DeleteModelButton from './DeleteModelButton';
import UpdateModelButton from './UpdateModelButton';
import { DataType } from './AdminTable';

interface ManageButtonProps {
  data: DataType;
}

const ManageButton: React.FC<ManageButtonProps> = (props) => {
  return (
    <>
      <Inline>
        <DeleteModelButton id={props.data.key} />
        <UpdateModelButton data={props.data} />
      </Inline>
    </>
  );
};

export default ManageButton;

const Inline = styled.div`
  display: flex;
  gap: 0.5rem;
`;
