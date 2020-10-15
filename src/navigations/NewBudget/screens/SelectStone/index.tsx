import React, { useCallback } from 'react';
import StonesImages from '@assets/images/pedra';
import { List } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useBudget } from '../../hooks/budget';

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

interface RouteParams {
  handleChangeStone({ type, stone }: ChangeStoneDTO): void;
}

const SelectStone: React.FC = () => {
  const route = useRoute();
  const { handleChangeStone } = route.params as RouteParams;
  const { goBack } = useNavigation();

  const selectStoneAndGoBack = useCallback(
    ({ type, stone }) => {
      handleChangeStone({
        type,
        stone,
      });
      goBack();
    },
    [goBack, handleChangeStone],
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
                      })
                    }
                  >
                    <ListItem>
                      <StoneImage source={item.img} />
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
