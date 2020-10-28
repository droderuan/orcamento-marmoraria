import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { primary900, primary100 } from '@styles/theme/colors';

interface FinishingButtonProps {
  isSelected: boolean;
}

export const SelectFinishingContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  border-radius: 90px;
`;

export const SelectFinishingBackground = styled.ImageBackground`
  width: 180px;
  height: 180px;
  justify-content: space-between;
  border-radius: 90px;

  background-color: #9f9f9f;
`;

export const EdgeFinishingButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
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
