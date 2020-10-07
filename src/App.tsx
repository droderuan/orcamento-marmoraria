import 'react-native-gesture-handler';
import { primary900 } from '@styles/theme/colors';

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar
      barStyle="light-content"
      backgroundColor={primary900}
      translucent
    />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
