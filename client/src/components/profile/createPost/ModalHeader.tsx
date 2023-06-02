import React from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface ModalHeaderProps {
  handleCloseModal: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = (props) => {
  return (
    <Box>
      <Icon onClick={props.handleCloseModal} />
      <Title>Craete Post</Title>
      <Paragraph>{''}</Paragraph>
    </Box>
  );
};

export default ModalHeader;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e8e8e8;
`;

const Icon = styled(ArrowLeftOutlined)`
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  margin: 0;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;
