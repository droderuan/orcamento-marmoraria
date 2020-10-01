import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TextInput, Keyboard } from 'react-native';

import generateID from '@utils/GenerateID';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Room from '@dtos/Room';
import Product from '@dtos/Product';

import { StackNavigationProp } from '@react-navigation/stack';
import { useBudget } from '../../hooks/budget';

import {
  Container,
  KeyboardDismiss,
  RoomName,
  ProductHeaderWrapper,
  ProductName,
  AddItemButton,
  AddItemButtonText,
} from './styles';

interface RoomProductsProps {
  navigation: StackNavigationProp<any, any>;
}

interface RouteParams {
  room: Room;
  productId: string;
}

const RoomProducts: React.FC<RoomProductsProps> = ({ navigation }) => {
  const { saveRoom } = useBudget();
  const inputRef = useRef<TextInput>(null);
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [room, setRoom] = useState(routeParams.room);
  const [product, setProduct] = useState<Product>(() => {
    const { productId } = routeParams;
    if (productId) {
      const findProduct = room.products.find(item => item.id === productId);
      if (findProduct) {
        return findProduct;
      }
    }
    return {
      name: 'Novo Produto',
      items: [],
      id: generateID(),
    };
  });

  // TODO: add input pointer to start after blur
  const handleBlur = useCallback(() => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  }, []);

  const editProduct = useCallback(() => {
    const productToUpdate = room.products.findIndex(
      item => item.id === product.id,
    );
    let toUpdateRoom = room.products[productToUpdate];
    toUpdateRoom = product;
    room.products[productToUpdate] = toUpdateRoom;

    saveRoom(room);
  }, [product, room, saveRoom]);

  const handleChangeProductName = useCallback(value => {
    setProduct(oldProduct => ({ ...oldProduct, name: value }));
  }, []);

  const handleCreateItem = useCallback(() => {
    navigation.navigate('CreateItem', {
      roomId: room.id,
      productId: product.id,
    });
  }, [navigation, room.id, product.id]);

  return (
    <KeyboardDismiss onPress={handleBlur}>
      <Container>
        <>
          <RoomName>{room.name}</RoomName>
          <ProductHeaderWrapper>
            <ProductName
              ref={inputRef}
              onEndEditing={editProduct}
              onBlur={handleBlur}
              selectTextOnFocus
              value={product.name}
              onChangeText={handleChangeProductName}
            />
            <AddItemButton onPress={handleCreateItem}>
              <MaterialIcons name="add" size={32} color="#fff" />
              <AddItemButtonText>Adicionar item</AddItemButtonText>
            </AddItemButton>
          </ProductHeaderWrapper>
        </>
      </Container>
    </KeyboardDismiss>
  );
};

export default RoomProducts;
