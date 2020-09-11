import React from 'react';

import RoomProps from '@dtos/Room';

import { Container, Section, TitleWrapper, SectionTitle, Line } from './styles';

const Room: React.FC<RoomProps> = ({ children, name }) => {
  return (
    <Container>
      <Section>
        <TitleWrapper>
          <SectionTitle>{name}</SectionTitle>
          <Line />
        </TitleWrapper>
      </Section>
      {children}
    </Container>
  );
};

export default Room;
