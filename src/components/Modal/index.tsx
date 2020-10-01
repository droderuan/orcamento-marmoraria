import React from 'react';
import { ModalBaseProps, TouchableWithoutFeedback } from 'react-native';
import {
  Container,
  CloseModalTouchable,
  ModalBackground,
  ModalContent,
} from './styles';

interface ModalProps extends ModalBaseProps {
  closeModal(): void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  closeModal,
  ...restProps
}) => {
  return (
    <Container {...restProps}>
      <CloseModalTouchable onPress={closeModal}>
        <ModalBackground>
          <TouchableWithoutFeedback>
            <ModalContent>{children}</ModalContent>
          </TouchableWithoutFeedback>
        </ModalBackground>
      </CloseModalTouchable>
    </Container>
  );
};

export default Modal;
