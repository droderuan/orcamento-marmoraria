import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const ScrollView = styled.ScrollView`
  width: 100%;
`;

export const ButtonAdressWrapper = styled.View`
  flex: 1;
  margin-top: 10px;
  align-items: center;
`;

export const AddressInfoContainer = styled(RectButton)`
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 10px;
`;

export const AddressFirstLine = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 22px;
`;

export const AddressSecondLine = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 18px;
`;
