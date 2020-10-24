import styled from 'styled-components/native';
import { primary300 } from '@styles/theme/colors';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 18px;
`;

export const InputLabel = styled.Text`
  font-size: 18px;
  margin-bottom: 6px;
  font-family: 'Heebo-Light';
`;

export const InputContainer = styled.View`
  height: 45px;
  width: 100%;
  background-color: ${primary300};
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: #fff;
`;
