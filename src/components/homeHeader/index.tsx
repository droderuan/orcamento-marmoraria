import React, { ReactComponentElement } from 'react';

import Icon from 'react-native-vector-icons/Fontisto';
import { Text } from 'react-native';

import { Header, DrawerMenuButton } from './styles';

interface HeaderProps {
  toggleDrawer(): void;
}

const HomeHeader: React.FC<HeaderProps> = ({ toggleDrawer }) => {
  return (
    <Header>
      <DrawerMenuButton onPress={toggleDrawer}>
        <Icon name="player-settings" size={32} color="#fff" />
      </DrawerMenuButton>
      <Text>Header</Text>
    </Header>
  );
};

export default HomeHeader;
