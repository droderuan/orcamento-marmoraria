import styled from 'styled-components/native';
import { primary50, secondary700 } from '@styles/theme/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 45px;
`;

export const Title = styled.Text`
  font-family: 'Heebo-Regular';
  font-size: 32px;
  color: ${secondary700};
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
  background-color: ${primary50};
`;

export const ButtonContainerDividerText = styled.Text`
  margin: 0 10px;
  font-family: 'Roboto-Light';
  font-size: 18px;
`;
