import React from 'react';
import { TextInputProps } from 'react-native';

import {
  ItemInput,
  ItemInputLabel,
  ItemTextInput,
  ItemBottomLine,
} from './styles';

interface InputProps extends TextInputProps {
  label: string;
  persistTextInput?: boolean;
}

const Input: React.FC<InputProps> = ({ label, children, ...restProps }) => {
  return (
    <ItemInput>
      <ItemInputLabel>{label}</ItemInputLabel>
      {children || <ItemTextInput {...restProps} />}
      <ItemBottomLine />
    </ItemInput>
  );
};

export default Input;
