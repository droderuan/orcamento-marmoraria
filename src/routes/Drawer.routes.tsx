import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '@navigations/Home/routes';
import SignOut from '../screens/SignOut';

const Drawer = createDrawerNavigator();

const DrawerRoutes: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainApp"
      screenOptions={{ swipeEnabled: false }}
    >
      <Drawer.Screen name="MainApp" component={Home} />
      <Drawer.Screen
        name="SignOut"
        component={SignOut}
        options={{ drawerLabel: 'Sair' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
