import React, { useCallback, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { useRoute } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import ItemProps from '@dtos/Item';

import ListPickerModal from '@components/ListPickerModal';

import {
  Container,
  ItemInput,
  ItemInputLabel,
  ItemTextInput,
  ItemInputButton,
  ItemInputButtonWrapper,
  ItemInputButtonText,
  ItemBottomLine,
} from './styles';

interface FirstClientInfoProps {
  navigation: StackNavigationProp<any, any>;
}

interface RouteParams {
  roomId: string;
  productId: string;
}

const CreateItem: React.FC<FirstClientInfoProps> = ({ navigation }) => {
  const formRef = useRef<FormHandles>(null);
  const route = useRoute();
  const { productId, roomId } = route.params as RouteParams;

  const [item, setItem] = useState({} as ItemProps);
  const [shape, setShape] = useState<string>();
  const [shapeModalPickerVisible, setShapeModalPickerVisible] = useState(false);

  const shapeOptions = ['Retangular', 'Circular', 'Triangulo'];

  const openShapeModal = useCallback(() => {
    setShapeModalPickerVisible(true);
  }, [setShapeModalPickerVisible]);

  const closeShapeModal = useCallback(() => {
    setShapeModalPickerVisible(false);
  }, [setShapeModalPickerVisible]);

  const handleChangeShape = useCallback((option: string) => {
    setShape(option);
  }, []);

  return (
    <Container>
      <ItemInput>
        <ItemInputLabel>Nome da Peça</ItemInputLabel>
        <ItemTextInput
          placeholder="Digite o nome da peça"
          placeholderTextColor="#A0A0A0"
        />
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
        <ItemTextInput
          placeholder="Digite as medidas"
          placeholderTextColor="#A0A0A0"
        />
        <ItemBottomLine />
      </ItemInput>
    </Container>
  );
};

export default CreateItem;
