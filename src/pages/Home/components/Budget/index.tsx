import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  BudgetCard,
  InfoWrapper,
  Label,
  TitleLabel,
  InfoLabel,
  LeftBudgetCard,
  Line,
  RightBudgetCard,
  BudgetInfoButton,
} from './styles';

const Budget: React.FC = () => {
  return (
    <BudgetCard>
      <InfoWrapper>
        <LeftBudgetCard>
          <Label>
            <TitleLabel>Cliente</TitleLabel>
            <InfoLabel>Ruan Ferreira</InfoLabel>
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
      <BudgetInfoButton>
        <Icon name="chevron-right" size={32} color="#7f9cb5" />
      </BudgetInfoButton>
    </BudgetCard>
  );
};

export default Budget;
