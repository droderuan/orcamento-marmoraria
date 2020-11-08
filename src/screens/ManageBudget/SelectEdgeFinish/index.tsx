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
  StoneImageWrapper,
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
    ({ name, type }) => {
      saveEditingItem({
        edgeFinishing: {
          name,
          type,
        },
      });
      navigate('CreateItem');
    },
    [saveEditingItem, navigate],
  );

  return (
    <Container>
      <Listcontainer>
        <List.AccordionGroup>
          {EdgeFinishImages.edgeFinishes.map(finishType => (
            <List.Accordion
              title={finishType.display}
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
                        name: item.displayName,
                        type: finishType.type,
                      })
                    }
                  >
                    <ListItem>
                      <StoneImageWrapper
                        style={{
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 2.5,

                          elevation: 4,
                        }}
                      >
                        <StoneImage
                          source={item.img}
                          style={{ resizeMode: 'contain' }}
                        />
                      </StoneImageWrapper>
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
