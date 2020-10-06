import React, { useState, useRef, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import { TextInput, Keyboard, ScrollView } from 'react-native';

import generateID from '@utils/GenerateID';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  ItemCard,
  ItemCardRowHeader,
  ItemCardRow,
  ItemCardColumnWithButtons,
  Label,
  TitleLabel,
  InfoLabel,
  ButtonsItemCard,
  ButtonItemCard,
  ItemInfoButton,
} from './styles';

interface RoomProductsProps {
  navigation: StackNavigationProp<any, any>;
}

interface RouteParams {
  room: Room;
  productId: string;
}

const RoomProducts: React.FC<RoomProductsProps> = ({ navigation }) => {
  const { saveRoom, saveProduct, createProduct } = useBudget();
  const inputRef = useRef<TextInput>(null);
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const { productId, room: routeRoom } = routeParams;

  const [isNewProduct, setIsNewProduct] = useState(!!productId);

  const [room, setRoom] = useState(routeRoom);
  const [product, setProduct] = useState<Product>(() => {
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

  // TODO: add input to pointer to start after blur
  const handleBlur = useCallback(() => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  }, []);

  const handleCreateOrSaveProduct = useCallback(() => {
    isNewProduct
      ? saveProduct({ roomId: room.id, product })
      : createProduct({ roomId: room.id, product });
    saveProduct({ product, roomId: room.id });
  }, [product, room, saveProduct, createProduct, isNewProduct]);

  const handleChangeProductName = useCallback(value => {
    setProduct(oldProduct => ({ ...oldProduct, name: value }));
  }, []);

  const editProduct = useCallback(() => {
    saveProduct({ product, roomId: room.id });
  }, [product, room, saveProduct]);

  const handleCreateItem = useCallback(() => {
    navigation.navigate('CreateItem', {
      roomId: room.id,
      productId: product.id,
    });
  }, [navigation, room.id, product.id]);

  const handleEditItem = useCallback(
    itemId => {
      navigation.navigate('CreateItem', {
        roomId: room.id,
        productId: product.id,
        itemId,
      });
    },
    [navigation, room.id, product.id],
  );

  return (
    <KeyboardDismiss onPress={handleBlur}>
      <Container>
        <>
          <RoomName>{room.name}</RoomName>
          <ProductHeaderWrapper>
            <ProductName
              ref={inputRef}
              onBlur={handleBlur}
              onEndEditing={editProduct}
              selectTextOnFocus
              value={product.name}
              onChangeText={handleChangeProductName}
            />
            <AddItemButton onPress={handleCreateItem}>
              <MaterialIcons name="add" size={32} color="#fff" />
              <AddItemButtonText>Adicionar item</AddItemButtonText>
            </AddItemButton>
          </ProductHeaderWrapper>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {product.items.map(item => (
              <ItemCard key={item.id}>
                <ItemCardRowHeader>
                  <Label>
                    <TitleLabel>Nome</TitleLabel>
                    <InfoLabel numberOfLines={1}>{item.name}</InfoLabel>
                  </Label>
                  <ButtonsItemCard>
                    <ButtonItemCard>
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={42}
                        color="#dd3030"
                      />
                    </ButtonItemCard>
                    <ButtonItemCard>
                      <MaterialCommunityIcons
                        name="content-duplicate"
                        size={42}
                        color="#355C8A"
                      />
                    </ButtonItemCard>
                  </ButtonsItemCard>
                </ItemCardRowHeader>

                <ItemCardRow>
                  <Label>
                    <TitleLabel>Tipo</TitleLabel>
                    <InfoLabel numberOfLines={1}>
                      {item.type.length < 20
                        ? item.type
                        : `${item.type.substring(0, 15)}...`}
                    </InfoLabel>
                  </Label>
                  <Label>
                    <TitleLabel>Medidas</TitleLabel>
                    <InfoLabel
                      numberOfLines={1}
                    >{`${item.measures.width}x${item.measures.length} ${item.measures.unit}`}</InfoLabel>
                  </Label>
                </ItemCardRow>

                <ItemCardRow>
                  <Label>
                    <TitleLabel>Acabamento</TitleLabel>
                    <InfoLabel>MUDAR</InfoLabel>
                  </Label>
                  <Label>
                    <TitleLabel>Quantidade</TitleLabel>
                    <InfoLabel>{item.quantity}</InfoLabel>
                  </Label>
                  <Label>
                    <TitleLabel>Formato</TitleLabel>
                    <InfoLabel>{item.shape}</InfoLabel>
                  </Label>
                </ItemCardRow>

                <ItemCardColumnWithButtons />
                <ItemInfoButton onPress={() => handleEditItem(item.id)}>
                  <Icon name="chevron-right" size={32} color="#fff" />
                </ItemInfoButton>
              </ItemCard>
            ))}
          </ScrollView>
        </>
      </Container>
    </KeyboardDismiss>
  );
};

export default RoomProducts;
