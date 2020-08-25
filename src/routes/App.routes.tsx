import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NewBudget from '../pages/NewBudget';
import HomePage from '../pages/Home';

const App = createStackNavigator();

const Home: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#FFF', paddingTop: 24 },
    }}
    initialRouteName="Home"
  >
    <App.Screen name="Home" component={HomePage} />
    <App.Screen name="NewBudget" component={NewBudget} />
  </App.Navigator>
);
export default Home;
