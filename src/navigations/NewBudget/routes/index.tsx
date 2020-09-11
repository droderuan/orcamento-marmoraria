import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FirstClientInfo from '../screens/FirstClientInfo';
import SelectProduct from '../screens/SelectProduct';
import Pia from '../Products/Pia';
import MainPage from './Tab.routes';

const NewBudget = createStackNavigator();

const NewBudgetRoutes: React.FC = () => {
  return (
    <NewBudget.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#487195',
        },
        headerTintColor: '#fff',
      }}
    >
      <NewBudget.Screen
        name="FirstClientInfo"
        component={FirstClientInfo}
        options={{ headerTitle: 'Informações do cliente' }}
      />
      <NewBudget.Screen
        name="SelectProduct"
        component={SelectProduct}
        options={{ headerTitle: 'Selecione o Produto' }}
      />
      <NewBudget.Screen
        name="MainPage"
        component={MainPage}
        options={{ headerTitle: 'Orçamento' }}
      />

      <NewBudget.Screen
        name="Pia"
        component={Pia}
        options={{ headerTitle: 'Adicionar Pia' }}
      />
    </NewBudget.Navigator>
  );
};

export default NewBudgetRoutes;
