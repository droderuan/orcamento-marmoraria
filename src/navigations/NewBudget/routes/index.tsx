import React from 'react';
import { useRoute } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';

import { primary500 } from '@styles/theme/colors';
import { BudgetProvider } from '../hooks/budget';

import RoomProducts from '../screens/RoomProducts';
import CreateItem from '../screens/CreateItem';
import SelectStone from '../screens/SelectStone';
import ManageAddress from '../screens/ManageAdress';
import MainPage from './Tab.routes';

interface RouteParamsProps {
  budgetId?: string;
}

const NewBudget = createStackNavigator();

const NewBudgetRoutes: React.FC = () => {
  const route = useRoute();
  const { budgetId } = route?.params as RouteParamsProps;
  return (
    <BudgetProvider>
      <NewBudget.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: primary500,
          },
          headerTintColor: '#fff',
        }}
      >
        <NewBudget.Screen
          name="TabRoutes"
          component={MainPage}
          options={{ headerTitle: 'Orçamento' }}
          initialParams={{ budgetId }}
        />

        <NewBudget.Screen
          name="RoomProducts"
          component={RoomProducts}
          options={{
            headerTitle: '',
          }}
        />
        <NewBudget.Screen
          name="CreateItem"
          component={CreateItem}
          options={{
            headerTitle: 'Nova Peça',
          }}
        />
        <NewBudget.Screen
          name="SelectStone"
          component={SelectStone}
          options={{
            headerTitle: 'Escolha o tipo da Pedra',
          }}
        />
        <NewBudget.Screen
          name="ManageAddress"
          component={ManageAddress}
          options={{
            headerTitle: 'Endereço',
          }}
        />
      </NewBudget.Navigator>
    </BudgetProvider>
  );
};

export default NewBudgetRoutes;
