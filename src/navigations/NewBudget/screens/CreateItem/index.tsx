import React, { useCallback, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import ItemProps from '@dtos/Item';

import Input from '@components/FormInput';
import Button from '@components/Button';
import Picker from '../../components/PickerInput';

import {
  Container,
  ItemInput,
  ItemInputLabel,
  ItemTextInput,
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
  const [shape, setShape] = useState('Retangular');

  // const handleSubmit = useCallback(
  //   ({ name, phone }: ClientInfo) => {
  //     navigation.replace('MainPage', { name, phone });
  //   },
  //   [navigation],
  // );

  return (
    <Container>
      {/* <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="ClientName" displayName={productId} />
        <Input name="Phone" displayName={roomId} keyboardType="numeric" />
        <Button
          onPress={() => formRef.current?.submitForm()}
          style={{ marginTop: 45 }}
        >
          Continuar
        </Button>
      </Form> */}
      <ItemInput>
        <ItemInputLabel>Nome da Peça</ItemInputLabel>
        <ItemTextInput placeholder="Digite o nome da peça" />
        <ItemBottomLine />
      </ItemInput>

      <ItemInput>
        <ItemInputLabel>Formato</ItemInputLabel>
        <Picker
          title="Escolha o formato"
          handleOnChange={setShape}
          options={['Retangular', 'Circular']}
        />
        <ItemBottomLine />
      </ItemInput>

      <ItemInput>
        <ItemInputLabel>Medidas</ItemInputLabel>
        <ItemTextInput placeholder="Digite as medidas" />
        <ItemBottomLine />
      </ItemInput>
    </Container>
  );
};

export default CreateItem;
