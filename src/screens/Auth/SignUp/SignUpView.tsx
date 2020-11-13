import React, { useRef } from 'react';
import { Button as PaperButton } from 'react-native-paper';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import FormInput from '@components/FormInput';
import Button from '@components/Button';

import {
  Container,
  Title,
  ButtonContainer,
  ButtonContainerDivider,
  Line,
  ButtonContainerDividerText,
} from './styles';

interface SignUpViewProps {
  handleSubmitCreateAccount: (data: { [key: string]: string }) => void;
}

const SignUpView: React.FC<SignUpViewProps> = ({
  handleSubmitCreateAccount,
}) => {
  const formRef = useRef<FormHandles>(null);

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
          <Title>Crie a sua conta!</Title>
          <Form onSubmit={handleSubmitCreateAccount} ref={formRef}>
            <FormInput
              name="user"
              displayName="Digite seu nome"
              autoCapitalize="words"
              keyboardType="default"
            />
            <FormInput
              name="user"
              displayName="Digite o seu email"
              keyboardType="email-address"
            />
            <FormInput
              name="password"
              displayName="Digite sua senha"
              secureTextEntry
            />
            <FormInput
              name="confirmPassword"
              displayName="Confirme a senha"
              secureTextEntry
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <ButtonContainer>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Criar conta
              </Button>
            </ButtonContainer>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpView;
