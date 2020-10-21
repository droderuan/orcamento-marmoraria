import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { TextInput, Keyboard, ScrollView } from 'react-native';

import generateID from '@utils/GenerateID';

import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '@components/Button';
import Room from '@dtos/Room';
import Product from '@dtos/Product';

import { useNavigation } from '@react-navigation/core';
import { useBudget } from '@hooks/budget';

import {
  Container,
  KeyboardDismiss,
  ProductHeaderWrapper,
  ProductHeaderButtons,
  HeaderButton,
  ProductName,
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

interface RouteParams {
  room: Room;
  productId: string;
}

const RoomProducts: React.FC = () => {
  const { goBack, navigate, setOptions } = useNavigation();
  const {
    deleteProduct,
    saveProduct,
    deleteItem: deleteItemContext,
  } = useBudget();
  const inputRef = useRef<TextInput>(null);
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const { productId, room: routeRoom } = routeParams;

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

  useEffect(() => {
    saveProduct({ product, roomId: room.id });
    setOptions({ headerTitle: room.name });
  });

  // TODO: add input to pointer to start after blur
  const handleBlur = useCallback(() => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  }, []);

  const handleChangeProductName = useCallback(value => {
    setProduct(oldProduct => ({ ...oldProduct, name: value }));
  }, []);

  const editProduct = useCallback(() => {
    saveProduct({ product, roomId: room.id });
  }, [product, room, saveProduct]);

  const handleCreateItem = useCallback(() => {
    navigate('CreateItem', {
      roomId: room.id,
      productId: product.id,
      stoneNumber: product.items.length,
    });
  }, [navigate, room.id, product.id, product.items.length]);

  const handleEditItem = useCallback(
    itemId => {
      navigate('CreateItem', {
        roomId: room.id,
        productId: product.id,
        itemId,
      });
    },
    [navigate, room.id, product.id],
  );

  const deleteItem = useCallback(
    itemId => {
      deleteItemContext({
        roomId: routeRoom.id,
        productId: product.id,
        itemId,
      });
    },
    [deleteItemContext, routeRoom.id, product.id],
  );

  const deleteProductAndGoBack = useCallback(() => {
    deleteProduct({ productId: product.id, roomId: room.id });
    goBack();
  }, [deleteProduct, goBack, product.id, room.id]);

  return (
    <KeyboardDismiss onPress={handleBlur}>
      <Container>
        <>
          <ProductHeaderWrapper>
            <ProductName
              ref={inputRef}
              onBlur={handleBlur}
              onEndEditing={editProduct}
              selectTextOnFocus
              value={product.name}
              onChangeText={handleChangeProductName}
            />
            <ProductHeaderButtons>
              <HeaderButton onPress={() => deleteProductAndGoBack()}>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={42}
                  color="#dd3030"
                />
              </HeaderButton>
              <HeaderButton>
                <MaterialCommunityIcons
                  name="content-duplicate"
                  size={42}
                  color="#355C8A"
                />
              </HeaderButton>
            </ProductHeaderButtons>
          </ProductHeaderWrapper>

          <Button onPress={handleCreateItem} style={{ marginBottom: 5 }}>
            Adicionar item
          </Button>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {product.items.map(item => (
              <ItemCard key={item.id}>
                <ItemCardRowHeader>
                  <Label>
                    <TitleLabel>Nome</TitleLabel>
                    <InfoLabel numberOfLines={1}>{item.name}</InfoLabel>
                  </Label>
                  <ButtonsItemCard>
                    <ButtonItemCard onPress={() => deleteItem(item.id)}>
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
                    <InfoLabel>{item.surfaceFinish}</InfoLabel>
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
