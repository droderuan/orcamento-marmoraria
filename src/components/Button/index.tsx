import React from 'react';

import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: Element | string;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Container
      {...props}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,

        elevation: 4,
      }}
    >
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
