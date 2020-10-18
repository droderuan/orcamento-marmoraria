import React, { useCallback, useState } from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import { useBudget } from '../../hooks/budget';

import Input from '../../components/Input';
import SectionLabel from '../../components/SectionLabel';

import { Container, ScrollView, ButtonAdressWrapper } from './styles';

const Client: React.FC = () => {
  const { navigate } = useNavigation();
  const { saveClient, client } = useBudget();

  const handleChangeName = useCallback(
    (value: string) => {
      saveClient({ ...client, name: value });
    },
    [saveClient, client],
  );

  const handleChangeCPF = useCallback(
    (value: string) => {
      saveClient({ ...client, cpf: value });
    },
    [saveClient, client],
  );

  const handleChangePhone = useCallback(
    (value: string) => {
      saveClient({ ...client, phone: value });
    },
    [saveClient, client],
  );

  const handleChangeEmail = useCallback(
    (value: string) => {
      saveClient({ ...client, email: value });
    },
    [saveClient, client],
  );

  const navigateToManageAdress = useCallback(() => {
    navigate('ManageAdress');
  }, [navigate]);

  return (
    <Container>
      <ScrollView>
        <SectionLabel title="Cliente">
          <Input
            label="Nome do cliente"
            placeholder="Digite o nome do cliente"
            value={client.name}
            onChangeText={handleChangeName}
          />
          <Input
            label="CPF"
            placeholder="Digite o CPF"
            value={client.cpf}
            onChangeText={handleChangeCPF}
            keyboardType="decimal-pad"
            maxLength={14}
          />

          <Input
            label="Telefone"
            placeholder="Digite o telefone"
            value={client.phone}
            onChangeText={handleChangePhone}
            keyboardType="decimal-pad"
          />
          <Input
            label="E-mail"
            placeholder="Digite o e-mail"
            value={client.email}
            onChangeText={handleChangeEmail}
          />
        </SectionLabel>
        <SectionLabel title="Endereço">
          <ButtonAdressWrapper>
            <Button
              icon="plus"
              mode="text"
              style={{ width: 200 }}
              onPress={navigateToManageAdress}
            >
              Novo Endereço
            </Button>
          </ButtonAdressWrapper>
        </SectionLabel>
      </ScrollView>
    </Container>
  );
};

export default Client;
