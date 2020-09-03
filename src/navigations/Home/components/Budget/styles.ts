import styled from 'styled-components/native';

export const BudgetCard = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  margin: 10px 0;
`;

export const InfoWrapper = styled.View`
  flex-direction: row;
  padding: 18px;
`;

export const LeftBudgetCard = styled.View``;

export const Line = styled.View`
  width: 1px;
  background-color: #7f9cb5;
  margin: 0 14px;
`;

export const RightBudgetCard = styled.View``;

export const BudgetInfoButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: #efefef;

  width: 32px;
`;

export const Label = styled.View``;

export const TitleLabel = styled.Text`
  margin-bottom: 4px;

  font-family: 'Roboto-Regular';
  font-size: 14px;
  color: #595959;
`;

export const InfoLabel = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  color: #000;
`;
