import React, { useRef, useEffect } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, InputLabel, InputContainer, TextInput } from './styles';

interface InputValueReference {
  value: string;
}

interface InputProps extends TextInputProps {
  name: string;
  displayName: string;
  containerStyle?: {};
}

const Input: React.FC<InputProps> = ({
  name,
  displayName,
  containerStyle,
  ...restProps
}) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputElementRef = useRef<any>(null);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(refe: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle}>
      <InputLabel>{displayName}</InputLabel>
      <InputContainer>
        <TextInput
          ref={inputElementRef}
          keyboardAppearance="default"
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          {...restProps}
        />
      </InputContainer>
    </Container>
  );
};

export default Input;
