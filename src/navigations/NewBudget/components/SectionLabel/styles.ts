import styled from 'styled-components/native';
import { primary700 } from '@styles/theme/colors';

export const Container = styled.View`
  width: 100%;
`;

export const SectionContainer = styled.View`
  justify-content: center;
  width: 100%;
  height: 40px;
  padding-left: 10px;
  background-color: ${primary700};
`;

export const SectionTitle = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 18px;
  color: #fff;
`;

export const SectionContent = styled.View``;
