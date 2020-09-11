import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { Product } from '@interfaces/index';
import { RectButton } from 'react-native-gesture-handler';

interface ProductCardProps {
  width: number;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ProductGrid = styled(FlatList as new () => FlatList<Product>)``;

export const ProductCard = styled(RectButton)<ProductCardProps>`
  align-items: center;
  justify-content: center;
  margin: 5px;
  width: ${props => props.width - 15};
  height: 90px;
  background: #7f9cb5;
`;

export const ProductName = styled.Text`
  font-size: 22px;
  font-family: 'Roboto-Regular';
  color: #fff;
`;
