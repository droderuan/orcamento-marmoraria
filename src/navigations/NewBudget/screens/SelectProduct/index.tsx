import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { ProductsList } from '../../Products';

import { Container, ProductGrid, ProductCard, ProductName } from './styles';

interface SelectProductProps {
  navigation: StackNavigationProp<any, any>;
}

const SelectProduct: React.FC<SelectProductProps> = ({ navigation }) => {
  const products = useMemo(() => ProductsList.products, []);

  const { numColumns, widthItem } = useMemo(
    () => ({
      numColumns: 2,
      widthItem: Dimensions.get('window').width / 2,
    }),
    [],
  );

  return (
    <Container>
      <ProductGrid
        contentContainerStyle={{
          flex: 1,
          alignItems: 'flex-start',
        }}
        data={products}
        keyExtractor={(item, index) => item.name + index}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <ProductCard
            width={widthItem}
            onPress={() => navigation.navigate(item.name)}
          >
            <ProductName>{item.name}</ProductName>
          </ProductCard>
        )}
      />
    </Container>
  );
};

export default SelectProduct;
