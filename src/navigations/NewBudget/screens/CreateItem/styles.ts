import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { secondary400 } from '@styles/theme/colors';

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

export const ItemWithTwoTextInputWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const ItemWithTwoTextInput = styled.TextInput`
  text-align: center;
  margin-right: 0px;
  width: 130px;
  height: 45px;
  font-family: 'Roboto-Medium';
  font-size: 20px;
`;

export const ItemText = styled.Text`
  margin: 0 2px 5px;
  font-family: 'Roboto-regular';
  font-size: 22px;
  color: #000;
`;

export const UnitButton = styled(RectButton)`
  margin-top: -10px;
  margin-left: 5px;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: ${secondary400};
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

export const ButtonWrapper = styled.View`
  margin-top: 40px;
`;

export const FinishingSelectWrapper = styled.View`
  margin: 15px 0;
  align-items: center;
  justify-content: center;
`;

export const FinishingSelect = styled.ImageBackground`
  height: 120px;
  width: 280px;
  background-color: #9f9f9f;
`;
