import React, { useState, useCallback, useRef } from 'react';
import { TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import RoomProps from '@dtos/Room';
import Modal from '@components/Modal';

import GenerateID from '@utils/GenerateID';
import Product from '@dtos/Product';
import { useBudget } from '../../hooks/budget';

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

interface HomeProps {
  navigation: StackNavigationProp<any, any>;
}

interface EditRoomDTO {
  room: RoomProps;
  index: number;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const {
    roomsInBudget,
    createRoom,
    saveRoom,
    deleteRoom,
    createProduct,
  } = useBudget();

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
      navigation.navigate('RoomProducts', { room, productId });
    },
    [navigation],
  );

  const handleCreateAndNavigateToProduct = useCallback(
    (room: RoomProps) => {
      const product = {
        id: GenerateID(),
        name: 'Novo Produto',
        items: [],
      } as Product;
      navigation.navigate('RoomProducts', { room, productId: product.id });
      createProduct({ roomId: room.id, product });
    },
    [navigation, createProduct],
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
            <TouchableOpacity onPress={closeAddRoomModal}>
              <MaterialCommunityIcons name="cancel" size={40} color="#dd3030" />
            </TouchableOpacity>

            <TouchableOpacity onPress={addRoom}>
              <MaterialCommunityIcons
                name="check-all"
                size={40}
                color="#30dd30"
              />
            </TouchableOpacity>
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
            <TouchableOpacity onPress={closeEditRoomModal}>
              <MaterialCommunityIcons name="cancel" size={48} color="#dd3030" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEditRoom}>
              <MaterialCommunityIcons
                name="check-all"
                size={48}
                color="#30dd30"
              />
            </TouchableOpacity>
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
          data={roomsInBudget}
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
                            >{`${item.measures.width}x${item.measures.length} ${item.measures.unit}`}</ItemText>
                          </ItemTextContainerMeasures>
                        </ProductCardInfoItem>
                      ))}
                    </ProductCardInfo>
                  </ProductCardContainer>
                ))}

                <ProductCardContainer
                  onPress={() => handleCreateAndNavigateToProduct(room)}
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

export default Home;
