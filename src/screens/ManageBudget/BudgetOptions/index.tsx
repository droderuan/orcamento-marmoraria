import React, { useCallback } from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { useBudget } from '@hooks/budget';

import firestore from '@react-native-firebase/firestore';

import { generateBudgetPdf } from '@services/HtmlToPdf';
import { storagePermission } from '@services/HandlePermissions';

import SectionLabel from '@components/SectionLabel';

import { Text } from 'react-native';
import { Container } from './styles';

const BudgetOptions: React.FC = () => {
  const { deleteBudget, budget } = useBudget();
  const { navigate } = useNavigation();

  const generatePdf = useCallback(async () => {
    const checkPermission = await storagePermission();
    if (checkPermission) {
      const pdf = await generateBudgetPdf(budget);
    }
  }, [budget]);

  const sendToFirestore = useCallback(async () => {
    try {
      const budgetsColletion = firestore().collection('budgets');

      const response = await budgetsColletion.add(budget);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }, [budget]);

  const deleteAndgoBack = useCallback(() => {
    deleteBudget();
    navigate('MainPage');
  }, [deleteBudget, navigate]);

  return (
    <Container>
      <SectionLabel title="Endereço de entrega">
        <Text style={{ margin: 30 }}>{budget.deliveryAddress.street}</Text>
      </SectionLabel>
      <SectionLabel title="Opções">
        <Button
          mode="contained"
          style={{ margin: 30 }}
          onPress={() => generatePdf()}
        >
          Criar pdf
        </Button>
        <Button
          mode="contained"
          style={{ margin: 30 }}
          onPress={() => deleteAndgoBack()}
        >
          apagar orçamento
        </Button>
        <Button
          mode="contained"
          style={{ margin: 30 }}
          onPress={() => sendToFirestore()}
        >
          Salvar no firebase
        </Button>
      </SectionLabel>
    </Container>
  );
};

export default BudgetOptions;
