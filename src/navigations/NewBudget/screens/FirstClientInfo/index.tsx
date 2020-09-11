import React, { useCallback, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../../../components/FormInput';
import Button from '../../../../components/Button';

import { Container } from './styles';

interface FirstClientInfoProps {
  navigation: StackNavigationProp<any, any>;
}

interface ClientInfo {
  name: string;
  phone: string;
}

const FirstClientInfo: React.FC<FirstClientInfoProps> = ({ navigation }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    ({ name, phone }: ClientInfo) => {
      navigation.replace('MainPage', { name, phone });
    },
    [navigation],
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="ClientName" displayName="Nome do cliente" />
        <Input name="Phone" displayName="Telefone" keyboardType="numeric" />
        <Button
          onPress={() => formRef.current?.submitForm()}
          style={{ marginTop: 45 }}
        >
          Continuar
        </Button>
      </Form>
    </Container>
  );
};

export default FirstClientInfo;
