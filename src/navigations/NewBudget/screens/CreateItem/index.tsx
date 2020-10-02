import React, { useCallback, useState, useRef } from 'react';
import { Alert, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ParseNumberToHaveTwoDecimal from '@utils/ParseNumberToHaveTwoDecimal';

import { useRoute } from '@react-navigation/native';
import ItemProps from '@dtos/Item';

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
}

interface Measure {
  width: string;
  length: string;
}

const CreateItem: React.FC<FirstClientInfoProps> = ({ navigation }) => {
  const { saveProduct } = useBudget();
  const route = useRoute();
  const { productId, roomId } = route.params as RouteParams;

  const lengthInputRef = useRef<TextInput | null>(null);

  const [item, setItem] = useState({} as ItemProps);
  const [measures, setMeasures] = useState({} as Measure);

  const [quantity, setQuantity] = useState<number>(1);

  const handleChangeQuantity = useCallback((value: string) => {
    const parsedNumber = parseInt(value, 10);
    if (parsedNumber > 1) {
      setQuantity(parsedNumber);
    }
  }, []);

  const [unit, setUnit] = useState<string>();
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

  const [stone, setStone] = useState<string>();
  const [stoneModalPickerVisible, setStoneModalPickerVisible] = useState(false);
  const stoneOptions = ['Mármore', 'Granito'];

  const openStoneModal = useCallback(() => {
    setStoneModalPickerVisible(true);
  }, [setStoneModalPickerVisible]);

  const closeStoneModal = useCallback(() => {
    setStoneModalPickerVisible(false);
  }, [setStoneModalPickerVisible]);

  const handleChangeStone = useCallback((option: string) => {
    setStone(option);
  }, []);

  const handleSaveItem = useCallback(() => {}, []);

  return (
    <Container>
      <ItemInput>
        <ItemInputLabel>Nome da Peça</ItemInputLabel>
        <ItemTextInput
          placeholder="Digite o nome da peça"
          placeholderTextColor="#A0A0A0"
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
          selectTextOnFocus
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
        <ItemInputLabel>Formato</ItemInputLabel>
        <ItemInputButton onPress={openShapeModal}>
          <ItemInputButtonWrapper>
            <ItemInputButtonText isOptionSelected={!!shape}>
              {shape || 'Escolha o formato'}
            </ItemInputButtonText>
            <ListPickerModal
              animationType="fade"
              transparent
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
        <Button onPress={() => Alert.alert('Sou corno', 'passa o zap gostosa')}>
          Salvar
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default CreateItem;
