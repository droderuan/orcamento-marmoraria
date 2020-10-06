import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Alert, TextInput } from 'react-native';
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

const CreateItem: React.FC<FirstClientInfoProps> = ({ navigation }) => {
  const { addItemToProduct, getItem } = useBudget();
  const route = useRoute();
  const { productId, roomId, itemId } = route.params as RouteParams;

  const lengthInputRef = useRef<TextInput | null>(null);

  const [item, setItem] = useState({ id: GenerateId() } as Item);
  const [measures, setMeasures] = useState({} as Measure);

  const [quantity, setQuantity] = useState<string>('1');

  const handleChangeQuantity = useCallback((value: string) => {
    setQuantity(value);
  }, []);

  const [unit, setUnit] = useState<string>('cm');
  const [unitModalPickerVisible, setUnitModalPickerVisible] = useState(false);
  const unitOptions = ['cm', 'm'];

  const openUnitModal = useCallback(() => {
    setUnitModalPickerVisible(true);
  }, [setUnitModalPickerVisible]);

  const closeUnitModal = useCallback(() => {
    setUnitModalPickerVisible(false);
  }, [setUnitModalPickerVisible]);

  const handleChangeUnit = useCallback((option: string) => {
    setUnit(option);
  }, []);

  const [shape, setShape] = useState<string>();
  const [shapeModalPickerVisible, setShapeModalPickerVisible] = useState(false);
  const shapeOptions = ['Retangular', 'Circular', 'Triangular'];

  const openShapeModal = useCallback(() => {
    setShapeModalPickerVisible(true);
  }, [setShapeModalPickerVisible]);

  const closeShapeModal = useCallback(() => {
    setShapeModalPickerVisible(false);
  }, [setShapeModalPickerVisible]);

  const handleChangeShape = useCallback((option: string) => {
    setShape(option);
  }, []);

  const stoneOptions = ['Mármore', 'Granito'];
  const [stone, setStone] = useState<string>();
  const [stoneModalPickerVisible, setStoneModalPickerVisible] = useState(false);

  const openStoneModal = useCallback(() => {
    setStoneModalPickerVisible(true);
  }, [setStoneModalPickerVisible]);

  const closeStoneModal = useCallback(() => {
    setStoneModalPickerVisible(false);
  }, [setStoneModalPickerVisible]);

  const handleChangeStone = useCallback((option: string) => {
    setStone(option);
  }, []);

  const [marble, setMarble] = useState<string>();
  const [marbleModalPickerVisible, setMarbleModalPickerVisible] = useState(
    false,
  );
  const marbleOptions = [
    'Rosso Verona',
    'Travertino ',
    'Travertino Bege Bahia',
    'Crema Marfil ',
    'Botticino ',
    'Branco Nacional ',
    'Pighês  ',
    'Carrara ',
    'Branco Thassos ',
    'Marrom Emperador ',
    'Marrom Emperador Light ',
    'Nero Marquina',
  ];

  const openMarbleModal = useCallback(() => {
    setMarbleModalPickerVisible(true);
  }, [setMarbleModalPickerVisible]);

  const closeMarbleModal = useCallback(() => {
    setMarbleModalPickerVisible(false);
  }, [setMarbleModalPickerVisible]);

  const handleChangeMarble = useCallback((option: string) => {
    setMarble(option);
  }, []);

  const handleSaveItem = useCallback(() => {
    const newItem = {
      ...item,
      shape,
      stone,
      type: marble,
      quantity: parseInt(quantity, 10),
      measures: { ...measures, unit },
    } as Item;
    addItemToProduct({ roomId, productId, item: newItem });

    navigation.goBack();
  }, [
    addItemToProduct,
    item,
    roomId,
    productId,
    shape,
    quantity,
    measures,
    unit,
    marble,
    stone,
    navigation,
  ]);

  useEffect(() => {
    if (itemId) {
      const findItem = getItem({ roomId, productId, itemId });
      if (findItem) {
        setItem(findItem);
        setStone(findItem.stone);
        setMarble(findItem.type);
        setMeasures(findItem.measures);
        setUnit(findItem.measures.unit);
        setQuantity(findItem.quantity.toString(10));
        setShape(findItem.shape);
      }
    }
  }, [getItem, itemId, productId, roomId]);

  return (
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
          value={quantity.toString()}
          maxLength={10}
          value={quantity}
          onChangeText={value => handleChangeQuantity(value)}
        />
        <ItemBottomLine />
      </ItemInput>

      <ItemInput>
        <ItemInputLabel>Pedra</ItemInputLabel>
        <ItemInputButton onPress={openStoneModal}>
          <ItemInputButtonWrapper>
            <ItemInputButtonText isOptionSelected={!!stone}>
              {stone || 'Escolha o tipo da pedra'}
            </ItemInputButtonText>
            <ListPickerModal
              animationType="fade"
              transparent
              selectDefault={stone}
              visible={stoneModalPickerVisible}
              handleCloseModal={closeStoneModal}
              handleOnChange={handleChangeStone}
              options={stoneOptions}
            />
          </ItemInputButtonWrapper>
        </ItemInputButton>
        <ItemBottomLine />
      </ItemInput>

      <ItemInput>
        <ItemInputLabel>Mármore</ItemInputLabel>
        <ItemInputButton onPress={openMarbleModal}>
          <ItemInputButtonWrapper>
            <ItemInputButtonText isOptionSelected={!!marble}>
              {marble || 'Escolha o mármore'}
            </ItemInputButtonText>
            <ListPickerModal
              animationType="fade"
              transparent
              selectDefault={marble}
              visible={marbleModalPickerVisible}
              handleCloseModal={closeMarbleModal}
              handleOnChange={handleChangeMarble}
              options={marbleOptions}
            />
          </ItemInputButtonWrapper>
        </ItemInputButton>
        <ItemBottomLine />
      </ItemInput>

      <ItemInput>
        <ItemInputLabel>Formato</ItemInputLabel>
        <ItemInputButton onPress={openShapeModal}>
          <ItemInputButtonWrapper>
            <ItemInputButtonText isOptionSelected={!!shape}>
              {shape || 'Escolha o formato'}
            </ItemInputButtonText>
            <ListPickerModal
              animationType="fade"
              transparent
              selectDefault={shape}
              visible={shapeModalPickerVisible}
              handleCloseModal={closeShapeModal}
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
            placeholder="Largura"
            value={measures.width}
            placeholderTextColor="#A0A0A0"
            onChangeText={value =>
              setMeasures(oldMeasure => ({
                ...oldMeasure,
                width: value,
              }))
            }
            onSubmitEditing={() => lengthInputRef.current?.focus()}
          />
          <ItemText>x</ItemText>
          <ItemWithTwoTextInput
            ref={lengthInputRef}
            keyboardType="number-pad"
            placeholder="Comprimento"
            value={measures.length}
            placeholderTextColor="#A0A0A0"
            onChangeText={value =>
              setMeasures(oldMeasure => ({
                ...oldMeasure,
                length: value,
              }))
            }
          />

          <UnitButton onPress={openUnitModal}>
            <UnitButtonText>{unit}</UnitButtonText>
          </UnitButton>

          <ListPickerModal
            animationType="fade"
            transparent
            visible={unitModalPickerVisible}
            handleCloseModal={closeUnitModal}
            handleOnChange={handleChangeUnit}
            options={unitOptions}
          />
        </ItemWithTwoTextInputWrapper>
        <ItemBottomLine />
      </ItemInput>
      <ButtonWrapper>
        <Button onPress={handleSaveItem}>Salvar</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default CreateItem;
