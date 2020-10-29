import styled from 'styled-components/native';
import { RectButton, FlatList } from 'react-native-gesture-handler';
import RoomProps from '@dtos/Room';

import { primary500 } from '@styles/theme/colors';

interface Product {
  type: string;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const ModalButtons = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-around;
`;

export const ModalContent = styled.View`
  padding: 40px 20px;
  width: 100%;
  justify-content: center;
`;

export const ModalHeaderWrapper = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 6px;
  font-family: 'Roboto-Regular';
`;

export const ModalInputTextContainer = styled.View`
  height: 60px;
  width: 100%;
  background-color: #7f9cb5;
  border-radius: 5px;

  padding: 0 16px;
  flex-direction: row;
  align-items: center;
`;

export const ModalInputText = styled.TextInput`
  flex: 1;
  font-size: 18px;
  font-family: 'Roboto-Regular';
  color: #fff;
`;

export const HeaderButtons = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 15px 0;
`;

export const HeaderButton = styled(RectButton)`
  padding: 12px 15px;
  height: 50px;
  margin: 0 20px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${primary500};
`;

export const HeaderButtonText = styled.Text`
  margin-left: 5px;
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: #fff;
`;

export const ProductsContainer = styled.View`
  width: 100%;
  flex: 1;
`;

export const RoomList = styled(FlatList as new () => FlatList<RoomProps>)`
  flex: 1;
  height: 100%;
`;

export const Room = styled.View`
  margin: 10px 0;
`;

export const RoomNameWrapper = styled(RectButton)`
  width: 100%;
`;

export const RoomTitleWrapper = styled.View`
  flex-direction: row;
  padding: 0 15px;
`;

export const RoomTitle = styled.Text`
  font-family: 'Heebo-Light';
  font-size: 28px;
  margin-right: 8px;
  color: #000;
`;

export const ProductHorizontalList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const ProductCardContainer = styled(RectButton)`
  width: 180px;
  height: 220px;
  margin: 10px 10px 0;
  padding: 0 12px;
  border-radius: 5px;
  background-color: #efefef;
`;

export const ProductCardHeader = styled.View`
  flex-direction: row;
`;

export const ProductCardTitle = styled.Text`
  margin: 16px 0 6px;
  font-family: 'Roboto-Light';
  font-size: 26px;
`;

export const ProductCardInfo = styled.View`
  flex: 1;
`;

export const ProductCardInfoItem = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 2px 0;
`;

export const ItemTextContainerQuantity = styled.View`
  margin-right: 2px;
  width: 20%;
`;
export const ItemTextContainerName = styled.View`
  margin-right: 5px;
  width: 30%;
`;
export const ItemTextContainerMeasures = styled.View`
  width: 50%;
`;

export const ItemText = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 14px;
`;

export const ProductCardAdd = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ProductCardAddText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 22px;
  color: #747171;
`;
