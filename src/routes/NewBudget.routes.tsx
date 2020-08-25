import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NewBudget from '../pages/NewBudget';

const Budget = createStackNavigator();

const BudgetRoutes: React.FC = () => (
  <Budget.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#FFF', paddingTop: 24 },
    }}
  >
    <Budget.Screen name="NewBudget" component={NewBudget} />
  </Budget.Navigator>
);
export default BudgetRoutes;
