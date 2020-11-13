import React, { useState, useCallback, useEffect } from 'react';

import {
  useNavigation,
  DrawerActions,
  useIsFocused,
} from '@react-navigation/native';

import { getAllBudgetsFromStorage } from '@services/Storage';

import Budget from '@dtos/Budget';

import HomePageView from './HomePageView';

const HomePageController: React.FC = () => {
  const { navigate, dispatch } = useNavigation();

  const [budgets, setBudgets] = useState<Budget[]>([] as Budget[]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function LoadBudgets() {
      const allBudgets = await getAllBudgetsFromStorage();

      allBudgets && setBudgets(allBudgets);
    }

    isFocused && LoadBudgets();
  }, [isFocused]);

  const toggleDrawer = useCallback(() => {
    dispatch(DrawerActions.toggleDrawer());
  }, [dispatch]);

  const navigateToManageBudget = useCallback(() => {
    navigate('ManageBudget', {});
  }, [navigate]);

  return (
    <HomePageView
      budgets={budgets}
      toggleDrawer={toggleDrawer}
      navigateToManageBudget={navigateToManageBudget}
    />
  );
};

export default HomePageController;
