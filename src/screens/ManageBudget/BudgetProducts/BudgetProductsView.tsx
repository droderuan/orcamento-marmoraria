import React from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { red, green } from '@styles/theme/colors';
import Modal from '@components/Modal';

import Budget from '@dtos/Budget';
import Room from '@dtos/Room';
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
  RoomContent,
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

interface BudgetProductsViewProps {
  budget: Budget;
  roomToShowOptions: Room;
  modalCreateRoomInputTextRef: React.RefObject<TextInput>;
  createRoomModal: {
    visibility: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
  setRoomNameToCreate: (name: string) => void;
  handleCreateRoom: () => void;
  roomOptionsModal: {
    visibility: boolean;
    openModal: (room: Room) => void;
    closeModal: () => void;
  };
  handleFinishEditingRoom: () => void;
  handleChangeEditingRoomName: (name: string) => void;
  deleteEditingRoom: () => void;
  duplicateEditingRoom: () => void;
  navigateToProduct: (room: Room, productId: string) => void;
  createAndNavigateToProduct: (room: Room) => void;
}

const BudgetProductView: React.FC<BudgetProductsViewProps> = ({
  budget,
  roomToShowOptions,
  modalCreateRoomInputTextRef,
  createRoomModal,
  setRoomNameToCreate,
  handleCreateRoom,
  roomOptionsModal,
  handleChangeEditingRoomName,
  handleFinishEditingRoom,
  deleteEditingRoom,
  duplicateEditingRoom,
  navigateToProduct,
  createAndNavigateToProduct,
}) => {
  return (
    <Container>
      <Modal
        animationType="fade"
        transparent
        visible={createRoomModal.visibility}
        onRequestClose={createRoomModal.closeModal}
        closeModal={createRoomModal.closeModal}
      >
        <ModalContent>
          <ModalTitle>Adicionar cômodo</ModalTitle>

          <ModalInputTextContainer>
            <ModalInputText
              ref={modalCreateRoomInputTextRef}
              onChangeText={room => setRoomNameToCreate(room)}
              placeholder="Digite o nome do cômodo"
              placeholderTextColor="#efefef"
            />
          </ModalInputTextContainer>

          <ModalButtons>
            <Button
              icon="cancel"
              mode="contained"
              style={{ backgroundColor: red }}
              onPress={createRoomModal.closeModal}
            >
              Cancelar
            </Button>

            <Button
              icon="check"
              mode="contained"
              style={{ backgroundColor: green }}
              onPress={handleCreateRoom}
            >
              Confirmar
            </Button>
          </ModalButtons>
        </ModalContent>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={roomOptionsModal.visibility}
        onRequestClose={roomOptionsModal.closeModal}
        closeModal={roomOptionsModal.closeModal}
      >
        <ModalContent>
          <ModalHeaderWrapper>
            <ModalTitle>Editar cômodo</ModalTitle>
            <TouchableOpacity onPress={deleteEditingRoom}>
              <MaterialCommunityIcons
                name="delete-outline"
                size={48}
                color="#dd3030"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={duplicateEditingRoom}>
              <MaterialCommunityIcons
                name="content-duplicate"
                size={42}
                color="#355C8A"
              />
            </TouchableOpacity>
          </ModalHeaderWrapper>

          <ModalInputTextContainer>
            <ModalInputText
              onChangeText={handleChangeEditingRoomName}
              value={roomToShowOptions.name}
              placeholder="Digite o nome do cômodo"
              placeholderTextColor="#efefef"
            />
          </ModalInputTextContainer>

          <ModalButtons>
            <Button
              icon="cancel"
              mode="contained"
              style={{ backgroundColor: red }}
              onPress={roomOptionsModal.closeModal}
            >
              Cancelar
            </Button>

            <Button
              icon="check"
              mode="contained"
              style={{ backgroundColor: green }}
              onPress={handleFinishEditingRoom}
            >
              Confirmar
            </Button>
          </ModalButtons>
        </ModalContent>
      </Modal>

      <HeaderButtons>
        <HeaderButton onPress={createRoomModal.openModal}>
          <MaterialCommunityIcons name="plus" size={26} color="#fff" />
          <HeaderButtonText>Cômodo</HeaderButtonText>
        </HeaderButton>
      </HeaderButtons>

      <ProductsContainer>
        <RoomList
          data={budget.rooms}
          keyExtractor={room => room.id}
          renderItem={({ item: room }) => (
            <RoomContent>
              <RoomNameWrapper onPress={() => roomOptionsModal.openModal(room)}>
                <RoomTitleWrapper>
                  <RoomTitle>{room.name}</RoomTitle>
                </RoomTitleWrapper>
              </RoomNameWrapper>

              <ProductHorizontalList>
                {room.products.map(product => (
                  <ProductCardContainer
                    onPress={() => navigateToProduct(room, product.id)}
                    key={product.id}
                  >
                    <ProductCardHeader>
                      <ProductCardTitle numberOfLines={2} ellipsizeMode="tail">
                        {product.name}
                      </ProductCardTitle>
                    </ProductCardHeader>
                    <ProductCardInfo>
                      {product.items.map((item, itemIndex) => (
                        <ProductCardInfoItem key={itemIndex.toString()}>
                          <ItemTextContainerQuantity>
                            <ItemText>{item.quantity}x</ItemText>
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
                  onPress={() => createAndNavigateToProduct(room)}
                >
                  <ProductCardAdd>
                    <MaterialCommunityIcons
                      name="plus"
                      size={48}
                      color="#747171"
                    />
                    <ProductCardAddText>Novo Produto</ProductCardAddText>
                  </ProductCardAdd>
                </ProductCardContainer>
              </ProductHorizontalList>
            </RoomContent>
          )}
        />
      </ProductsContainer>
    </Container>
  );
};

export default BudgetProductView;
