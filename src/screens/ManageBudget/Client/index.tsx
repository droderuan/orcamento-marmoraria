import React, { useCallback, useMemo } from 'react';
import { Button, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import { useBudget } from '@hooks/budget';

import Input from '@components/Input';
import SectionLabel from '@components/SectionLabel';

import {
  Container,
  ScrollView,
  ButtonAdressWrapper,
  AddressInfoContainer,
  AddressFirstLine,
  AddressSecondLine,
  DeliveryAddressText,
} from './styles';

const Client: React.FC = () => {
  const { navigate } = useNavigation();
  const { saveClient, budget, deleteAddress } = useBudget();

  const parsedAddress = useMemo(() => {
    return budget.client.address.map(each => {
      const parsedText = {
        firstLine: '',
        secondLine: '',
        isDelivery: false,
        id: '',
      };

      parsedText.firstLine += `${each.street}`;
      parsedText.firstLine += each.number ? ` - ${each.number}` : '';
      parsedText.firstLine += each.complement ? ` - ${each.complement}` : '';
      parsedText.secondLine += `${each.cep} - ${each.state} - ${each.city} - ${each.neighborhood}`;
      parsedText.isDelivery = each.deliveryAddress;
      parsedText.id = each.id;

      return parsedText;
    });
  }, [budget.client.address, JSON.stringify(budget.client.address)]);

  const handleChangeName = useCallback(
    (value: string) => {
      saveClient({ ...budget.client, name: value });
    },
    [saveClient, budget.client],
  );

  const handleChangeCPF = useCallback(
    (value: string) => {
      saveClient({ ...budget.client, cpf: value });
    },
    [saveClient, budget.client],
  );

  const handleChangePhone = useCallback(
    (value: string) => {
      saveClient({ ...budget.client, phone: value });
    },
    [saveClient, budget.client],
  );

  const handleChangeEmail = useCallback(
    (value: string) => {
      saveClient({ ...budget.client, email: value });
    },
    [saveClient, budget.client],
  );

  const navigateToManageAdress = useCallback(() => {
    navigate('ManageAddress', {});
  }, [navigate]);

  return (
    <Container>
      <ScrollView>
        <SectionLabel title="Cliente">
          <Input
            label="Nome do cliente"
            placeholder="Digite o nome do cliente"
            autoCapitalize="words"
            value={budget.client.name}
            onChangeText={handleChangeName}
          />
          <Input
            label="CPF"
            placeholder="Digite o CPF"
            value={budget.client.cpf}
            onChangeText={handleChangeCPF}
            keyboardType="decimal-pad"
            maxLength={14}
          />

          <Input
            label="Telefone"
            placeholder="Digite o telefone"
            value={budget.client.phone}
            onChangeText={handleChangePhone}
            keyboardType="decimal-pad"
          />
          <Input
            label="E-mail"
            placeholder="Digite o e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={budget.client.email}
            onChangeText={handleChangeEmail}
          />
        </SectionLabel>
        <SectionLabel title="Endereço">
          {parsedAddress.map(eachAddress => (
            <AddressInfoContainer
              onPress={() =>
                navigate('ManageAddress', { addressId: eachAddress.id })
              }
              key={`${eachAddress.id}`}
              isDelivery={eachAddress.isDelivery}
            >
              {eachAddress.isDelivery && (
                <DeliveryAddressText>Endereço de entrega</DeliveryAddressText>
              )}

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
