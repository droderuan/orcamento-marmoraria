import React, { useCallback } from 'react';
import EdgeFinishImages from '@assets/images/EdgeFinishings';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { useBudget } from '@hooks/budget';

import {
  Container,
  Listcontainer,
  ListContent,
  ListItemButton,
  ListItem,
  StoneImage,
  StoneImageText,
} from './styles';

interface RouteParams {
  handleSelectEdgeFinish({ option }: { option: string }): void;
}

const SelectEdgeFinish: React.FC = () => {
  const { saveEditingItem } = useBudget();
  const { navigate } = useNavigation();

  const handleSelectEdgeFinishAndGoBack = useCallback(
    ({ option }) => {
      saveEditingItem({ edgeFinishing: option });
      navigate('CreateItem');
    },
    [saveEditingItem, navigate],
  );

  return (
    <Container>
      <Listcontainer>
        <List.AccordionGroup>
          {EdgeFinishImages.map(finishType => (
            <List.Accordion
              title={finishType.type}
              id={finishType.type}
              key={finishType.type}
            >
              <ListContent
                contentContainerStyle={{
                  justifyContent: 'space-around',
                  paddingHorizontal: 10,
                }}
                data={finishType.finishes}
                keyExtractor={item => item.displayName}
                numColumns={3}
                renderItem={({ item }) => (
                  <ListItemButton
                    onPress={() =>
                      handleSelectEdgeFinishAndGoBack({
                        option: item.displayName,
                      })
                    }
                  >
                    <ListItem>
                      <StoneImage source={item.img} />
                      <StoneImageText numberOfLines={2}>
                        {item.displayName}
                      </StoneImageText>
                    </ListItem>
                  </ListItemButton>
                )}
              />
            </List.Accordion>
          ))}
        </List.AccordionGroup>
      </Listcontainer>
    </Container>
  );
};

export default SelectEdgeFinish;
