import React from 'react';
// import { View, ActivityIndicator } from 'react-native';
import Auth from '@navigations/Authorization/routes';
import { useAuth } from '../hooks/Auth';

import Drawer from './Drawer.routes';

const Routes: React.FC = () => {
  const { user } = useAuth();

  return user ? <Drawer /> : <Auth />;
};

export default Routes;
