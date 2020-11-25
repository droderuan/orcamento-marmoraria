import React, { useCallback } from 'react';
import Share from 'react-native-share';

import { useNavigation } from '@react-navigation/core';
import { useBudget } from '@hooks/budget';

import { generateBudgetPdf } from '@services/HtmlToPdf';
import { storagePermission } from '@services/HandlePermissions';

import BudgetOptionsView from './BudgetOptionsView';

const BudgetOptionsController: React.FC = () => {
  const { deleteBudget, budget } = useBudget();
  const { navigate } = useNavigation();

  const generatePdf = useCallback(async () => {
    const checkPermission = await storagePermission();
    if (checkPermission) {
      const pdf = await generateBudgetPdf(budget);
      await Share.open({
        title: 'foi',
        message: `Orçamento do cliente: ${budget.client.name}`,
        url: `file://${pdf.filePath}`,
      });
    }
  }, [budget]);

  const deleteAndGoBack = useCallback(() => {
    deleteBudget();
    navigate('MainPage');
  }, [deleteBudget, navigate]);

  return (
    <BudgetOptionsView budget={budget} deleteAndGoBack={deleteAndGoBack} />
  );
};

export default BudgetOptionsController;
