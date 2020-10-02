import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Product from '@dtos/Product';

interface ProductCardProps {
  width: number;
}

export const Container = styled.View`
  flex: 1;
  padding: 10px;
`;
export const KeyboardDismiss = styled.TouchableWithoutFeedback``;

export const RoomName = styled.Text`
  margin: 18px 0 9px;
  font-size: 28px;
  font-family: 'Heebo-Light';
  color: #000;
`;

export const ProductHeaderWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ProductName = styled.TextInput`
  flex: 1;
  font-size: 26px;
  font-family: 'Heebo-Light';
  color: #000;
`;

export const AddItemButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
  background-color: #487195;
`;

export const AddItemButtonText = styled.Text`
  margin-left: 12px;
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: #fff;
`;

export const ProductCard = styled(RectButton)<ProductCardProps>`
  align-items: center;
  justify-content: center;
  margin: 5px;
  width: ${props => props.width - 15};
  height: 90px;
  background: #7f9cb5;
`;
