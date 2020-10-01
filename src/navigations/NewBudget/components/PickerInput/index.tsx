import React, { useState, useCallback } from 'react';
import { Picker } from '@react-native-community/picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Modal from '@components/Modal';

import { Container, Title, PickerContainer } from './styles';

interface InputListProps {
  name?: string;
  title: string;
  options: string[];
  handleOnChange(selectedOption: any): void;
}

const PickerInput: React.FC<InputListProps> = ({
  title,
  options,
  handleOnChange,
}) => {
  const [selected, setSelected] = useState(options[0]);

  const handleSelectOption = useCallback(
    selectedOption => {
      handleOnChange(selectedOption);
      setSelected(selectedOption);
    },
    [handleOnChange],
  );

  return (
    <Container>
      <PickerContainer
        prompt={title}
        selectedValue={selected}
        style={{
          fontFamily: 'Roboto-Regular',
          color: '#000',
          fontSize: 88,
        }}
        onValueChange={itemValue => handleSelectOption(itemValue)}
      >
        {options.map(option => (
          <PickerContainer.Item label={option} value={option} key={option} />
        ))}
      </PickerContainer>
    </Container>
  );
};

export default PickerInput;
