import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 45px;
`;

export const Logo = styled.Image`
  margin-bottom: 28px;
`;

export const SignInButton = styled(RectButton)`
  height: 55px;
  justify-content: center;
  align-items: center;
  margin-top: 45px;

  background-color: #324f68;
`;

export const SignInButtonText = styled.Text`
  font-size: 24px;
  font-family: 'Roboto-Regular';
  color: #fff;
`;
