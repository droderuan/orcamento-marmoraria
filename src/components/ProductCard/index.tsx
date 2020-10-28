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
    <ProductCardContainer
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      }}
    >
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
