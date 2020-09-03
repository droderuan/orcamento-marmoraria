import React, { useCallback, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../../../components/FormInput';
import Button from '../../../../components/Button';

import { Container } from './styles';

const FirstClientInfo: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSubmit = useCallback((data: any) => {
    console.log(data);

    navigation.navigate('MainPage');
  }, []);

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
