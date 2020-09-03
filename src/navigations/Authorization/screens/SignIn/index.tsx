import React, { useRef, useCallback } from 'react';

import { useAuth } from '@hooks/Auth';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';

import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import FormInput from '@components/FormInput';
import Button from '@components/Button';

import LogoFake from '../../../../assets/logo.png';

import { Container, Logo, ButtonContainer } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const navigation = useNavigation();

  const handleSubmit = useCallback(
    data => {
      console.log(data);

      signIn();
    },
    [signIn],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Logo source={LogoFake} />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <FormInput name="user" displayName="Usuário" />
            <FormInput name="password" displayName="Senha" secureTextEntry />
            <ButtonContainer>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </ButtonContainer>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
