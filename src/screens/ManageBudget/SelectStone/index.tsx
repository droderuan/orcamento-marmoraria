import React, { useCallback } from 'react';
import StonesImages from '@assets/images/pedra';
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

interface ChangeStoneDTO {
  type: string;
  stone: string;
}

const SelectStone: React.FC = () => {
  const { navigate } = useNavigation();

  const selectStoneAndGoBack = useCallback(
    ({ type, stone, name }) => {
      navigate('CreateItem', {
        stoneType: {
          type,
          stone,
          name,
        },
      });
    },
    [navigate],
  );

  return (
    <Container>
      <Listcontainer>
        <List.AccordionGroup>
          {StonesImages.stonesType.map(stoneType => (
            <List.Accordion
              title={stoneType.display}
              id={stoneType.type}
              key={stoneType.type}
            >
              <ListContent
                contentContainerStyle={{
                  justifyContent: 'space-around',
                  paddingHorizontal: 10,
                }}
                data={stoneType.stones}
                keyExtractor={item => item.name}
                numColumns={3}
                renderItem={({ item }) => (
                  <ListItemButton
                    onPress={() =>
                      selectStoneAndGoBack({
                        type: stoneType.type,
                        stone: item.display,
                        name: item.name,
                      })
                    }
                  >
                    <ListItem>
                      <StoneImage
                        source={item.img}
                        style={{ resizeMode: 'contain' }}
                      />
                      <StoneImageText numberOfLines={2}>
                        {item.display}
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

export default SelectStone;
