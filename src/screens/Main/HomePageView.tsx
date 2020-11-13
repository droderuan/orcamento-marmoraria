import React from 'react';

import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '@components/Button';

import BudgetCard from '@components/BudgetCard';

import Budget from '@dtos/Budget';
import {
  Container,
  Header,
  DrawerMenuButton,
  BudgetContainer,
  ButtonContainer,
} from './styles';

interface HomePageProps {
  toggleDrawer: () => void;
  navigateToManageBudget: () => void;
  budgets: Budget[];
}

const HomePageView: React.FC<HomePageProps> = ({
  toggleDrawer,
  navigateToManageBudget,
  budgets,
}) => {
  return (
    <Container>
      <Header>
        <DrawerMenuButton onPress={toggleDrawer}>
          <Icon name="menu" size={32} color="#fff" />
        </DrawerMenuButton>
      </Header>

      <ScrollView style={{ flex: 1 }}>
        <BudgetContainer>
          {budgets &&
            budgets.map(budget => (
              <BudgetCard budget={budget} key={budget.id} />
            ))}
        </BudgetContainer>
      </ScrollView>

      <ButtonContainer>
        <Button onPress={navigateToManageBudget}>Novo orçamento</Button>
      </ButtonContainer>
    </Container>
  );
};

export default HomePageView;
