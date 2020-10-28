import React, { useState, useCallback, useRef } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { red, green } from '@styles/theme/colors';
import RoomProps from '@dtos/Room';
import Modal from '@components/Modal';

import GenerateID from '@utils/GenerateID';
import Product from '@dtos/Product';
import { useBudget } from '@hooks/budget';

import {
  Container,
  HeaderButtons,
  HeaderButton,
  HeaderButtonText,
  ModalContent,
  ModalButtons,
  ModalHeaderWrapper,
  ModalTitle,
  ModalInputTextContainer,
  ModalInputText,
  ProductsContainer,
  RoomList,
  Room,
  RoomNameWrapper,
  RoomTitleWrapper,
  RoomTitle,
  ProductHorizontalList,
  ProductCardContainer,
  ProductCardHeader,
  ProductCardTitle,
  ProductCardInfo,
  ProductCardInfoItem,
  ItemTextContainerQuantity,
  ItemTextContainerName,
  ItemTextContainerMeasures,
  ItemText,
  ProductCardAdd,
  ProductCardAddText,
} from './styles';

interface EditRoomDTO {
  room: RoomProps;
  index: number;
}

const BudgetProductList: React.FC = () => {
  const {
    budget,
    createRoom,
    saveRoom,
    deleteRoom,
    createProduct,
  } = useBudget();
  const { navigate } = useNavigation();
  const [writedRoomName, setwritedRoomName] = useState('');
  const [editRoom, setEditRoom] = useState<RoomProps>({} as RoomProps);

  const [addRoomModalVisible, setAddRoomModalVisible] = useState(false);
  const [editRoomModalVisible, setEditRoomModalVisible] = useState(false);

  const modalInputRef = useRef<TextInput>(null);

  const openAddRoomModal = useCallback(() => {
    setAddRoomModalVisible(true);
    setTimeout(() => modalInputRef.current?.focus(), 250);
  }, []);

  const closeAddRoomModal = useCallback(
    () => setAddRoomModalVisible(false),
    [],
  );

  const addRoom = useCallback(() => {
    if (writedRoomName !== '') {
      createRoom({
        name: writedRoomName,
      });

      setwritedRoomName('');

      closeAddRoomModal();
    }
  }, [closeAddRoomModal, writedRoomName, createRoom]);

  const openEditRoomModal = useCallback(({ room }: EditRoomDTO) => {
    setEditRoomModalVisible(true);
    setEditRoom(room);
  }, []);

  const closeEditRoomModal = useCallback(() => {
    setEditRoomModalVisible(false);
    setEditRoom({} as RoomProps);
  }, []);

  const handleEditRoom = useCallback(() => {
    saveRoom(editRoom);
    closeEditRoomModal();
    setEditRoom({} as RoomProps);
  }, [saveRoom, closeEditRoomModal, editRoom]);

  const handleDeleteRoom = useCallback(() => {
    deleteRoom(editRoom);
    closeEditRoomModal();
    setEditRoom({} as RoomProps);
  }, [deleteRoom, closeEditRoomModal, editRoom]);

  const handleNavigateToProduct = useCallback(
    (room, productId = null) => {
      navigate('RoomProducts', { room, productId });
    },
    [navigate],
  );

  const handleCreateAndNavigateToProduct = useCallback(
    (room: RoomProps) => {
      const product = {
        id: GenerateID(),
        name: 'Novo Produto',
        items: [],
      } as Product;
      navigate('RoomProducts', { room, productId: product.id });
      createProduct({ roomId: room.id, product });
    },
    [navigate, createProduct],
  );

  return (
    <Container>
      <Modal
        animationType="fade"
        transparent
        visible={addRoomModalVisible}
        onRequestClose={closeAddRoomModal}
        closeModal={closeAddRoomModal}
      >
        <ModalContent>
          <ModalTitle>Adicionar cômodo</ModalTitle>

          <ModalInputTextContainer>
            <ModalInputText
              ref={modalInputRef}
              onChangeText={room => setwritedRoomName(room)}
              placeholder="Digite o nome do cômodo"
              placeholderTextColor="#efefef"
            />
          </ModalInputTextContainer>

          <ModalButtons>
            <Button
              icon="cancel"
              mode="contained"
              style={{ backgroundColor: red }}
              onPress={closeAddRoomModal}
            >
              Cancelar
            </Button>

            <Button
              icon="check"
              mode="contained"
              style={{ backgroundColor: green }}
              onPress={addRoom}
            >
              Confirmar
            </Button>
          </ModalButtons>
        </ModalContent>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={editRoomModalVisible}
        onRequestClose={closeEditRoomModal}
        closeModal={closeEditRoomModal}
      >
        <ModalContent>
          <ModalHeaderWrapper>
            <ModalTitle>Editar cômodo</ModalTitle>
            <TouchableOpacity onPress={handleDeleteRoom}>
              <MaterialIcons
                name="delete"
                size={48}
                color="#dd3030"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </ModalHeaderWrapper>

          <ModalInputTextContainer>
            <ModalInputText
              onChangeText={roomName =>
                setEditRoom({ ...editRoom, name: roomName })
              }
              value={editRoom.name}
              placeholder="Digite o nome do cômodo"
              placeholderTextColor="#efefef"
            />
          </ModalInputTextContainer>

          <ModalButtons>
            <Button
              icon="cancel"
              mode="contained"
              style={{ backgroundColor: red }}
              onPress={closeEditRoomModal}
            >
              Cancelar
            </Button>

            <Button
              icon="check"
              mode="contained"
              style={{ backgroundColor: green }}
              onPress={handleEditRoom}
            >
              Confirmar
            </Button>
          </ModalButtons>
        </ModalContent>
      </Modal>

      <HeaderButtons>
        <HeaderButton onPress={openAddRoomModal}>
          <MaterialCommunityIcons name="plus" size={26} color="#fff" />
          <HeaderButtonText>Cômodo</HeaderButtonText>
        </HeaderButton>
      </HeaderButtons>

      <ProductsContainer>
        <RoomList
          data={budget.rooms}
          keyExtractor={room => room.id}
          renderItem={({ item: room, index: roomIndex }) => (
            <Room>
              <RoomNameWrapper
                onPress={() => openEditRoomModal({ room, index: roomIndex })}
              >
                <RoomTitleWrapper>
                  <RoomTitle>{room.name}</RoomTitle>
                </RoomTitleWrapper>
              </RoomNameWrapper>

              <ProductHorizontalList>
                {room.products.map(product => (
                  <ProductCardContainer
                    onPress={() => handleNavigateToProduct(room, product.id)}
                    key={product.id}
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 6,
                    }}
                  >
                    <ProductCardHeader>
                      <ProductCardTitle>{product.name}</ProductCardTitle>
                    </ProductCardHeader>
                    <ProductCardInfo>
                      {product.items.map((item, itemIndex) => (
                        <ProductCardInfoItem key={itemIndex.toString()}>
                          <ItemTextContainerQuantity>
                            <ItemText>{item.quantity}</ItemText>
                          </ItemTextContainerQuantity>
                          <ItemTextContainerName>
                            <ItemText numberOfLines={1}>{item.name}</ItemText>
                          </ItemTextContainerName>
                          <ItemTextContainerMeasures>
                            <ItemText
                              numberOfLines={1}
                            >{`${item.measures.displayMeasures} ${item.unit}`}</ItemText>
                          </ItemTextContainerMeasures>
                        </ProductCardInfoItem>
                      ))}
                    </ProductCardInfo>
                  </ProductCardContainer>
                ))}

                <ProductCardContainer
                  onPress={() => handleCreateAndNavigateToProduct(room)}
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 6,
                  }}
                >
                  <ProductCardAdd>
                    <MaterialIcons name="add" size={48} color="#747171" />
                    <ProductCardAddText>Novo Produto</ProductCardAddText>
                  </ProductCardAdd>
                </ProductCardContainer>
              </ProductHorizontalList>
            </Room>
          )}
        />
      </ProductsContainer>
    </Container>
  );
};

export default BudgetProductList;
