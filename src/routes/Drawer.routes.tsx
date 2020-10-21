import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import App from './App.routes';
import SignOut from '../screens/SignOut';

const Drawer = createDrawerNavigator();

const DrawerRoutes: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainApp"
      screenOptions={{ swipeEnabled: false }}
    >
      <Drawer.Screen name="MainApp" component={App} />
      <Drawer.Screen
        name="SignOut"
        component={SignOut}
        options={{ drawerLabel: 'Sair' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
