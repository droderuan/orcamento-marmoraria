import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { primary500 } from '@styles/theme/colors';

export const Container = styled(RectButton)`
  justify-content: center;
  align-items: center;
  padding: 15px 45px;
  border-radius: 5px;

  background-color: ${primary500};
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  font-family: 'Roboto-Regular';
  color: #fff;
`;
