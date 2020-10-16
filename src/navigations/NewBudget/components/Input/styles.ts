import styled from 'styled-components/native';
import { primary200 } from '@styles/theme/colors';

export const ItemInput = styled.View`
  margin-top: 12px;
  width: 100%;
`;

export const ItemInputLabel = styled.Text`
  margin-left: 15px;
  font-family: 'Roboto-regular';
  font-size: 16px;
  color: #000;
`;

export const ItemTextInput = styled.TextInput`
  height: 45px;
  margin-left: 15px;
  font-family: 'Roboto-Regular';
  font-size: 20px;
`;

export const ItemBottomLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${primary200};
`;
