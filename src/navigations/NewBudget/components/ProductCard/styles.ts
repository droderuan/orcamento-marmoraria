import styled from 'styled-components/native';

export const ProductCardContainer = styled.View`
  width: 180px;
  height: 220px;
  margin: 10px 10px 0;
  padding: 0 12px;
  border-radius: 5px;
  background-color: #efefef;
  border-width: 5px;
`;

export const ProductCardHeader = styled.View`
  flex-direction: row;
`;

export const ProductCardTitle = styled.Text`
  margin: 16px 0 6px;
  font-family: 'Roboto-Light';
  font-size: 26px;
`;

export const ProductCardInfo = styled.View`
  flex: 1;
`;

export const ProductCardInfoItem = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin: 2px 0;
`;

export const ItemText = styled.Text`
  font-family: 'Roboto-Light';
  font-size: 14px;
`;
