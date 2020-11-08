import styled from 'styled-components/native';
import { FlatList, Dimensions } from 'react-native';
import { primary50 } from '@styles/theme/colors';

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
  height: 160px;
`;

export const StoneImageWrapper = styled.View`
  border-radius: 10px;
  width: 100%;
  background-color: ${primary50};
  margin-bottom: 15px;
  padding: 5px;
`;

export const StoneImage = styled.Image`
  width: 100%;
  height: 80px;
`;

export const StoneImageText = styled.Text`
  font-family: 'Heebo-Regular';
  font-size: 18px;
  text-align: center;
`;
