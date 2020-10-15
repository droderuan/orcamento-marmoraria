import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  SetStateAction,
  useMemo,
} from 'react';
import { RadioButton } from 'react-native-paper';
import { ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
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
  RadioButtomItem,
  ButtonWrapper,
  SelectFinishingContainer,
  SelectFinishingBackground,
  EdgeFinishingButtonWrapper,
  MiddleFinishingButtonWrapper,
  ButtonText,
  FinishingSelectButton,
  FinishingSelectType,
  FinishingNumber,
} from './styles';

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

const CreateItem: React.FC = () => {
  const { addOrSaveItem, getItem } = useBudget();
  const route = useRoute();
  const { navigate, goBack } = useNavigation();
  const { productId, roomId, itemId } = route.params as RouteParams;

  const lengthInputRef = useRef<TextInput | null>(null);

  const unitOptions = ['cm', 'm', 'mm'];
  const shapeOptions = ['Retangular', 'Circular'];
  const finishingOptions = [
    'Apicoado',
    'Bruto',
    'Flameado',
    'Jateado',
    'Levigado',
    'Polido',
    'Resinado',
  ];
  const finishingEdgeOptions = [
    'sanduiche',
    'simples duplo',
    'sanduiche recuado',
    'reto simples',
    'reto duplo',
    'reto com encaixe',
    'rebaixo invertido',
    'rebaixo',
    'reto 45 graus 10cm',
    'reto 45 graus',
    'espelho 1 2',
    'chanfrado simples',
    'chanfrado invertido',
    'chanfrado duplo',
    'boleado triplo3',
    'boleado',
    'boleado triplo1',
    'boleado triplo2',
    'boleado simples',
    'boleado duplo2',
    'boleado duplo1',
    'boleado com rebaixo',
    'bisoto',
    '45 grau',
    '1/2 cana',
    '1/2 cana dupla 2',
    '1/2 boleado simples',
    '1/2 cana com frisos',
    '1/2 cana invertida',
    '1/2 cana dupla',
    '1/2 cana tripla',
    '1/2 cana com boleado',
  ];

  const [item, setItem] = useState(() => {
    if (itemId) {
      const findItem = getItem({ roomId, productId, itemId });
      if (findItem) {
        return findItem;
      }
    }
    return {
      id: generateId(),
      name: '',
      quantity: '1',
      shape: 'Retangular',
      stone: '',
      type: '',
      surfaceFinish: '',
      finishing: [],
      measures: {
        unit: 'cm',
        length: '',
        width: '',
      },
    } as Item;
  });

  const [unitModalPickerVisible, setUnitModalPickerVisible] = useState(false);
  const [
    finishingModalPickerVisible,
    setFinishingModalPickerVisible,
  ] = useState(false);
  const [marbleModalPickerVisible, setMarbleModalPickerVisible] = useState(
    false,
  );

  const positionOne = useMemo(
    () => !!item.finishing.find(finish => finish.position === '1'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(item.finishing), item.finishing],
  );

  const positionTwo = useMemo(
    () => !!item.finishing.find(finish => finish.position === '2'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(item.finishing), item.finishing],
  );

  const positionThree = useMemo(
    () => !!item.finishing.find(finish => finish.position === '3'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(item.finishing), item.finishing],
  );

  const positionFour = useMemo(
    () => !!item.finishing.find(finish => finish.position === '4'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(item.finishing), item.finishing],
  );

  const toggleModal = useCallback(
    (toggleModalStateFunction: React.Dispatch<SetStateAction<boolean>>) => {
      toggleModalStateFunction(oldProps => !oldProps);
    },
    [],
  );

  const handleChangeName = useCallback((value: string) => {
    setItem(oldItem => ({ ...oldItem, name: value }));
  }, []);

  const handleChangeQuantity = useCallback((value: string) => {
    setItem(oldItem => ({ ...oldItem, quantity: value }));
  }, []);

  const handleChangeShape = useCallback((value: string) => {
    setItem(oldItem => ({ ...oldItem, shape: value }));
  }, []);

  const handleChangeStone = useCallback(({ type, stone }) => {
    setItem(oldItem => ({ ...oldItem, type, stone }));
  }, []);

  const handleChangeSurfaceFinish = useCallback((value: string) => {
    setItem(oldItem => ({ ...oldItem, surfaceFinish: value }));
  }, []);

  const handleChangeMeasure = useCallback(
    ({
      unit = item.measures.unit,
      width = item.measures.width,
      length = item.measures.length,
    }) => {
      setItem(oldItem => ({
        ...oldItem,
        measures: { unit, width, length },
      }));
    },
    [item.measures.unit, item.measures.width, item.measures.length],
  );

  const handleChangeFinishingPosition = useCallback(
    (position: string) => {
      const toUpdatefinishing = item.finishing;
      const checkExist = toUpdatefinishing.findIndex(
        finishing => finishing.position === position,
      );
      if (checkExist !== -1) {
        toUpdatefinishing.splice(checkExist, 1);
      } else {
        toUpdatefinishing.push({ position, type: '' });
      }

      setItem(oldItem => ({
        ...oldItem,
        finishing: toUpdatefinishing.sort(
          (a, b) => parseInt(a.position, 10) - parseInt(b.position, 10),
        ),
      }));
    },
    [item.finishing],
  );

  const navigateToSelectStone = useCallback(() => {
    navigate('SelectStone', {
      handleChangeStone,
    });
  }, [navigate, handleChangeStone]);

  const handleSaveItem = useCallback(() => {
    addOrSaveItem({ roomId, productId, item });

    goBack();
  }, [addOrSaveItem, roomId, productId, item, goBack]);

  useEffect(() => {
    if (itemId) {
      const findItem = getItem({ roomId, productId, itemId });
      if (findItem) {
        setItem(findItem);
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
              value={item.name}
              onChangeText={value => handleChangeName(value)}
            />
            <ItemBottomLine />
          </ItemInput>

          <ItemInput>
            <ItemInputLabel>Quantidade</ItemInputLabel>
            <ItemTextInput
              keyboardType="number-pad"
              placeholderTextColor="#A0A0A0"
              value={item.quantity.toString()}
              maxLength={10}
              onChangeText={value => handleChangeQuantity(value)}
            />
            <ItemBottomLine />
          </ItemInput>

          <ItemInput>
            <ItemInputLabel>Pedra</ItemInputLabel>
            <ItemInputButton onPress={() => navigateToSelectStone()}>
              <ItemInputButtonWrapper>
                <ItemInputButtonText isOptionSelected={!!item?.stone}>
                  {item.stone || 'Escolha o tipo da pedra'}
                </ItemInputButtonText>
              </ItemInputButtonWrapper>
            </ItemInputButton>
            <ItemBottomLine />
          </ItemInput>

          <ItemInput>
            <ItemInputLabel>Formato</ItemInputLabel>
            <RadioButton.Group
              onValueChange={value => handleChangeShape(value)}
              value={item.shape}
            >
              {shapeOptions.map(shapeOption => (
                <RadioButtomItem key={shapeOption}>
                  <RadioButton.Item
                    label={shapeOption}
                    value={shapeOption}
                    labelStyle={{ fontSize: 20 }}
                    style={{
                      flexDirection: 'row-reverse',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  />
                </RadioButtomItem>
              ))}
            </RadioButton.Group>

            <ItemBottomLine />
          </ItemInput>

          <ItemInput>
            <ItemInputLabel>Medidas</ItemInputLabel>
            <ItemWithTwoTextInputWrapper>
              <ItemWithTwoTextInput
                keyboardType="number-pad"
                placeholder="Largura"
                value={item.measures.width}
                placeholderTextColor="#A0A0A0"
                onChangeText={value => handleChangeMeasure({ width: value })}
                onSubmitEditing={() => lengthInputRef.current?.focus()}
              />
              <ItemText>x</ItemText>
              <ItemWithTwoTextInput
                ref={lengthInputRef}
                keyboardType="number-pad"
                placeholder="Comprimento"
                value={item.measures.length}
                placeholderTextColor="#A0A0A0"
                onChangeText={value => handleChangeMeasure({ length: value })}
              />

              <UnitButton
                onPress={() => toggleModal(setUnitModalPickerVisible)}
              >
                <UnitButtonText>{item.measures?.unit}</UnitButtonText>
              </UnitButton>

              <ListPickerModal
                animationType="fade"
                transparent
                selectDefault="cm"
                visible={unitModalPickerVisible}
                handleCloseModal={() => toggleModal(setUnitModalPickerVisible)}
                handleOnChange={value => handleChangeMeasure({ unit: value })}
                options={unitOptions}
              />
            </ItemWithTwoTextInputWrapper>
            <ItemBottomLine />
          </ItemInput>

          <ItemInput>
            <ItemInputLabel>Acabamento de superfície</ItemInputLabel>
            <ItemInputButton
              onPress={() => toggleModal(setFinishingModalPickerVisible)}
            >
              <ItemInputButtonWrapper>
                <ItemInputButtonText isOptionSelected={!!item.surfaceFinish}>
                  {item.surfaceFinish || 'Escolha o tipo da pedra'}
                </ItemInputButtonText>
              </ItemInputButtonWrapper>
            </ItemInputButton>
            <ListPickerModal
              animationType="fade"
              transparent
              selectDefault="Polido"
              visible={finishingModalPickerVisible}
              handleCloseModal={() =>
                toggleModal(setFinishingModalPickerVisible)
              }
              handleOnChange={value => handleChangeSurfaceFinish(value)}
              options={finishingOptions}
            />

            <ItemBottomLine />
          </ItemInput>

          <ItemInput>
            <ItemInputLabel>Acabamento</ItemInputLabel>

            <SelectFinishingContainer>
              <SelectFinishingBackground>
                <EdgeFinishingButtonWrapper>
                  <FinishingSelectButton
                    onPress={() => handleChangeFinishingPosition('1')}
                    isSelected={!!positionOne}
                    style={{ marginTop: -19 }}
                  >
                    <ButtonText isSelected={!!positionOne}>1</ButtonText>
                  </FinishingSelectButton>
                </EdgeFinishingButtonWrapper>

                <MiddleFinishingButtonWrapper>
                  <FinishingSelectButton
                    isSelected={positionTwo}
                    style={{ marginLeft: -19 }}
                    onPress={() => handleChangeFinishingPosition('2')}
                  >
                    <ButtonText isSelected={positionTwo}>2</ButtonText>
                  </FinishingSelectButton>
                  <FinishingSelectButton
                    isSelected={positionThree}
                    style={{ marginRight: -19 }}
                    onPress={() => handleChangeFinishingPosition('3')}
                  >
                    <ButtonText isSelected={positionThree}>3</ButtonText>
                  </FinishingSelectButton>
                </MiddleFinishingButtonWrapper>

                <EdgeFinishingButtonWrapper>
                  <FinishingSelectButton
                    isSelected={positionFour}
                    style={{ marginBottom: -19 }}
                    onPress={() => handleChangeFinishingPosition('4')}
                  >
                    <ButtonText isSelected={positionFour}>4</ButtonText>
                  </FinishingSelectButton>
                </EdgeFinishingButtonWrapper>
              </SelectFinishingBackground>
            </SelectFinishingContainer>

            {item.finishing.map(finish => (
              <FinishingSelectType key={finish.position}>
                <FinishingNumber>{finish.position}</FinishingNumber>
              </FinishingSelectType>
            ))}

            <ItemBottomLine />
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
