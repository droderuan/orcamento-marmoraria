import React, { useRef, useCallback } from 'react';
import { TextInput } from 'react-native';
import { useBudget } from '@hooks/budget';

import { ItemWithTwoTextInput } from './styles';

interface handleChangeMeasure {
  diameter: string;
}

const CircleMeasures: React.FC = () => {
  const { editingItem, saveEditingItem } = useBudget();

  const lengthInputRef = useRef<TextInput | null>(null);

  const handleChangeMeasure = useCallback(
    ({ diameter }: handleChangeMeasure) => {
      saveEditingItem({
        measures: {
          diameter,
          displayMeasures: `${diameter}`,
        },
      });
    },
    [saveEditingItem],
  );
  return (
    <>
      <ItemWithTwoTextInput
        keyboardType="number-pad"
        placeholder="Diâmetro"
        maxLength={10}
        value={editingItem.measures?.diameter}
        placeholderTextColor="#A0A0A0"
        onChangeText={value => handleChangeMeasure({ diameter: value })}
        onSubmitEditing={() => lengthInputRef.current?.focus()}
      />
    </>
  );
};

export default CircleMeasures;
