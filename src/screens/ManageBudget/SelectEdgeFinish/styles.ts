import styled from 'styled-components/native';
import { FlatList, Dimensions } from 'react-native';

interface ItemProps {
  name: string;
  displayName: string;
  img: any;
}

export const Container = styled.View`
  flex: 1;
`;

export const Listcontainer = styled.View`
  height: 100%;
`;

export const ListContent = styled(FlatList as new () => FlatList<ItemProps>)`
  height: ${Dimensions.get('window').height - 200}px;
`;

export const ListItemButton = styled.TouchableNativeFeedback``;

export const ListItem = styled.View`
  padding: 5px;
  align-items: center;
  flex: 1;
  flex-basis: 0;
  height: 200px;
`;

export const StoneImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 120px;
  margin-bottom: 10px;
`;

export const StoneImageText = styled.Text`
  font-family: 'Heebo-Regular';
  font-size: 18px;
  text-align: center;
`;
