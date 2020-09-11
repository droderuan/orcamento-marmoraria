import React, { useState, useCallback, useRef } from 'react';
import { TouchableOpacity } from 'react-native';

import Modal from '@components/Modal';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import Room from '../../components/Room';

import {
  Container,
  HeaderButtons,
  HeaderButton,
  HeaderButtonText,
  ModalButtons,
  ModalTitle,
  ModalInputTextContainer,
  ModalInputText,
  ProductsContainer,
  ProductsList,
} from './styles';

interface HomeProps {
  navigation: StackNavigationProp<any, any>;
}

interface Product {
  type: string;
}

interface Room {
  type: 'Quarto' | 'Banheiro';
  name: string;
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [writedRoom, setWritedRoom] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const modalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = useCallback(() => setModalVisible(true), []);

  const closeModal = useCallback(() => setModalVisible(false), []);

  const handleNewProduct = useCallback(() => {
    console.log('foi');
    navigation.navigate('SelectProduct');
  }, [navigation]);

  const addRoom = useCallback(() => {
    if (writedRoom !== '') {
      setRooms(oldProps => {
        return [
          ...oldProps,
          { name: writedRoom, type: 'Quarto', products: [] },
        ];
      });
      setWritedRoom('');
      closeModal();
    }
  }, [writedRoom, closeModal]);

  return (
    <Container>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ModalTitle>Adicionar cômodo</ModalTitle>
        <ModalInputTextContainer>
          <ModalInputText
            onChangeText={room => setWritedRoom(room)}
            placeholder="Digite o nome do cômodo"
            placeholderTextColor="#efefef"
          />
        </ModalInputTextContainer>

        <ModalButtons>
          <TouchableOpacity onPress={closeModal}>
            <Icon name="cancel" size={40} color="#dd3030" />
          </TouchableOpacity>

          <TouchableOpacity onPress={addRoom}>
            <Icon name="check-all" size={40} color="#30dd30" />
          </TouchableOpacity>
        </ModalButtons>
      </Modal>

      <HeaderButtons>
        <HeaderButton onPress={openModal}>
          <Icon name="plus" size={26} color="#fff" />
          <HeaderButtonText>Cômodo</HeaderButtonText>
        </HeaderButton>
        <HeaderButton onPress={handleNewProduct}>
          <Icon name="plus" size={26} color="#fff" />
          <HeaderButtonText>Produto</HeaderButtonText>
        </HeaderButton>
      </HeaderButtons>

      <ProductsContainer>
        <ProductsList
          data={rooms}
          keyExtractor={item => item.name}
          renderItem={({ item: room }) => (
            <Room name={room.name} products={[]} />
          )}
        />
      </ProductsContainer>
    </Container>
  );
};

export default Home;
