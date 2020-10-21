import React, { useCallback } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useBudget } from '@hooks/budget';

import { Container } from './styles';

const ManageBudget: React.FC = () => {
  const { deleteBudget } = useBudget();
  const { navigate } = useNavigation();

  const deleteAndgoBack = useCallback(() => {
    deleteBudget();
    navigate('MainPage');
  }, [deleteBudget, navigate]);

  return (
    <Container>
      <Button title="deletar" onPress={() => deleteAndgoBack()} />
    </Container>
  );
};

export default ManageBudget;
