import React, { useState, useCallback } from 'react';

import Picker from '../../components/PickerInput';

import { Container } from './styles';

const Sink: React.FC = () => {
  const [sink, setSink] = useState<Sink>({} as Sink);

  const handleChangeSinkInfo = useCallback(
    product => {
      setSink(oldSink => ({ ...oldSink, ...product }));
      console.log(sink);
    },
    [sink],
  );

  return (
    <Container>
      <Picker
        title="Formato"
        type="formato"
        handleOnChange={handleChangeSinkInfo}
      />
      <Picker
        title="Pedra"
        type="pedra"
        handleOnChange={handleChangeSinkInfo}
      />
    </Container>
  );
};

export default Sink;

export interface Sink {
  nome: 'Pia';
  formato: string;
  largura: number;
  comprimento: number;
  pedra: string;
  posicaoAcabamento: {
    posicao: number;
    existe: boolean;
  }[];
  acabamentoPrincipal: string;
  pontoDoEsgoto: number;
  furoTorneira: {
    existe: boolean;
    medidas: {
      diametro: number;
      distanciaParede: number;
    };
  };
  saia: {
    existe: boolean;
    posicaoSaia: {
      posicao: number;
      existe: boolean;
      largura: number;
      comprimento: number;
      acabamentoPrincipal: string;
    }[];
  };
  rodamao: {
    existe: boolean;
    posicaoRodamao: {
      posicao: number;
      existe: boolean;
      largura: number;
      comprimento: number;
    }[];
  };
}
