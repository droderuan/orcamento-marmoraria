import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ItemInputButtonTextProps {
  isOptionSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fff;
`;

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

export const ItemWithTwoTextInput = styled.TextInput`
  text-align: center;
  margin-right: 0px;
  width: 35%;
  height: 45px;
  font-family: 'Roboto-Medium';
  font-size: 20px;
`;

export const ItemWithTwoTextInputWrapper = styled.View`
  margin-left: 15px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const ItemText = styled.Text`
  margin: 0 2px;
  font-family: 'Roboto-regular';
  font-size: 22px;
  color: #000;
`;

export const UnitButton = styled(RectButton)`
  margin-left: 5px;
  padding: 10px 20px;
`;

export const UnitButtonText = styled.Text`
  font-family: 'Roboto-regular';
  font-size: 22px;
  color: #000;
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

export const ButtonWrapper = styled.View`
  margin-top: 40px;
`;
