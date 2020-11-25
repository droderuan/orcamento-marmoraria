import React, { useState, useCallback, useRef } from 'react';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Room from '@dtos/Room';

import GenerateID from '@utils/GenerateID';
import Product from '@dtos/Product';
import { useBudget } from '@hooks/budget';

import BudgetProductsView from './BudgetProductsView';

const BudgetProductsController: React.FC = () => {
  const {
    budget,
    createRoom,
    saveRoom,
    deleteRoom,
    createProduct,
  } = useBudget();
  const { navigate } = useNavigation();
  const [roomNameToCreate, setRoomNameToCreate] = useState('');
  const [roomToShowOptions, setRoomToShowOptions] = useState<Room>({} as Room);

  const [createRoomModalVisibility, setCreateRoomModalVisibility] = useState(
    false,
  );
  const [roomOptionsModalVisible, setRoomOptionsModalVisible] = useState(false);

  const modalCreateRoomTextInputRef = useRef<TextInput>(null);

  const openCreateRoomModal = useCallback(() => {
    setCreateRoomModalVisibility(true);
    setTimeout(() => modalCreateRoomTextInputRef.current?.focus(), 250);
  }, []);

  const closeCreateRoomModal = useCallback(
    () => setCreateRoomModalVisibility(false),
    [],
  );

  const handleCreateRoom = useCallback(() => {
    if (roomNameToCreate !== '') {
      createRoom({
        name: roomNameToCreate,
      });

      setRoomNameToCreate('');

      closeCreateRoomModal();
    }
  }, [closeCreateRoomModal, roomNameToCreate, createRoom]);

  const openRoomOptionsModal = useCallback((room: Room) => {
    setRoomOptionsModalVisible(true);
    setRoomToShowOptions(room);
  }, []);

  const closeRoomOptionsModal = useCallback(() => {
    setRoomOptionsModalVisible(false);
    setRoomToShowOptions({} as Room);
  }, []);

  const handleEditRoomName = useCallback(
    (value: string) => {
      setRoomToShowOptions(oldRoom => ({ ...oldRoom, name: value }));
      closeRoomOptionsModal();
      setRoomToShowOptions({} as Room);
    },
    [closeRoomOptionsModal],
  );

  const handleSaveRoom = useCallback(() => {
    saveRoom(roomToShowOptions);
    closeRoomOptionsModal();
    setRoomToShowOptions({} as Room);
  }, [saveRoom, closeRoomOptionsModal, roomToShowOptions]);

  const handleDuplicateRoom = useCallback(() => {
    deleteRoom(roomToShowOptions);
    closeRoomOptionsModal();
    setRoomToShowOptions({} as Room);
  }, [deleteRoom, closeRoomOptionsModal, roomToShowOptions]);

  const handleDeleteRoom = useCallback(() => {
    deleteRoom(roomToShowOptions);
    closeRoomOptionsModal();
    setRoomToShowOptions({} as Room);
  }, [deleteRoom, closeRoomOptionsModal, roomToShowOptions]);

  const navigateToProduct = useCallback(
    (room, productId = null) => {
      navigate('RoomProducts', { room, productId });
    },
    [navigate],
  );

  const createAndNavigateToProduct = useCallback(
    (room: Room) => {
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
    <BudgetProductsView
      budget={budget}
      roomToShowOptions={roomToShowOptions}
      modalCreateRoomInputTextRef={modalCreateRoomTextInputRef}
      createRoomModal={{
        visibility: createRoomModalVisibility,
        openModal: openCreateRoomModal,
        closeModal: closeCreateRoomModal,
      }}
      setRoomNameToCreate={setRoomNameToCreate}
      handleCreateRoom={handleCreateRoom}
      roomOptionsModal={{
        visibility: roomOptionsModalVisible,
        openModal: openRoomOptionsModal,
        closeModal: closeRoomOptionsModal,
      }}
      handleChangeEditingRoomName={handleEditRoomName}
      handleFinishEditingRoom={handleSaveRoom}
      deleteEditingRoom={handleDeleteRoom}
      duplicateEditingRoom={handleDuplicateRoom}
      createAndNavigateToProduct={createAndNavigateToProduct}
      navigateToProduct={navigateToProduct}
    />
  );
};

export default BudgetProductsController;
