import React, { useRef, useCallback } from 'react';
import { TextInput } from 'react-native';
import { useBudget } from '@hooks/budget';

import { ItemWithTwoTextInput, ItemText } from './styles';

interface HandleChangeMeasure {
  width?: string;
  length?: string;
}

const RectangularMeasures: React.FC = () => {
  const { editingItem, saveEditingItem } = useBudget();

  const lengthInputRef = useRef<TextInput | null>(null);

  const handleChangeMeasure = useCallback(
    ({
      width = editingItem.measures.width,
      length = editingItem.measures.length,
    }: HandleChangeMeasure) => {
      saveEditingItem({
        measures: {
          width,
          length,
          displayMeasures: `${width} x ${length}`,
        },
      });
    },
    [saveEditingItem, editingItem.measures],
  );
  return (
    <>
      <ItemWithTwoTextInput
        keyboardType="number-pad"
        placeholder="Largura"
        value={editingItem.measures.width}
        placeholderTextColor="#A0A0A0"
        onChangeText={value => handleChangeMeasure({ width: value })}
        onSubmitEditing={() => lengthInputRef.current?.focus()}
      />
      <ItemText>x</ItemText>
      <ItemWithTwoTextInput
        ref={lengthInputRef}
        keyboardType="number-pad"
        placeholder="Comprimento"
        value={editingItem.measures.length}
        placeholderTextColor="#A0A0A0"
        onChangeText={value => handleChangeMeasure({ length: value })}
      />
    </>
  );
};

export default RectangularMeasures;
