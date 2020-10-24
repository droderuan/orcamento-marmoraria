import React from 'react';
import Auth from './Auth.routes';
import { useAuth } from '../hooks/Auth';

import App from './Drawer.routes';

const Routes: React.FC = () => {
  const { user, initializing } = useAuth();

  return user ? <App /> : <Auth />;
};

export default Routes;
