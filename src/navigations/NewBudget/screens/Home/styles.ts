import styled from 'styled-components/native';
import { RectButton, FlatList } from 'react-native-gesture-handler';

interface Product {
  type: string;
}

interface Room {
  type: 'Quarto' | 'Banheiro';
  name: string;
  products: Product[];
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.Modal``;

export const ModalBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.55);
  padding: 20px;
`;

export const ModalButtons = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-around;
`;

export const ModalButton = styled(RectButton)`
  width: 100px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #1e4c75;
`;

export const ModalContent = styled.View`
  padding: 40px 20px;
  justify-content: center;
  background-color: #fff;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 6px;
  font-family: 'Roboto-Regular';
`;

export const ModalInputTextContainer = styled.View`
  height: 45px;
  width: 100%;
  background-color: #7f9cb5;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
`;

export const ModalInputText = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: #fff;
`;

export const HeaderButtons = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 15px 0;
`;

export const HeaderButton = styled.TouchableOpacity`
  padding: 12px 15px;
  height: 50px;
  margin: 0 20px;
  background: #1e4c75;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderButtonText = styled.Text`
  margin-left: 5px;
  font-family: 'Roboto-Regular';
  font-size: 20px;
  color: #fff;
`;

export const ProductsContainer = styled.View`
  flex: 1;
`;

export const ProductsList = styled(FlatList as new () => FlatList<Room>)`
  padding: 0 20px;
  height: 100%;
`;
