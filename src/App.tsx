import 'react-native-gesture-handler';

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { primary900 } from './styles/theme/colors';
import Theme from './styles/theme/theme';
import AppProvider from './hooks';

import './config/ReactotronConfig';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <AppProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={primary900}
        translucent
      />
      <PaperProvider theme={Theme}>
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Routes />
        </View>
      </PaperProvider>
    </AppProvider>
  </NavigationContainer>
);

export default App;
