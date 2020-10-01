import React, { useState, useCallback } from 'react';
import { ModalProps } from 'react-native';

import Modal from '../Modal';

import {
  Container,
  ListPickerContainer,
  ListPickerContent,
  ListOptionItemButton,
  ListOptionItem,
  ListOptionItemText,
  ItemBottomLine,
} from './styles';

interface ListPickerModalProps extends ModalProps {
  name?: string;
  options: string[];
  handleOnChange(selectedOption: string): void;
  handleCloseModal(): void;
  visible: boolean;
}

const ListPickerModal: React.FC<ListPickerModalProps> = ({
  options,
  handleOnChange,
  handleCloseModal,
  visible,
  ...restModalProps
}) => {
  const [selected, setSelected] = useState('');

  const handleSelectOption = useCallback(
    selectedOption => {
      handleOnChange(selectedOption);
      setSelected(selectedOption);
      handleCloseModal();
    },
    [handleCloseModal, handleOnChange],
  );

  return (
    <Modal visible={visible} closeModal={handleCloseModal} {...restModalProps}>
      <Container>
        <ListPickerContainer>
          {options.map((option, index) => (
            <ListOptionItemButton
              key={option}
              onPress={() => handleSelectOption(option)}
            >
              <>
                <ListOptionItem selected={selected === option}>
                  <ListOptionItemText>{option}</ListOptionItemText>
                </ListOptionItem>
                {index !== options.length - 1 && <ItemBottomLine />}
              </>
            </ListOptionItemButton>
          ))}
        </ListPickerContainer>
      </Container>
    </Modal>
  );
};

export default ListPickerModal;
