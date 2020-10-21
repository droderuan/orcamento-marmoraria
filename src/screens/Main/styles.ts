import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface SelectedNavButtonProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 55px;
  padding: 0 16px;
  background-color: #487195;
`;

export const DrawerMenuButton = styled.TouchableOpacity``;

export const SearchArea = styled.View`
  height: 32px;
  width: 240px;
  background-color: #fff;
  flex-direction: row;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 32px;
  padding: 5px;
  font-size: 14px;
  font-family: 'Roboto-Regular';
  color: #000;
`;

export const SearchButton = styled(RectButton)`
  height: 32px;
  width: 32px;
  justify-content: center;
  align-items: center;
  background-color: #7f9cb5;
`;

export const NavButtons = styled.View`
  flex-direction: row;
`;

export const NavButton = styled(RectButton)<SelectedNavButtonProps>`
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50px;
  background: ${props => (props.isSelected ? '#1E4C75' : '#EFEFEF')};
`;

export const ButtonText = styled.Text<SelectedNavButtonProps>`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  color: ${props => (props.isSelected ? '#fff' : '#000')};
`;

export const BudgetContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 10px;
  background-color: #fff;
`;

export const ButtonContainer = styled.View`
  padding: 10px 45px 20px;
  margin-top: 20px;
`;

export const ManageBudgetButton = styled(RectButton)`
  width: 100%;
  padding: 15px 45px;
  background-color: #324f68;
  align-items: center;
  justify-content: center;
`;

export const ManageBudgetButtonText = styled.Text`
  font-family: 'Roboto-Regular';
  color: #fff;
  font-size: 24px;
`;
