import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { primary900, primary500, primary100 } from '@styles/theme/colors';

interface ItemInputButtonTextProps {
  isOptionSelected: boolean;
}

interface FinishingButtonProps {
  isSelected: boolean;
}

export const Container = styled.View`
  background-color: #fff;
`;

export const Content = styled.View`
  align-items: center;
  padding-bottom: 20px;
`;

export const ItemInput = styled.View`
  margin-top: 12px;
  width: 100%;
`;

export const ItemWithTwoTextInputWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const UnitButton = styled(RectButton)`
  margin-top: -10px;
  margin-left: 5px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  height: 40px;
  border-radius: 5px;
  background-color: ${primary500};
`;

export const UnitButtonText = styled.Text`
  margin-bottom: 5px;
  font-family: 'Roboto-regular';
  font-size: 22px;
  color: #fff;
`;

export const ItemInputButton = styled.TouchableWithoutFeedback``;

export const ItemInputButtonWrapper = styled.View`
  height: 45px;
  justify-content: center;
`;

export const ItemInputButtonText = styled.Text<ItemInputButtonTextProps>`
  margin-left: 15px;
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: ${props => (props.isOptionSelected ? '#000' : '#a0a0a0')};
`;

export const ItemBottomLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: #487195;
`;

export const RadioButtomItem = styled.View`
  width: 100%;
  margin-top: 5px;
`;

export const ButtonWrapper = styled.View`
  margin-top: 40px;
`;

export const TextAreaContainer = styled.View`
  justify-content: flex-start;
`;

export const TextArea = styled.TextInput`
  height: 200px;
  margin: 12px 10px 5px;
  border-width: 1px;
  border-radius: 10px;
  padding: 1px 5px 1px;
  text-align: left;
  border-color: ${primary500};
  font-family: 'Roboto-regular';
  font-size: 18px;
  color: #000;
`;
