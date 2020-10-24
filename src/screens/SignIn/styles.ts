import styled from 'styled-components/native';
import { secondary700 } from '@styles/theme/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 45px;
`;

export const Logo = styled.Image`
  margin-bottom: 28px;
`;

export const ButtonContainer = styled.View`
  margin-top: 20px;
`;

export const ButtonContainerDivider = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 20px 0;
`;

export const Line = styled.View`
  flex: 1;
  height: 2px;
  background-color: ${secondary700};
`;

export const ButtonContainerDividerText = styled.Text`
  margin: 0 10px;
  font-family: 'Roboto-Light';
  font-size: 18px;
`;
