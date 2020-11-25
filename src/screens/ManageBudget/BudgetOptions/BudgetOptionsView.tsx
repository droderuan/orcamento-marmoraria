import React from 'react';
import { Text } from 'react-native';

import { Button } from 'react-native-paper';
import SectionLabel from '@components/SectionLabel';

import Budget from '@dtos/Budget';
import { Container } from './styles';

interface BudgetOptionsViewProps {
  budget: Budget;
  deleteAndGoBack: () => void;
}

const BudgetOptionsView: React.FC<BudgetOptionsViewProps> = ({
  budget,
  deleteAndGoBack,
}) => {
  return (
    <Container>
      <SectionLabel title="Endereço de entrega">
        <Text style={{ margin: 30 }}>{budget.deliveryAddress.street}</Text>
      </SectionLabel>
      <SectionLabel title="Opções">
        <Button mode="contained" style={{ margin: 30 }}>
          Criar pdf
        </Button>
        <Button
          mode="contained"
          style={{ margin: 30 }}
          onPress={() => deleteAndGoBack()}
        >
          apagar orçamento
        </Button>
        <Button mode="contained" style={{ margin: 30 }}>
          Salvar no firebase
        </Button>
      </SectionLabel>
    </Container>
  );
};

export default BudgetOptionsView;
