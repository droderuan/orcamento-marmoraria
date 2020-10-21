import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NewBudgetRoutes from '@navigations/NewBudget/routes';
import HomePage from '../screens';

const App = createStackNavigator();

const Home: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#FFF' },
    }}
    initialRouteName="MainPage"
  >
    <App.Screen name="MainPage" component={HomePage} />
    <App.Screen name="NewBudget" component={NewBudgetRoutes} />
  </App.Navigator>
);
export default Home;
