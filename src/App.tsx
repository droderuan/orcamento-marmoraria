import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#1D2D3C" translucent />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
