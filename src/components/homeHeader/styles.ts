import styled from 'styled-components/native';
import { primary500 } from '@styles/theme/colors';

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 55px;
  padding: 0 16px;
  background-color: ${primary500};
`;

export const DrawerMenuButton = styled.TouchableOpacity``;
