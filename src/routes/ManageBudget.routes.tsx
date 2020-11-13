import React from 'react';
import { useRoute } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';

import { primary900 } from '@styles/theme/colors';

import { BudgetProvider } from '../hooks/budget';

import RoomProducts from '../screens/ManageBudget/RoomProducts';
import CreateItem from '../screens/ManageBudget/CreateItem';
import SelectStone from '../screens/ManageBudget/SelectStone';
import SelectEdgeFinish from '../screens/ManageBudget/SelectEdgeFinish';
import ManageAddress from '../screens/ManageBudget/ManageAdress';
import MainPage from './ManageBudgetTab.routes';

interface RouteParamsProps {
  budgetId?: string;
}

const ManageBudget = createStackNavigator();

const ManageBudgetRoutes: React.FC = () => {
  const route = useRoute();
  const { budgetId } = route?.params as RouteParamsProps;
  return (
    <BudgetProvider>
      <ManageBudget.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: primary900,
          },
          headerTintColor: '#fff',
        }}
      >
        <ManageBudget.Screen
          name="TabRoutes"
          component={MainPage}
          options={{ headerTitle: 'Orçamento' }}
          initialParams={{ budgetId }}
        />

        <ManageBudget.Screen
          name="RoomProducts"
          component={RoomProducts}
          options={{
            headerTitle: '',
          }}
        />
        <ManageBudget.Screen
          name="CreateItem"
          component={CreateItem}
          options={{
            headerTitle: 'Nova Peça',
          }}
        />
        <ManageBudget.Screen
          name="SelectStone"
          component={SelectStone}
          options={{
            headerTitle: 'Escolha o tipo da Pedra',
          }}
        />
        <ManageBudget.Screen
          name="SelectEdgeFinish"
          component={SelectEdgeFinish}
          options={{
            headerTitle: 'Escolha o acabamento da borda',
          }}
        />
        <ManageBudget.Screen
          name="ManageAddress"
          component={ManageAddress}
          options={{
            headerTitle: 'Endereço',
          }}
        />
      </ManageBudget.Navigator>
    </BudgetProvider>
  );
};

export default ManageBudgetRoutes;
