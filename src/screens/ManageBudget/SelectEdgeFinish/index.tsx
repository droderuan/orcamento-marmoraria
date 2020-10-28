import React, { useCallback } from 'react';
import EdgeFinishImages from '@assets/images/EdgeFinishings';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import {
  Container,
  Listcontainer,
  ListContent,
  ListItemButton,
  ListItem,
  StoneImage,
  StoneImageText,
} from './styles';

const SelectEdgeFinish: React.FC = () => {
  const { navigate } = useNavigation();

  const selectEdgeFinishAndGoBack = useCallback(
    ({ name, displayName, img }) => {
      navigate('CreateItem', {
        stoneType: {
          name,
          displayName,
          img,
        },
      });
    },
    [navigate],
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
                      selectEdgeFinishAndGoBack({
                        type: finishType.type,
                        stone: item.displayName,
                        name: item.name,
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
