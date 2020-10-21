import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ManageBudget from './ManageBudget.routes';
import HomePage from '../screens/Main';

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
    <App.Screen name="ManageBudget" component={ManageBudget} />
  </App.Navigator>
);
export default Home;
