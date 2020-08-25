import React, { useRef, useState, useCallback } from 'react';

import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Text, ScrollView } from 'react-native';
import HomeHeader from '../../components/homeHeader';

import BudgetCard from './components/Budget';

import {
  Container,
  NavButtons,
  NavButton,
  ButtonText,
  BudgetContainer,
  ButtonContainer,
  NewBudgetButton,
  NewBudgetButtonText,
} from './styles';

interface Filters {
  selected: 'pendant' | 'accomplished';
}

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<
    'pendant' | 'accomplished'
  >('pendant');

  const toggleDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }, [navigation]);

  const changeFilter = useCallback((filter: 'pendant' | 'accomplished') => {
    setSelectedFilter(filter);
  }, []);

  return (
    <Container>
      <HomeHeader toggleDrawer={toggleDrawer} />
      <NavButtons>
        <NavButton
          onPress={() => changeFilter('pendant')}
          isSelected={selectedFilter === 'pendant'}
        >
          <ButtonText isSelected={selectedFilter === 'pendant'}>
            Pendente
          </ButtonText>
        </NavButton>
        <NavButton
          onPress={() => changeFilter('accomplished')}
          isSelected={selectedFilter === 'accomplished'}
        >
          <ButtonText isSelected={selectedFilter === 'accomplished'}>
            Conluído
          </ButtonText>
        </NavButton>
      </NavButtons>
      <ScrollView style={{ flex: 1 }}>
        <BudgetContainer>
          <BudgetCard />
          <BudgetCard />
          <BudgetCard />
          <BudgetCard />
        </BudgetContainer>
      </ScrollView>

      <ButtonContainer>
        <NewBudgetButton onPress={() => navigation.navigate('NewBudget')}>
          <NewBudgetButtonText>Novo orçamento</NewBudgetButtonText>
        </NewBudgetButton>
      </ButtonContainer>
    </Container>
  );
};

export default Home;
