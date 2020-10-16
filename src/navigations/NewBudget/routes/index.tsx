import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { primary500 } from '@styles/theme/colors';
import { BudgetProvider } from '../hooks/budget';
import { ClientProvider } from '../hooks/client';

import FirstClientInfo from '../screens/FirstClientInfo';
import RoomProducts from '../screens/RoomProducts';
import CreateItem from '../screens/CreateItem';
import SelectStone from '../screens/SelectStone';
import MainPage from './Tab.routes';

const NewBudget = createStackNavigator();

const NewBudgetRoutes: React.FC = () => {
  return (
    <BudgetProvider>
      <ClientProvider>
        <NewBudget.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: primary500,
            },
            headerTintColor: '#fff',
          }}
        >
          <NewBudget.Screen
            name="MainPage"
            component={MainPage}
            options={{ headerTitle: 'Orçamento' }}
          />
          <NewBudget.Screen
            name="FirstClientInfo"
            component={FirstClientInfo}
            options={{ headerTitle: 'Informações do cliente' }}
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
        </NewBudget.Navigator>
      </ClientProvider>
    </BudgetProvider>
  );
};

export default NewBudgetRoutes;
