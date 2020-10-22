import React from 'react';
import { useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { primary500 } from '@styles/theme/colors';

import { BudgetProvider } from '../hooks/budget';

import RoomProducts from '../screens/ManageBudget/RoomProducts';
import CreateItem from '../screens/ManageBudget/CreateItem';
import SelectStone from '../screens/ManageBudget/SelectStone';
import ManageAddress from '../screens/ManageBudget/ManageAdress';
import MainPage from './ManageBudgetTab.routes';

interface RouteParamsProps {
  budgetId?: string;
}

type ManageAddressRouteParams = {
  ManageAddress: {
    addressId: string;
  };
  TabRoutes: {
    budgetId: string;
  };
  RoomProducts: undefined;
  CreateItem: undefined;
  SelectStone: undefined;
};

type ManageAddressProps = RouteProp<ManageAddressRouteParams, 'ManageAddress'>;

const ManageBudget = createStackNavigator<ManageAddressRouteParams>();

const ManageBudgetRoutes: React.FC = () => {
  const route = useRoute();
  const { budgetId } = route?.params as RouteParamsProps;
  return (
    <BudgetProvider>
      <ManageBudget.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: primary500,
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
