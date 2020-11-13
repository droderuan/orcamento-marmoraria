import React from 'react';

import { useRoute } from '@react-navigation/core';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { primary900 } from '@styles/theme/colors';
import BudgetProducts from '../screens/ManageBudget/BudgetProducts';
import Client from '../screens/ManageBudget/Client';
import BudgetOptions from '../screens/ManageBudget/BudgetOptions';

interface RouteParamsProps {
  budgetId?: string;
}

const Tab = createBottomTabNavigator();

const MainPage: React.FC = () => {
  const route = useRoute();
  const { budgetId } = route?.params as RouteParamsProps;
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: primary900,
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
        name="BudgetProductList"
        component={BudgetProducts}
        initialParams={{ budgetId }}
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
        name="BudgetOptions"
        component={BudgetOptions}
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
