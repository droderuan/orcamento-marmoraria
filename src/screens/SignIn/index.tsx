import React, { useRef, useCallback } from 'react';
import { Button as PaperButton } from 'react-native-paper';

import { useAuth } from '@hooks/Auth';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import FormInput from '@components/FormInput';
import Button from '@components/Button';

import LogoFake from '@assets/logo.png';

import {
  Container,
  Logo,
  ButtonContainer,
  ButtonContainerDivider,
  Line,
  ButtonContainerDividerText,
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signInWithGoogle } = useAuth();

  const handleSubmit = useCallback(data => {}, []);

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
            <FormInput
              name="user"
              displayName="Usuário"
              keyboardType="default"
            />
            <FormInput
              name="password"
              displayName="Senha"
              secureTextEntry
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <ButtonContainer>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
              <ButtonContainerDivider>
                <Line />
                <ButtonContainerDividerText>ou</ButtonContainerDividerText>
                <Line />
              </ButtonContainerDivider>
              <PaperButton
                onPress={signInWithGoogle}
                icon="google"
                color="#EA4335"
                mode="contained"
                style={{ marginBottom: 20 }}
              >
                Entrar com Google
              </PaperButton>
              <PaperButton color="#4267b2" mode="contained" icon="facebook">
                Entrar com Facebook
              </PaperButton>
            </ButtonContainer>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
