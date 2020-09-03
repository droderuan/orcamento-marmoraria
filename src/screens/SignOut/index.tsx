import React from 'react';
import { View, Button, Alert, Text } from 'react-native';

import { useAuth } from '@hooks/Auth';

const SignOut: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Button title="Sair" onPress={() => signOut()}>
        <Text>Sair</Text>
      </Button>
    </View>
  );
};

export default SignOut;
