import React from 'react';
import { Text } from 'react-native';

import { Button, ActivityIndicator } from 'react-native-paper';

import Modal from '@components/Modal';
import SectionLabel from '@components/SectionLabel';

import Budget from '@dtos/Budget';
import { Container } from './styles';

interface BudgetOptionsViewProps {
  budget: Budget;
  loading: boolean;
  deleteAndGoBack: () => void;
  generatePdfAndShare: () => void;
}

const BudgetOptionsView: React.FC<BudgetOptionsViewProps> = ({
  budget,
  loading,
  deleteAndGoBack,
  generatePdfAndShare,
}) => {
  return (
    <Container>
      <Modal visible={loading} transparent>
        <ActivityIndicator />
      </Modal>

      <SectionLabel title="Endereço de entrega">
        <Text style={{ margin: 30 }}>{budget.deliveryAddress.street}</Text>
      </SectionLabel>
      <SectionLabel title="Opções">
        <Button
          mode="contained"
          style={{ margin: 30 }}
          onPress={() => generatePdfAndShare()}
        >
          Criar pdf
        </Button>
        <Button
          mode="contained"
          style={{ margin: 30 }}
          onPress={() => deleteAndGoBack()}
        >
          apagar orçamento
        </Button>
      </SectionLabel>
    </Container>
  );
};

export default BudgetOptionsView;
