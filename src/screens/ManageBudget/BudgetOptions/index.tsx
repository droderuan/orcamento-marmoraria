import React, { useCallback } from 'react';
import Share from 'react-native-share';

import { useNavigation } from '@react-navigation/core';
import { useBudget } from '@hooks/budget';

import { storagePermission } from '@services/HandlePermissions';

import BudgetOptionsView from './BudgetOptionsView';

const BudgetOptionsController: React.FC = () => {
  const { deleteBudget, budget } = useBudget();
  const { navigate } = useNavigation();

  const deleteAndGoBack = useCallback(() => {
    deleteBudget();
    navigate('MainPage');
  }, [deleteBudget, navigate]);

  return (
    <BudgetOptionsView budget={budget} deleteAndGoBack={deleteAndGoBack} />
  );
};

export default BudgetOptionsController;
