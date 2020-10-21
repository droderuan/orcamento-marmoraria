import React from 'react';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';
import Budget from '@dtos/Budget';
import {
  Container,
  InfoWrapper,
  Label,
  TitleLabel,
  InfoLabel,
  LeftBudgetCard,
  Line,
  RightBudgetCard,
  BudgetInfoButton,
} from './styles';

interface BudgetCardProps {
  budget: Budget;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
  const { navigate } = useNavigation();
  return (
    <Container>
      <InfoWrapper>
        <LeftBudgetCard>
          <Label>
            <TitleLabel>Cliente</TitleLabel>
            <InfoLabel>{budget.client.name}</InfoLabel>
          </Label>
          <Label>
            <TitleLabel>Local</TitleLabel>
            <InfoLabel>RJ - Rio de Janeiro</InfoLabel>
          </Label>
        </LeftBudgetCard>
        <Line />
        <RightBudgetCard>
          <Label>
            <TitleLabel>Data do orçamento</TitleLabel>
            <InfoLabel>25/12/2021</InfoLabel>
          </Label>
          <Label>
            <TitleLabel>Produtos</TitleLabel>
            <InfoLabel>10</InfoLabel>
          </Label>
        </RightBudgetCard>
      </InfoWrapper>
      <BudgetInfoButton
        onPress={() => navigate('NewBudget', { budgetId: budget.id })}
      >
        <Icon name="chevron-right" size={32} color="#fff" />
      </BudgetInfoButton>
    </Container>
  );
};

export default BudgetCard;
