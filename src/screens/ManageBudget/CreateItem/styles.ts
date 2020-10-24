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
  width: 40%;
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

export const SelectFinishingContainer = styled.View`
  width: 100%;
  height: 180px;
  margin: 10px 0;
  padding: 10px 38px;
`;

export const SelectFinishingBackground = styled.ImageBackground`
  flex: 1;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #9f9f9f;
`;

export const EdgeFinishingButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

export const MiddleFinishingButtonWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const FinishingSelectButton = styled(RectButton)<FinishingButtonProps>`
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 19px;
  align-items: center;
  justify-content: center;
  ${props =>
    props.isSelected
      ? `background-color: ${primary900}`
      : `background-color: ${primary100}`};
  border-width: 1px;
  border-color: ${primary900};
`;

export const ButtonText = styled.Text<FinishingButtonProps>`
  font-family: 'Heebo-Light';
  font-size: 18px;
  ${props => (props.isSelected ? `color: #fff` : `color: #000`)};
`;

export const FinishingSelectType = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const FinishingNumber = styled.Text`
  margin-left: 38px;
  font-family: 'Heebo-Light';
  font-size: 28px;
  color: #000;
`;
