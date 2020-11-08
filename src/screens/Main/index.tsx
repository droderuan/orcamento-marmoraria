import React, { useState, useCallback, useEffect } from 'react';

import {
  useNavigation,
  DrawerActions,
  useIsFocused,
} from '@react-navigation/native';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllBudgetsFromStorage } from '@services/Storage';

import Button from '@components/Button';

import Budget from '@dtos/Budget';
import BudgetCard from '@components/BudgetCard';

import {
  Container,
  Header,
  DrawerMenuButton,
  SearchArea,
  SearchInput,
  SearchButton,
  NavButtons,
  NavButton,
  ButtonText,
  BudgetContainer,
  ButtonContainer,
} from './styles';

interface Filters {
  selected: 'pendant' | 'accomplished';
}

const HomePage: React.FC = () => {
  const { navigate, dispatch } = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<
    'pendant' | 'accomplished'
  >('pendant');
  const [budgets, setBudgets] = useState<Budget[]>([] as Budget[]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function LoadBudgets() {
      const allBudgets = await getAllBudgetsFromStorage();

      allBudgets && setBudgets(allBudgets);
    }

    isFocused && LoadBudgets();
  }, [isFocused]);

  const toggleDrawer = useCallback(() => {
    dispatch(DrawerActions.toggleDrawer());
  }, [dispatch]);

  const changeFilter = useCallback((filter: 'pendant' | 'accomplished') => {
    setSelectedFilter(filter);
  }, []);

  return (
    <Container>
      <Header>
        <DrawerMenuButton onPress={toggleDrawer}>
          <Icon name="menu" size={32} color="#fff" />
        </DrawerMenuButton>
        {/* <SearchArea>
          <SearchInput placeholder="Procure pelo nome do cliente" />
          <SearchButton>
            <IconAntDesign name="search1" size={20} color="#fff" />
          </SearchButton>
        </SearchArea> */}
      </Header>

      {/* <NavButtons style={{ elevation: 5 }}>
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
      </NavButtons> */}

      <ScrollView style={{ flex: 1 }}>
        <BudgetContainer>
          {budgets &&
            budgets.map(budget => (
              <BudgetCard budget={budget} key={budget.id} />
            ))}
        </BudgetContainer>
      </ScrollView>

      <ButtonContainer>
        <Button onPress={() => navigate('ManageBudget', {})}>
          Novo orçamento
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default HomePage;
