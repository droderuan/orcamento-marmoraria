import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/Home';
import Client from '../screens/Client';
import Finish from '../screens/Finish';

const Tab = createBottomTabNavigator();

const MainPage: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: '#1E4C75',
        inactiveBackgroundColor: '#EFEFEF',
        activeTintColor: '#FFF',
        style: { height: 60 },
        labelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 14,
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Orçamento',
          tabBarIcon: ({ color }) => (
            <Icon name="square-edit-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Client"
        component={Client}
        options={{
          title: 'Cliente',
          tabBarIcon: ({ color }) => (
            <Icon name="account-edit-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Finish"
        component={Finish}
        options={{
          title: 'Finalizar',
          tabBarIcon: ({ color }) => (
            <Icon name="check-box-outline" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainPage;
