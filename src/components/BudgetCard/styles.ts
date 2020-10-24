import styled from 'styled-components/native';
import { secondary700 } from '@styles/theme/colors';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-color: #efefef;
  margin: 5px 0;
  border-radius: 5px;
`;

export const InfoWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 18px;
`;

export const LeftBudgetCard = styled.View`
  width: 50%;
`;

export const Line = styled.View`
  width: 1px;
  background-color: ${secondary700};
  margin: 0 14px;
`;

export const RightBudgetCard = styled.View`
  width: 50%;
`;

export const BudgetInfoButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: ${secondary700};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  width: 32px;
`;

export const Label = styled.View`
  flex: 1;
`;

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
