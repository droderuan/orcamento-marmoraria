import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  justify-content: center;
  align-items: center;
  padding: 15px 45px;

  background-color: #324f68;
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  font-family: 'Roboto-Regular';
  color: #fff;
`;
