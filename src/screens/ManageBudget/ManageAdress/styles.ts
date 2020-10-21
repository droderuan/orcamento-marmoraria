import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
`;

export const ScrollView = styled.ScrollView`
  width: 100%;
`;

export const ButtonAdressWrapper = styled.View`
  flex: 1;
  margin-top: 10px;
  align-items: center;
`;
export const LoadingIndicatorContainer = styled.View`
  padding: 5px;
`;

export const LoadingIndicator = styled(ActivityIndicator)`
  padding: 10px;
`;
