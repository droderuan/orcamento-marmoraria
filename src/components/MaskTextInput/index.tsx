import React from 'react';
import { TextInputMaskProps } from 'react-native-text-input-mask';

import { MaskTextInput as MaskInput } from './styles';

const MaskTextInput: React.FC<TextInputMaskProps> = ({ ...props }) => {
  return <MaskInput {...props} />;
};

export default MaskTextInput;
