import React from 'react';
import { ModalBaseProps, TouchableWithoutFeedback } from 'react-native';
import {
  Container,
  CloseModalTouchable,
  ModalBackground,
  ModalContent,
} from './styles';

interface ModalProps extends ModalBaseProps {
  closeModal?: () => void;
  visible: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  closeModal,
  visible,
  ...restProps
}) => {
  return (
    <Container visible={visible} onRequestClose={closeModal} {...restProps}>
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
