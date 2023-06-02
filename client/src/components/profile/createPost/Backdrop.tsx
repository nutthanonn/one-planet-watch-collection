import React from 'react';
import styled from 'styled-components';

interface ModalBodyProps {
  handleCloseModal: () => void;
  children: React.ReactNode;
}

const Backdrop: React.FC<ModalBodyProps> = (props) => {
  const { handleCloseModal, children } = props;

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return <BackDrop onClick={handleClick}>{children}</BackDrop>;
};

export default Backdrop;

const BackDrop = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
