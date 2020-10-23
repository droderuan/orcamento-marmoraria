import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Feather';
import Budget from '@dtos/Budget';
import { format } from 'date-fns';

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

  const parsedDate = useMemo(() => {
    return format(new Date(budget.created_at), 'dd/MM/yyyy');
  }, [budget.created_at]);

  return (
    <Container>
      <InfoWrapper>
        <LeftBudgetCard>
          <Label>
            <TitleLabel>Cliente</TitleLabel>
            <InfoLabel numberOfLines={1} ellipsizeMode="tail">
              {budget.client.name}
            </InfoLabel>
          </Label>
          <Label>
            <TitleLabel>Local</TitleLabel>
            <InfoLabel numberOfLines={1} ellipsizeMode="tail">
              RJ - Rio de Janeiro
            </InfoLabel>
          </Label>
        </LeftBudgetCard>
        <Line />
        <RightBudgetCard>
          <Label>
            <TitleLabel>Data do orçamento</TitleLabel>
            <InfoLabel numberOfLines={1} ellipsizeMode="tail">
              {parsedDate}
            </InfoLabel>
          </Label>
          <Label>
            <TitleLabel>Produtos</TitleLabel>
            <InfoLabel numberOfLines={1} ellipsizeMode="tail">
              10
            </InfoLabel>
          </Label>
        </RightBudgetCard>
      </InfoWrapper>
      <BudgetInfoButton
        onPress={() => navigate('ManageBudget', { budgetId: budget.id })}
      >
        <Icon name="chevron-right" size={32} color="#fff" />
      </BudgetInfoButton>
    </Container>
  );
};

export default BudgetCard;
