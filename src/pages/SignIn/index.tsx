import React, { useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';

import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import FormInput from '../../components/FormInput';

import LogoFake from '../../assets/logo.png';

import { Container, Logo, SignInButton, SignInButtonText } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

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
          <Form onSubmit={() => {}} ref={formRef}>
            <FormInput name="user" displayName="Usuário" />
            <FormInput name="password" displayName="Senha" secureTextEntry />
            <SignInButton
              onPress={() => {
                navigation.navigate('Drawer');
              }}
            >
              <SignInButtonText>Entrar</SignInButtonText>
            </SignInButton>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
