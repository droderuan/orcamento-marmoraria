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
  background-color: #fff;
`;
export const KeyboardDismiss = styled.TouchableWithoutFeedback``;

export const RoomName = styled.Text`
  margin: 18px 0 9px;
  font-size: 28px;
  font-family: 'Heebo-Light';
  color: #000;
`;

export const ProductHeaderWrapper = styled.View`
  margin-bottom: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProductHeaderButtons = styled.View`
  flex-direction: row;
`;

export const HeaderButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  margin: 10px 15px;
`;

export const ProductName = styled.TextInput`
  flex: 1;

  font-size: 32px;
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

export const ItemCard = styled.View`
  width: 100%;
  margin: 10px 0;
  justify-content: space-between;
  background-color: #efefef;
`;

export const ItemCardRowHeader = styled.View`
  padding: 5px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ItemCardRow = styled.View`
  padding: 5px;
  width: 100%;
  flex-direction: row;
`;

export const ItemCardColumnWithButtons = styled.View`
  padding: 5px;
  justify-content: space-between;
`;

export const Label = styled.View`
  margin: 0 5px 5px;
  width: 30%;
`;

export const TitleLabel = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 16px;
  color: #595959;
`;

export const InfoLabel = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: #000;
`;

export const ButtonsItemCard = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
`;

export const ButtonItemCard = styled(RectButton)`
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  margin: 5px;
`;

export const ItemInfoButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding-right: 2px;
  background: #7f9cb5;
`;
