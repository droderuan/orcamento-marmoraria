import React, { ReactComponentElement } from 'react';

import Icon from 'react-native-vector-icons/Fontisto';
import { Text } from 'react-native';

import { Container, SettingsButton } from './styles';

interface HeaderProps {
  toggleDrawer(): void;
}

const HomeHeader: React.FC<HeaderProps> = ({ toggleDrawer }) => {
  return (
    <Container>
      <SettingsButton onPress={toggleDrawer}>
        <Icon name="player-settings" size={32} color="#fff" />
      </SettingsButton>
      <Text>Header</Text>
    </Container>
  );
};

export default HomeHeader;
