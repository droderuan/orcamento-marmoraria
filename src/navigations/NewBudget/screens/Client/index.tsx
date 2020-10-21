import React, { useCallback, useMemo } from 'react';
import { Button, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import { useBudget } from '../../hooks/budget';

import Input from '../../components/Input';
import SectionLabel from '../../components/SectionLabel';

import {
  Container,
  ScrollView,
  ButtonAdressWrapper,
  AddressInfoContainer,
  AddressFirstLine,
  AddressSecondLine,
} from './styles';

const Client: React.FC = () => {
  const { navigate } = useNavigation();
  const { saveClient, client, deleteAddress } = useBudget();

  const parsedAddress = useMemo(() => {
    return client.address.map(each => {
      const parsedText = {
        firstLine: '',
        secondLine: '',
        id: '',
      };

      parsedText.firstLine += `${each.street}`;
      parsedText.firstLine += each.complement ? ` - ${each.complement}` : '';
      parsedText.secondLine += `${each.state} - ${each.city} - ${each.neighborhood}`;
      parsedText.id = each.id;

      return parsedText;
    });
  }, [client.address, JSON.stringify(client.address)]);

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
    navigate('ManageAddress');
  }, [navigate]);

  return (
    <Container>
      <ScrollView>
        <SectionLabel title="Cliente">
          <Input
            label="Nome do cliente"
            placeholder="Digite o nome do cliente"
            autoCapitalize="words"
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
            keyboardType="email-address"
            autoCapitalize="none"
            value={client.email}
            onChangeText={handleChangeEmail}
          />
        </SectionLabel>
        <SectionLabel title="Endereço">
          {parsedAddress.map(eachAddress => (
            <AddressInfoContainer
              onPress={() => deleteAddress(eachAddress.id)}
              key={`${eachAddress.id}`}
            >
              <AddressFirstLine>{eachAddress.firstLine}</AddressFirstLine>
              <AddressSecondLine>{eachAddress.secondLine}</AddressSecondLine>
              <Divider />
            </AddressInfoContainer>
          ))}
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
