import styled from 'styled-components/native';

interface ListOptionItemProps {
  selected: boolean;
}

export const Container = styled.View`
  height: 500px;
`;

export const ListPickerContainer = styled.ScrollView``;

export const ListOptionItemButton = styled.TouchableOpacity``;

export const ListOptionItem = styled.View<ListOptionItemProps>`
  justify-content: center;
  padding-top: 12px;
  border-radius: 5px;
  max-width: 350px;
  ${props => props.selected && 'background-color: rgba(0,0,0, 0.1)'}
`;

export const ListOptionItemText = styled.Text`
  margin-left: 15px;
  margin-bottom: 5px;
  font-family: 'Roboto-regular';
  font-size: 28px;
  color: #000;
`;

export const ItemBottomLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: #487195;
`;
