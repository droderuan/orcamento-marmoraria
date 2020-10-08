import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  SetStateAction,
} from 'react';
import { ScrollView, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import generateId from '@utils/GenerateID';

import { useRoute } from '@react-navigation/native';
import Item from '@dtos/Item';

import Button from '@components/Button';
import ListPickerModal from '@components/ListPickerModal';
import { useBudget } from '../../hooks/budget';

import {
  Container,
  Content,
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
  SelectFinishingContainer,
  SelectFinishingBackground,
  EdgeFinishingButtonWrapper,
  MiddleFinishingButtonWrapper,
  ButtonText,
  FinishingSelectButton,
} from './styles';

interface CreateItemProps {
  navigation: StackNavigationProp<any, any>;
}

interface RouteParams {
  roomId: string;
  productId: string;
  itemId: string;
}

interface FinishingPosition {
  position: string;
  type: string;
  hasFinishing: boolean;
}

const CreateItem: React.FC<CreateItemProps> = ({ navigation }) => {
  const { addItemToProduct, getItem } = useBudget();
  const route = useRoute();

  const { productId, roomId, itemId } = route.params as RouteParams;

  const lengthInputRef = useRef<TextInput | null>(null);

  const unitOptions = ['cm', 'm', 'mm'];
  const shapeOptions = ['Retangular', 'Circular', 'Triangular'];
  const stoneOptions = ['Mármore', 'Granito'];
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

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<string>('1');
  const [stone, setStone] = useState<string>(stoneOptions[0]);
  const [marble, setMarble] = useState<string>();
  const [width, setWidth] = useState<string>();
  const [length, setLength] = useState<string>();
  const [shape, setShape] = useState<string>(shapeOptions[0]);
  const [unit, setUnit] = useState<string>(unitOptions[0]);
  const [positionOne, setPositionOne] = useState({
    position: 'top',
    hasFinishing: false,
  } as FinishingPosition);
  const [positionTwo, setPositionTwo] = useState({
    position: 'rigth',
    hasFinishing: false,
  } as FinishingPosition);
  const [positionThree, setPositionThree] = useState({
    position: 'bottom',
    hasFinishing: false,
  } as FinishingPosition);
  const [positionFour, setPositionFour] = useState({
    position: 'left',
    hasFinishing: false,
  } as FinishingPosition);

  const [unitModalPickerVisible, setUnitModalPickerVisible] = useState(false);
  const [shapeModalPickerVisible, setShapeModalPickerVisible] = useState(false);
  const [stoneModalPickerVisible, setStoneModalPickerVisible] = useState(false);
  const [marbleModalPickerVisible, setMarbleModalPickerVisible] = useState(
    false,
  );

  const toggleModal = useCallback(
    (toggleModalStateFunction: React.Dispatch<SetStateAction<boolean>>) => {
      toggleModalStateFunction(oldProps => !oldProps);
    },
    [],
  );

  const handleChangeQuantity = useCallback((value: string) => {
    setQuantity(value);
  }, []);

  const handleChangeShape = useCallback((option: string) => {
    setShape(option);
  }, []);

  const handleChangeStone = useCallback((option: string) => {
    setStone(option);
  }, []);

  const handleChangeMarble = useCallback((option: string) => {
    setMarble(option);
  }, []);

  const handleChangeUnit = useCallback((option: string) => {
    setUnit(option);
  }, []);

  const handleSaveItem = useCallback(() => {
    const newItem = {
      id: generateId(),
      name,
      shape,
      stone,
      type: marble,
      quantity: parseInt(quantity, 10),
      measures: { width, length, unit },
    } as Item;
    addItemToProduct({ roomId, productId, item: newItem });

    navigation.goBack();
  }, [
    addItemToProduct,
    roomId,
    productId,
    name,
    shape,
    quantity,
    length,
    width,
    unit,
    marble,
    stone,
    navigation,
  ]);

  useEffect(() => {
    if (itemId) {
      const findItem = getItem({ roomId, productId, itemId });
      if (findItem) {
        setName(findItem.name);
        setStone(findItem.stone);
        setMarble(findItem.type);
        setWidth(findItem.measures.width);
        setLength(findItem.measures.length);
        setUnit(findItem.measures.unit);
        setQuantity(findItem.quantity.toString(10));
        setShape(findItem.shape);
      }
    }
  }, [getItem, itemId, productId, roomId]);

  return (
    <Container>
      <ScrollView>
        <Content>
          <ItemInput>
            <ItemInputLabel>Nome da Peça</ItemInputLabel>
            <ItemTextInput
              placeholder="Digite o nome da peça"
              placeholderTextColor="#A0A0A0"
              value={name}
              onChangeText={value => setName(value)}
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
              onChangeText={value => handleChangeQuantity(value)}
            />
            <ItemBottomLine />
          </ItemInput>

          <ItemInput>
            <ItemInputLabel>Pedra</ItemInputLabel>
            <ItemInputButton
              onPress={() => toggleModal(setStoneModalPickerVisible)}
            >
              <ItemInputButtonWrapper>
                <ItemInputButtonText isOptionSelected={!!stone}>
                  {stone || 'Escolha o tipo da pedra'}
                </ItemInputButtonText>
                <ListPickerModal
                  animationType="fade"
                  transparent
                  selectDefault={stone}
                  visible={stoneModalPickerVisible}
                  handleCloseModal={() =>
                    toggleModal(setStoneModalPickerVisible)
                  }
                  handleOnChange={handleChangeStone}
                  options={stoneOptions}
                />
              </ItemInputButtonWrapper>
            </ItemInputButton>
            <ItemBottomLine />
          </ItemInput>

          <ItemInput>
            <ItemInputLabel>Tipo</ItemInputLabel>
            <ItemInputButton
              onPress={() => toggleModal(setMarbleModalPickerVisible)}
            >
              <ItemInputButtonWrapper>
                <ItemInputButtonText isOptionSelected={!!marble}>
                  {marble || 'Escolha o mármore'}
                </ItemInputButtonText>
                <ListPickerModal
                  animationType="fade"
                  transparent
                  selectDefault={marble}
                  visible={marbleModalPickerVisible}
                  handleCloseModal={() =>
                    toggleModal(setMarbleModalPickerVisible)
                  }
                  handleOnChange={handleChangeMarble}
                  options={marbleOptions}
                />
              </ItemInputButtonWrapper>
            </ItemInputButton>
            <ItemBottomLine />
          </ItemInput>

          <ItemInput>
            <ItemInputLabel>Formato</ItemInputLabel>
            <ItemInputButton
              onPress={() => toggleModal(setShapeModalPickerVisible)}
            >
              <ItemInputButtonWrapper>
                <ItemInputButtonText isOptionSelected={!!shape}>
                  {shape || 'Escolha o formato'}
                </ItemInputButtonText>
                <ListPickerModal
                  animationType="fade"
                  transparent
                  selectDefault={shape}
                  visible={shapeModalPickerVisible}
                  handleCloseModal={() =>
                    toggleModal(setShapeModalPickerVisible)
                  }
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
                value={width}
                placeholderTextColor="#A0A0A0"
                onChangeText={value => setWidth(value)}
                onSubmitEditing={() => lengthInputRef.current?.focus()}
              />
              <ItemText>x</ItemText>
              <ItemWithTwoTextInput
                ref={lengthInputRef}
                keyboardType="number-pad"
                placeholder="Comprimento"
                value={length}
                placeholderTextColor="#A0A0A0"
                onChangeText={value => setLength(value)}
              />

              <UnitButton
                onPress={() => toggleModal(setUnitModalPickerVisible)}
              >
                <UnitButtonText>{unit}</UnitButtonText>
              </UnitButton>

              <ListPickerModal
                animationType="fade"
                transparent
                visible={unitModalPickerVisible}
                handleCloseModal={() => toggleModal(setUnitModalPickerVisible)}
                handleOnChange={handleChangeUnit}
                options={unitOptions}
              />
            </ItemWithTwoTextInputWrapper>
            <ItemBottomLine />
          </ItemInput>

          <ItemInput>
            <ItemInputLabel>Acabamento</ItemInputLabel>

            <SelectFinishingContainer>
              <SelectFinishingBackground>
                <EdgeFinishingButtonWrapper>
                  <FinishingSelectButton
                    onPress={() =>
                      setPositionOne(oldProps => ({
                        ...oldProps,
                        hasFinishing: !oldProps.hasFinishing,
                      }))
                    }
                    isSelected={positionOne.hasFinishing}
                    style={{ marginTop: -19 }}
                  >
                    <ButtonText isSelected={positionOne.hasFinishing}>
                      1
                    </ButtonText>
                  </FinishingSelectButton>
                </EdgeFinishingButtonWrapper>

                <MiddleFinishingButtonWrapper>
                  <FinishingSelectButton
                    isSelected={positionTwo.hasFinishing}
                    style={{ marginLeft: -19 }}
                    onPress={() =>
                      setPositionTwo(oldProps => ({
                        ...oldProps,
                        hasFinishing: !oldProps.hasFinishing,
                      }))
                    }
                  >
                    <ButtonText isSelected={positionTwo.hasFinishing}>
                      2
                    </ButtonText>
                  </FinishingSelectButton>
                  <FinishingSelectButton
                    isSelected={positionThree.hasFinishing}
                    style={{ marginRight: -19 }}
                    onPress={() =>
                      setPositionThree(oldProps => ({
                        ...oldProps,
                        hasFinishing: !oldProps.hasFinishing,
                      }))
                    }
                  >
                    <ButtonText isSelected={positionThree.hasFinishing}>
                      3
                    </ButtonText>
                  </FinishingSelectButton>
                </MiddleFinishingButtonWrapper>

                <EdgeFinishingButtonWrapper>
                  <FinishingSelectButton
                    isSelected={positionFour.hasFinishing}
                    style={{ marginBottom: -19 }}
                    onPress={() =>
                      setPositionFour(oldProps => ({
                        ...oldProps,
                        hasFinishing: !oldProps.hasFinishing,
                      }))
                    }
                  >
                    <ButtonText isSelected={positionFour.hasFinishing}>
                      4
                    </ButtonText>
                  </FinishingSelectButton>
                </EdgeFinishingButtonWrapper>
              </SelectFinishingBackground>
            </SelectFinishingContainer>
          </ItemInput>

          <ButtonWrapper>
            <Button onPress={handleSaveItem}>Salvar</Button>
          </ButtonWrapper>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default CreateItem;
