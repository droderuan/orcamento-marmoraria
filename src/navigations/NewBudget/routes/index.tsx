import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FirstClientInfo from '../screens/FirstClientInfo';

import MainPage from './Tab.routes';

const NewBudget = createStackNavigator();

const NewBudgetRoutes: React.FC = () => (
  <NewBudget.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#487195',
      },
      headerTintColor: '#fff',
    }}
  >
    <NewBudget.Screen name="FirstClientInfo" component={FirstClientInfo} />
    <NewBudget.Screen name="MainPage" component={MainPage} />
  </NewBudget.Navigator>
);

export default NewBudgetRoutes;
