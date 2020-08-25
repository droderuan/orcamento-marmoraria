import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface SelectedNavButtonProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
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
  padding: 18px 10px;
  background-color: #e4e4e4;
`;

export const ButtonContainer = styled.View`
  padding: 40px 45px;
  margin-top: 20px;
`;

export const NewBudgetButton = styled(RectButton)`
  width: 100%;
  padding: 15px 45px;
  background-color: #324f68;
  align-items: center;
  justify-content: center;
`;

export const NewBudgetButtonText = styled.Text`
  font-family: 'Roboto-Regular';
  color: #fff;
  font-size: 24px;
`;
