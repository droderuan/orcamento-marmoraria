import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  SetStateAction,
} from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { ScrollView, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';

import generateId from '@utils/GenerateID';
import StonesImages from '@assets/images/pedra';

import Item from '@dtos/Item';

import Button from '@components/Button';
import ListPickerModal from '@components/ListPickerModal';
import Input from '@components/Input';
import { useBudget } from '@hooks/budget';

import Rectangular from './components/Rectangular';

import {
  Container,
  Content,
  ItemWithTwoTextInput,
  ItemWithTwoTextInputWrapper,
  ItemText,
  UnitButton,
  UnitButtonText,
  ItemInputButton,
  ItemInputButtonWrapper,
  ItemInputButtonText,
  RadioButtomItem,
  ButtonWrapper,
} from './styles';

interface RouteParams {
  roomId: string;
  productId: string;
  itemId: string;
  stoneNumber: string;
  stoneType: {
    type: string;
    stone: string;
    name: string;
  };
}

interface FinishingPosition {
  position: string;
  type: string;
  hasFinishing: boolean;
}

const CreateItem: React.FC = () => {
  const { saveItem, createItem, getItem } = useBudget();

  const route = useRoute();

  const {
    roomId,
    productId,
    itemId,
    stoneNumber,
    stoneType,
  } = route.params as RouteParams;
  const { navigate } = useNavigation();

  const lengthInputRef = useRef<TextInput | null>(null);

  const [isNewItem, setIsNewItem] = useState(true);

  const [item, setItem] = useState(() => {
    if (itemId) {
      const findItem = getItem({ roomId, productId, itemId });
      if (findItem) {
        return findItem;
      }
    }
    return {
      id: generateId(),
      name: `Pedra${stoneNumber}`,
      quantity: '1',
      shape: 'Retangular',
      surfaceFinish: 'Polido',
      edgeFinishing: '',
      edgeFinishingPosition: [],
      measures: {
        unit: 'cm',
        length: '',
        width: '',
      },
      stoneType: {
        stone: '',
        type: '',
      },
    } as Item;
  });

  const [stoneImage, setStoneImage] = useState<any>(null);
  const [unitModalPickerVisible, setUnitModalPickerVisible] = useState(false);

  const [
    finishingModalPickerVisible,
    setFinishingModalPickerVisible,
  ] = useState(false);

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
    setItem(oldItem => ({ ...oldItem, stoneType: { type, stone } }));
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
      const toUpdatefinishing = [...item.edgeFinishingPosition];
      const checkExist = toUpdatefinishing.findIndex(
        finishing => finishing.position === position,
      );

      if (checkExist !== -1) {
        toUpdatefinishing.splice(checkExist, 1);
      } else {
        toUpdatefinishing.push({ position });
      }

      setItem(oldItem => ({
        ...oldItem,
        edgeFinishingPosition: toUpdatefinishing.sort(
          (a, b) => parseInt(a.position, 10) - parseInt(b.position, 10),
        ),
      }));
    },
    [item.edgeFinishingPosition],
  );

  const navigateToSelectStone = useCallback(() => {
    navigate('SelectStone');
  }, [navigate]);

  const navigateToSelectEdgeFinish = useCallback(() => {
    navigate('SelectEdgeFinish');
  }, [navigate]);

  const handleSetImage = useCallback(
    ({ type, imageName }) => {
      if (item.stoneType.stone) {
        const image = StonesImages.stonesType
          .find(stones => stones.type === type)
          ?.stones.find(stones => stones.display === imageName);
        if (!image) {
          throw new Error('Image does not exist');
        }
        setStoneImage(image?.img);
      }
    },
    [item.stoneType.stone],
  );

  const handleSaveItem = useCallback(() => {
    if (isNewItem) {
      createItem({ roomId, productId, item });
    } else {
      saveItem({ roomId, productId, item });
    }

    navigate('RoomProducts', { stoneType });
  }, [
    saveItem,
    createItem,
    isNewItem,
    roomId,
    productId,
    item,
    navigate,
    stoneType,
  ]);

  useEffect(() => {
    if (itemId) {
      handleSetImage({
        type: item.stoneType.type,
        imageName: item.stoneType.stone,
      });
      setIsNewItem(false);
    }
  }, [itemId, item.stoneType.type, item.stoneType.stone, handleSetImage]);

  useEffect(() => {
    if (stoneType) {
      handleChangeStone({ type: stoneType.type, stone: stoneType.stone });
      handleSetImage({ type: stoneType.type, imageName: stoneType.stone });
    }
  }, [handleChangeStone, stoneType, handleSetImage]);

  return (
    <Container>
      <ScrollView>
        <Content>
          <Input
            label="Nome da Peça"
            placeholder="Digite o nome da peça"
            placeholderTextColor="#A0A0A0"
            value={item.name}
            selectTextOnFocus
            onChangeText={value => handleChangeName(value)}
          />

          <Input
            label="Quantidade"
            keyboardType="number-pad"
            placeholderTextColor="#A0A0A0"
            value={item.quantity.toString()}
            maxLength={10}
            onChangeText={value => handleChangeQuantity(value)}
          />

          <Input label="Pedra">
            <ItemInputButton onPress={() => navigateToSelectStone()}>
              <ItemInputButtonWrapper>
                <ItemInputButtonText isOptionSelected={!!item?.stoneType.stone}>
                  {item.stoneType.stone || 'Escolha o tipo da pedra'}
                </ItemInputButtonText>
              </ItemInputButtonWrapper>
            </ItemInputButton>
          </Input>

          <Input label="Formato">
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
          </Input>

          <Input label="Medidas">
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
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 2.5,

                  elevation: 4,
                }}
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
          </Input>

          <Input label="Acabamento de superfície">
            <ItemInputButton
              onPress={() => toggleModal(setFinishingModalPickerVisible)}
            >
              <ItemInputButtonWrapper>
                <ItemInputButtonText isOptionSelected={!!item.surfaceFinish}>
                  {item.surfaceFinish || 'Escolha o acabamento da superfície'}
                </ItemInputButtonText>
              </ItemInputButtonWrapper>
            </ItemInputButton>
            <ListPickerModal
              animationType="fade"
              transparent
              selectDefault={item.surfaceFinish}
              visible={finishingModalPickerVisible}
              handleCloseModal={() =>
                toggleModal(setFinishingModalPickerVisible)
              }
              handleOnChange={value => handleChangeSurfaceFinish(value)}
              options={finishingOptions}
            />
          </Input>

          <Input label="Acabamento das bordas">
            <ItemInputButton onPress={() => navigateToSelectEdgeFinish()}>
              <ItemInputButtonWrapper>
                <ItemInputButtonText isOptionSelected={!!item?.stoneType.stone}>
                  {item.stoneType.stone ||
                    'Escolha o tipo do acabamento da borda'}
                </ItemInputButtonText>
              </ItemInputButtonWrapper>
            </ItemInputButton>

            {item.shape === 'Retangular' && (
              <Rectangular
                stoneImage={stoneImage}
                edgeFinishing={item.edgeFinishingPosition}
                handleChangeFinishingPosition={handleChangeFinishingPosition}
              />
            )}
          </Input>

          <ButtonWrapper>
            <Button onPress={handleSaveItem}>Salvar</Button>
          </ButtonWrapper>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default CreateItem;
