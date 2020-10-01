import React from 'react';

import {
  ProductCardContainer,
  ProductCardHeader,
  ProductCardTitle,
  ProductCardInfo,
  ProductCardInfoItem,
  ItemText,
} from './styles';

const ProductCard: React.FC = () => {
  return (
    <ProductCardContainer>
      <ProductCardHeader>
        <ProductCardTitle>Pia</ProductCardTitle>
      </ProductCardHeader>
      <ProductCardInfo>
        <ProductCardInfoItem>
          <ItemText>2x</ItemText>
          <ItemText>Janela</ItemText>
          <ItemText>180x40cm</ItemText>
        </ProductCardInfoItem>
      </ProductCardInfo>
    </ProductCardContainer>
  );
};

export default ProductCard;
