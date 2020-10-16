import React from 'react';
import { Button } from 'react-native-paper';

import Input from '../../components/Input';
import SectionLabel from '../../components/SectionLabel';

import { Container, ScrollView, ButtonAdressWrapper } from './styles';

const Client: React.FC = () => {
  return (
    <Container>
      <ScrollView>
        <SectionLabel title="Cliente">
          <Input
            label="Nome do cliente"
            placeholder="Digite o nome do cliente"
          />
          <Input label="CPF" placeholder="Digite o CPF" />
          <Input label="Telefone" placeholder="Digite o telefone" />
          <Input label="E-mail" placeholder="Digite o e-mail" />
        </SectionLabel>
        <SectionLabel title="Endereço">
          <Input
            label="Nome do cliente"
            placeholder="Digite o nome do cliente"
          />
          <ButtonAdressWrapper>
            <Button icon="plus" mode="text" style={{ width: 200 }}>
              Novo Endereço
            </Button>
          </ButtonAdressWrapper>
        </SectionLabel>
      </ScrollView>
    </Container>
  );
};

export default Client;
