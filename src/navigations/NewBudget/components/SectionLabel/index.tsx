import React from 'react';

import {
  Container,
  SectionContainer,
  SectionTitle,
  SectionContent,
} from './styles';

interface SectionLabelProps {
  title: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ title, children }) => {
  return (
    <Container>
      <SectionContainer>
        <SectionTitle>{title}</SectionTitle>
      </SectionContainer>
      <SectionContent>{children}</SectionContent>
    </Container>
  );
};

export default SectionLabel;
