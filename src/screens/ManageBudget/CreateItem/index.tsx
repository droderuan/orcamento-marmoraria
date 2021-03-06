import React, { useCallback, useState, useEffect, SetStateAction } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { RadioButton } from 'react-native-paper';

import generateId from '@utils/GenerateID';
import StonesImages from '@assets/images/pedra';

import Item from '@dtos/Item';

import Button from '@components/Button';
import ListPickerModal from '@components/ListPickerModal';
import Input from '@components/Input';
import { useBudget } from '@hooks/budget';

import RectangularSelectEdge from './components/RectangularSelectEdge';
import RectangularMeasures from './components/RectangularMeasures';
import CircleSelectEdge from './components/CircleSelectEdge';
import CircleMeasures from './components/CircleMeasures';

import {
  Container,
  Content,
  ItemWithTwoTextInputWrapper,
  UnitButton,
  UnitButtonText,
  ItemInputButton,
  ItemInputButtonWrapper,
  ItemInputButtonText,
  RadioButtomItem,
  ButtonWrapper,
  TextAreaContainer,
  TextArea,
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

interface EdgeFinishingPosition {
  position: string;
  name: string;
}

const CreateItem: React.FC = () => {
  const {
    saveItem,
    createItem,
    getItem,
    editingItem,
    saveEditingItem,
    removeEditingItem,
  } = useBudget();

  const route = useRoute();

  const {
    roomId,
    productId,
    itemId,
    stoneNumber,
    stoneType,
  } = route.params as RouteParams;

  const { navigate, setOptions } = useNavigation();

  const [isNewItem, setIsNewItem] = useState(true);

  useEffect(() => {
    if (itemId) {
      const findItem = getItem({ roomId, productId, itemId });
      if (findItem) {
        saveEditingItem(findItem);
      }
    } else {
      saveEditingItem({
        id: generateId(),
        name: `Pedra${stoneNumber}`,
        quantity: '1',
        shape: 'Retangular',
        unit: 'cm',
        measures: {
          displayMeasures: '',
          length: '',
          width: '',
        },
        surfaceFinish: 'Polido',
        edgeFinishing: {
          name: '',
          type: '',
        },
        edgeFinishingPosition: [],
        stoneType: {
          stone: '',
          type: '',
        },
        moreInfo: '',
      } as Item);
    }
  }, []);

  useEffect(() => {
    setOptions({ headerTitle: `Editar/Salvar Peça` });
  }, [editingItem.name, setOptions]);

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

  const handleChangeName = useCallback(
    (value: string) => {
      saveEditingItem({ name: value });
    },
    [saveEditingItem],
  );

  const handleChangeQuantity = useCallback(
    (value: string) => {
      saveEditingItem({ quantity: value });
    },
    [saveEditingItem],
  );

  const handleChangeShape = useCallback(
    (value: string) => {
      saveEditingItem({ shape: value });
    },
    [saveEditingItem],
  );

  const handleChangeStone = useCallback(
    ({ type, stone }) => {
      if (stone !== editingItem.stoneType.stone) {
        saveEditingItem({ stoneType: { type, stone } });
      }
    },
    [saveEditingItem, editingItem.stoneType.stone],
  );

  const handleChangeSurfaceFinish = useCallback(
    (value: string) => {
      saveEditingItem({ surfaceFinish: value });
    },
    [saveEditingItem],
  );

  const handleChangeUnit = useCallback(
    ({ unit }) => {
      saveEditingItem({ unit });
    },
    [saveEditingItem],
  );

  const handleChangeMoreInfo = useCallback(
    (value: string) => {
      saveEditingItem({ moreInfo: value });
    },
    [saveEditingItem],
  );

  const handleChangeFinishingPosition = useCallback(
    ({ name, position }: EdgeFinishingPosition) => {
      const toUpdatefinishing = [...editingItem.edgeFinishingPosition];
      const checkExist = toUpdatefinishing.findIndex(
        finishing => finishing.position === position,
      );

      if (checkExist !== -1) {
        toUpdatefinishing.splice(checkExist, 1);
      } else {
        toUpdatefinishing.push({ position, name });
      }
      toUpdatefinishing.sort((a, b) => {
        const positionA = parseInt(a.position, 10);
        const positionB = parseInt(b.position, 10);
        if (positionA < positionB) {
          return -1;
        }
        if (positionA > positionB) {
          return 1;
        }
        return 0;
      });

      saveEditingItem({
        edgeFinishingPosition: toUpdatefinishing,
      });
    },
    [editingItem.edgeFinishingPosition, saveEditingItem],
  );

  const navigateToSelectStone = useCallback(() => {
    navigate('SelectStone');
  }, [navigate]);

  const navigateToSelectEdgeFinish = useCallback(() => {
    navigate('SelectEdgeFinish');
  }, [navigate]);

  const handleSetImage = useCallback(
    ({ type, imageName }) => {
      if (editingItem.stoneType.stone) {
        const image = StonesImages.stonesType
          .find(stones => stones.type === type)
          ?.stones.find(stones => stones.display === imageName);

        if (!image) {
          throw new Error('Image does not exist');
        }

        setStoneImage(image.img);
      }
    },
    [editingItem.stoneType.stone],
  );

  const handleSaveItem = useCallback(() => {
    Reactotron.display({
      name: 'Item to save',
      value: editingItem,
      important: true,
    });

    if (isNewItem) {
      createItem({ roomId, productId, item: editingItem });
    } else {
      saveItem({ roomId, productId, item: editingItem });
    }
    removeEditingItem();
    navigate('RoomProducts', { stoneType });
  }, [
    saveItem,
    createItem,
    isNewItem,
    roomId,
    productId,
    navigate,
    stoneType,
    editingItem,
    removeEditingItem,
  ]);

  useEffect(() => {
    if (itemId) {
      handleSetImage({
        type: editingItem.stoneType.type,
        imageName: editingItem.stoneType.stone,
      });
      setIsNewItem(false);
    }
  }, [
    itemId,
    editingItem.stoneType.type,
    editingItem.stoneType.stone,
    handleSetImage,
  ]);

  useEffect(() => {
    if (stoneType) {
      handleChangeStone({ type: stoneType.type, stone: stoneType.stone });
      handleSetImage({ type: stoneType.type, imageName: stoneType.stone });
    }
  }, [stoneType, handleSetImage, handleChangeStone]);

  return (
    <Container>
      <ScrollView>
        <Content>
          <Input
            label="Nome da Peça"
            placeholder="Digite o nome da peça"
            placeholderTextColor="#A0A0A0"
            value={editingItem.name}
            selectTextOnFocus
            onChangeText={value => handleChangeName(value)}
          />

          <Input
            label="Quantidade"
            keyboardType="number-pad"
            placeholderTextColor="#A0A0A0"
            value={editingItem.quantity.toString()}
            maxLength={10}
            onChangeText={value => handleChangeQuantity(value)}
          />

          <Input label="Pedra">
            <ItemInputButton onPress={() => navigateToSelectStone()}>
              <ItemInputButtonWrapper>
                <ItemInputButtonText
                  isOptionSelected={!!editingItem?.stoneType.stone}
                >
                  {editingItem.stoneType.stone || 'Escolha o tipo da pedra'}
                </ItemInputButtonText>
              </ItemInputButtonWrapper>
            </ItemInputButton>
          </Input>

          <Input label="Formato">
            <RadioButton.Group
              onValueChange={value => handleChangeShape(value)}
              value={editingItem.shape}
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
              {editingItem.shape === 'Retangular' && <RectangularMeasures />}
              {editingItem.shape === 'Circular' && <CircleMeasures />}

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
                <UnitButtonText>{editingItem.unit}</UnitButtonText>
              </UnitButton>

              <ListPickerModal
                animationType="fade"
                transparent
                selectDefault="cm"
                visible={unitModalPickerVisible}
                handleCloseModal={() => toggleModal(setUnitModalPickerVisible)}
                handleOnChange={value => handleChangeUnit({ unit: value })}
                options={unitOptions}
              />
            </ItemWithTwoTextInputWrapper>
          </Input>

          <Input label="Acabamento de superfície">
            <ItemInputButton
              onPress={() => toggleModal(setFinishingModalPickerVisible)}
            >
              <ItemInputButtonWrapper>
                <ItemInputButtonText
                  isOptionSelected={!!editingItem.surfaceFinish}
                >
                  {editingItem.surfaceFinish ||
                    'Escolha o acabamento da superfície'}
                </ItemInputButtonText>
              </ItemInputButtonWrapper>
            </ItemInputButton>
            <ListPickerModal
              animationType="fade"
              transparent
              selectDefault={editingItem.surfaceFinish}
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
                <ItemInputButtonText
                  isOptionSelected={!!editingItem.edgeFinishing.name}
                >
                  {editingItem.edgeFinishing.name ||
                    'Escolha o tipo do acabamento da borda'}
                </ItemInputButtonText>
              </ItemInputButtonWrapper>
            </ItemInputButton>

            {editingItem.shape === 'Retangular' && (
              <RectangularSelectEdge
                stoneImage={stoneImage}
                edgeFinishing={editingItem.edgeFinishingPosition}
                handleChangeFinishingPosition={handleChangeFinishingPosition}
              />
            )}
            {editingItem.shape === 'Circular' && (
              <CircleSelectEdge
                stoneImage={stoneImage}
                edgeFinishing={editingItem.edgeFinishingPosition}
                handleChangeFinishingPosition={handleChangeFinishingPosition}
              />
            )}
          </Input>
          <Input label="Mais informações">
            <TextAreaContainer>
              <TextArea
                numberOfLines={10}
                multiline
                placeholder="Digite aqui"
                style={{ textAlignVertical: 'top' }}
                value={editingItem.moreInfo}
                onChangeText={value => handleChangeMoreInfo(value)}
              />
            </TextAreaContainer>
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
