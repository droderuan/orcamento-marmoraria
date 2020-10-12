import styled from 'styled-components/native';

export const Container = styled.Modal``;

export const ModalBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.55);
  padding: 20px;
`;

export const CloseModalTouchable = styled.TouchableWithoutFeedback``;

export const ModalContent = styled.View`
  border-radius: 10px;
  justify-content: center;
  background-color: #fff;
`;
