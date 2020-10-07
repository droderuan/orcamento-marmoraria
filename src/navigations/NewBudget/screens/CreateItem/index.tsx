import React, { useCallback, useState, useRef, useEffect } from 'react';
import { TextInput, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import GenerateId from '@utils/GenerateID';

import { useRoute } from '@react-navigation/native';
import Item from '@dtos/Item';

import Button from '@components/Button';
import ListPickerModal from '@components/ListPickerModal';
import { useBudget } from '../../hooks/budget';

import {
  Container,
  ItemInput,
  ItemInputLabel,
  ItemTextInput,
  ItemWithTwoTextInput,
  ItemWithTwoTextInputWrapper,
  ItemText,
  UnitButton,
  UnitButtonText,
  ItemInputButton,
  ItemInputButtonWrapper,
  ItemInputButtonText,
  ItemBottomLine,
  ButtonWrapper,
  FinishingSelectWrapper,
  FinishingSelect,
} from './styles';

interface FirstClientInfoProps {
  navigation: StackNavigationProp<any, any>;
}

interface RouteParams {
  roomId: string;
  productId: string;
  itemId: string;
}

interface Measure {
  width: string;
  length: string;
}

interface Modals {
  unit: false;
  shape: false;
  stone: false;
  marble: false;
}

const CreateItem: React.FC<FirstClientInfoProps> = ({ navigation }) => {
  const { addItemToProduct, getItem } = useBudget();
  const route = useRoute();
  const { productId, roomId, itemId } = route.params as RouteParams;

  const lengthInputRef = useRef<TextInput | null>(null);

  const [item, setItem] = useState({
    id: GenerateId(),
    quantity: 1,
    measures: {
      unit: 'cm',
    },
  } as Item);

  const [writeQuantity, setWriteQuantity] = useState('1');

  useEffect(() => {
    if (itemId) {
      const findItem = getItem({ roomId, productId, itemId });
      if (findItem) {
        setItem(findItem);
      }
    }
  }, [getItem, itemId, productId, roomId]);

  const [modalsVisible, setModalsVisible] = useState({
    unit: false,
    shape: false,
    stone: false,
    marble: false,
  } as Modals);

  const toggleModal = useCallback(
    (modalName: 'unit' | 'shape' | 'stone' | 'marble') => {
      setModalsVisible(oldProps => ({
        ...oldProps,
        [modalName]: !oldProps[modalName],
      }));
    },
    [],
  );

  const shapeOptions = ['Retangular', 'Circular', 'Triangular'];
  const stoneOptions = ['Mármore', 'Granito'];
  const unitOptions = ['cm', 'm'];
  const marbleOptions = [
    'Rosso Verona',
    'Travertino',
    'Travertino Bege Bahia',
    'Crema Marfil',
    'Botticino',
    'Branco Nacional ',
    'Pighês',
    'Carrara',
    'Branco Thassos',
    'Marrom Emperador',
    'Marrom Emperador Light',
    'Nero Marquina',
  ];

  const handleChangeQuantity = useCallback(() => {
    setItem(oldItem => ({
      ...oldItem,
      quantity: parseInt(writeQuantity, 10),
    }));
  }, [writeQuantity]);

  const handleChangeUnit = useCallback((option: 'cm' | 'm') => {
    setItem(oldItem => ({
      ...oldItem,
      measures: {
        ...oldItem.measures,
        unit: option,
      },
    }));
  }, []);

  const handleChangeShape = useCallback(
    (option: 'Retangular' | 'Circular' | 'Triangular') => {
      setItem(oldItem => ({
        ...oldItem,
        shape: option,
      }));
    },
    [],
  );

  const handleChangeStone = useCallback((option: string) => {
    setItem(oldItem => ({
      ...oldItem,
      stone: option,
    }));
  }, []);

  const handleChangeMarble = useCallback((option: string) => {
    setItem(oldItem => ({
      ...oldItem,
      type: option,
    }));
  }, []);

  const handleSaveItem = useCallback(() => {
    if (!item.quantity) {
      Alert.alert('Digite a quantidade');
      return;
    }
    if (!item.shape) {
      Alert.alert('Digite o formato');
      return;
    }
    if (!item.stone) {
      Alert.alert('Selecione o tipo da pedra');
      return;
    }
    if (!item.type) {
      Alert.alert('Selecione a pedra');
      return;
    }

    addItemToProduct({ roomId, productId, item });

    navigation.goBack();
  }, [addItemToProduct, item, productId, roomId, navigation]);

  return (
    <ScrollView>
      <Container>
        <ItemInput>
          <ItemInputLabel>Nome da Peça</ItemInputLabel>
          <ItemTextInput
            placeholder="Digite o nome da peça"
            placeholderTextColor="#A0A0A0"
            value={item.name}
            onChangeText={value =>
              setItem(oldItem => ({ ...oldItem, name: value }))
            }
          />
          <ItemBottomLine />
        </ItemInput>

        <ItemInput>
          <ItemInputLabel>Quantidade</ItemInputLabel>
          <ItemTextInput
            keyboardType="number-pad"
            placeholderTextColor="#A0A0A0"
            maxLength={10}
            value={writeQuantity}
            placeholder="Digite a quantidade"
            onEndEditing={handleChangeQuantity}
            onChangeText={value => setWriteQuantity(value)}
          />
          <ItemBottomLine />
        </ItemInput>

        <ItemInput>
          <ItemInputLabel>Pedra</ItemInputLabel>
          <ItemInputButton
            onPress={() => {
              toggleModal('stone');
            }}
          >
            <ItemInputButtonWrapper>
              <ItemInputButtonText isOptionSelected={!!item.stone}>
                {item.stone || 'Escolha o tipo da pedra'}
              </ItemInputButtonText>
              <ListPickerModal
                animationType="fade"
                transparent
                selectDefault={item.stone}
                visible={modalsVisible.stone}
                handleCloseModal={() => toggleModal('stone')}
                handleOnChange={handleChangeStone}
                options={stoneOptions}
              />
            </ItemInputButtonWrapper>
          </ItemInputButton>
          <ItemBottomLine />
        </ItemInput>

        <ItemInput>
          <ItemInputLabel>Mármore</ItemInputLabel>
          <ItemInputButton onPress={() => toggleModal('marble')}>
            <ItemInputButtonWrapper>
              <ItemInputButtonText isOptionSelected={!!item.type}>
                {item.type || 'Escolha o mármore'}
              </ItemInputButtonText>
              <ListPickerModal
                animationType="fade"
                transparent
                selectDefault={item.type}
                visible={modalsVisible.marble}
                handleCloseModal={() => toggleModal('marble')}
                handleOnChange={handleChangeMarble}
                options={marbleOptions}
              />
            </ItemInputButtonWrapper>
          </ItemInputButton>
          <ItemBottomLine />
        </ItemInput>

        <ItemInput>
          <ItemInputLabel>Formato</ItemInputLabel>
          <ItemInputButton onPress={() => toggleModal('shape')}>
            <ItemInputButtonWrapper>
              <ItemInputButtonText isOptionSelected={!!item.shape}>
                {item.shape || 'Escolha o formato'}
              </ItemInputButtonText>
              <ListPickerModal
                animationType="fade"
                transparent
                selectDefault={item?.shape}
                visible={modalsVisible.shape}
                handleCloseModal={() => toggleModal('shape')}
                handleOnChange={handleChangeShape}
                options={shapeOptions}
              />
            </ItemInputButtonWrapper>
          </ItemInputButton>
          <ItemBottomLine />
        </ItemInput>

        <ItemInput>
          <ItemInputLabel>Medidas</ItemInputLabel>
          <ItemWithTwoTextInputWrapper>
            <ItemWithTwoTextInput
              keyboardType="number-pad"
              placeholder="Comprimento"
              selectTextOnFocus
              onSubmitEditing={() => lengthInputRef.current?.focus()}
              value={item?.measures?.length}
              placeholderTextColor="#A0A0A0"
              onChangeText={value =>
                setItem(oldItem => ({
                  ...oldItem,
                  measures: {
                    ...oldItem.measures,
                    length: value,
                  },
                }))
              }
            />
            <ItemText>x</ItemText>
            <ItemWithTwoTextInput
              ref={lengthInputRef}
              keyboardType="number-pad"
              placeholder="Largura"
              selectTextOnFocus
              value={item?.measures?.width}
              placeholderTextColor="#A0A0A0"
              onChangeText={value =>
                setItem(oldItem => ({
                  ...oldItem,
                  measures: {
                    ...oldItem.measures,
                    width: value,
                  },
                }))
              }
            />

            <UnitButton onPress={() => toggleModal('unit')}>
              <UnitButtonText>{item.measures?.unit}</UnitButtonText>
            </UnitButton>

            <ListPickerModal
              animationType="fade"
              transparent
              selectDefault={item?.measures.unit}
              visible={modalsVisible.unit}
              handleCloseModal={() => toggleModal('unit')}
              handleOnChange={handleChangeUnit}
              options={unitOptions}
            />
          </ItemWithTwoTextInputWrapper>
          <ItemBottomLine />
        </ItemInput>

        <ItemInput>
          <ItemInputLabel>Acabamento</ItemInputLabel>
          <FinishingSelectWrapper>
            <FinishingSelect>
              <ItemTextInput>asda</ItemTextInput>
            </FinishingSelect>
          </FinishingSelectWrapper>
          <ItemBottomLine />
        </ItemInput>

        <ButtonWrapper>
          <Button onPress={handleSaveItem}>Salvar</Button>
        </ButtonWrapper>
      </Container>
    </ScrollView>
  );
};

export default CreateItem;
