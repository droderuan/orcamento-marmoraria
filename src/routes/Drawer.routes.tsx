import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import AuthRoutes from './Auth.routes';

import Home from './App.routes';

const Drawer = createDrawerNavigator();

const DrawerRoutes: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="AuthRoutes"
        component={AuthRoutes}
        options={{ title: 'Sair' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
