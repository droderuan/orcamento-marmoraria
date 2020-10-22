import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface AddressProps {
  isDelivery: boolean;
}

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

export const AddressInfoContainer = styled(RectButton)<AddressProps>`
  justify-content: center;
  width: 100%;
  padding: 12px 10px 0;
`;

export const AddressFirstLine = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 22px;
`;

export const AddressSecondLine = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 18px;
`;

export const DeliveryAddressText = styled.Text`
  margin-bottom: 10px;
  font-family: 'Roboto-Light';
  font-size: 16px;
`;
