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

  const parsedLocal = useMemo(() => {
    let parsedAddress = 'Sem local de entrega';
    if (budget.deliveryAddress.state) {
      parsedAddress = budget.deliveryAddress.state;
    }

    if (budget.deliveryAddress.city) {
      parsedAddress += ` - ${budget.deliveryAddress.city}`;
    }

    return parsedAddress;
  }, [budget.deliveryAddress.state, budget.deliveryAddress.city]);

  return (
    <Container
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,

        elevation: 4,
      }}
    >
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
              {parsedLocal}
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
