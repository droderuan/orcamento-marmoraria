import React from 'react';
import { ModalBaseProps } from 'react-native';
import { Container, ModalBackground, ModalContent } from './styles';

const Modal: React.FC<ModalBaseProps> = ({ children, ...restProps }) => {
  return (
    <Container {...restProps}>
      <ModalBackground>
        <ModalContent>{children}</ModalContent>
      </ModalBackground>
    </Container>
  );
};

export default Modal;
