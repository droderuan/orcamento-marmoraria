import React, { useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Modal from '@components/Modal';

import { Container, Title, PickerContainer } from './styles';

interface InputListProps {
  name?: string;
  title: string;
  sinkAttribute: string;
  options?: string[];
  handleOnChange(selectedOption: any): void;
}

const PickerInput: React.FC<InputListProps> = ({
  title,
  sinkAttribute,
  handleOnChange,
}) => {
  const handleSelectOption = useCallback(
    selectedOption => {
      handleOnChange({ [sinkAttribute]: selectedOption });
    },
    [handleOnChange, sinkAttribute],
  );

  return (
    <Container>
      <Title>{title}</Title>
      <PickerContainer
        prompt="Escolha o formato"
        selectedValue={1}
        onValueChange={itemValue => handleSelectOption(itemValue)}
      >
        <PickerContainer.Item label="teste" value="teste" />
        <PickerContainer.Item label="node" value="node" />
        <PickerContainer.Item label="java" value="java" />
      </PickerContainer>
    </Container>
  );
};

export default PickerInput;
