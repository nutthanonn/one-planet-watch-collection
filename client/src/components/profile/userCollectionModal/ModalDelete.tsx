import React from 'react';
import styled from 'styled-components';
import Backdrop from '../createPost/Backdrop';

interface ModalDeleteProps {
  handleCloseModal: () => void;
  onDelete: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = (props) => {
  return (
    <Backdrop handleCloseModal={props.handleCloseModal}>
      <Center>
        <Box>
          <Heading>Are you sure you want to delete this post?</Heading>
          <Grid>
            <Button style={{ color: 'black' }} onClick={props.handleCloseModal}>
              Cancle
            </Button>
            <Button style={{ color: 'red' }} onClick={props.onDelete}>
              Delete
            </Button>
          </Grid>
        </Box>
      </Center>
    </Backdrop>
  );
};

export default ModalDelete;

const Center = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Box = styled.div`
  width: 25rem;
  height: 7rem;
  background-color: white;
  border-radius: 1rem;
`;

const Heading = styled.div`
  font-size: 1rem;
  font-weight: 600;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.5rem;
  margin: 1rem;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
