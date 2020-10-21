import React, { useCallback, useState } from 'react';
import cep from 'cep-promise';
import { secondary300 } from '@styles/theme/colors';
import { useNavigation } from '@react-navigation/core';

import generateID from '@utils/GenerateID';

import ClientAddress from '@dtos/ClientAddress';
import Button from '@components/Button';
import Modal from '@components/Modal';
import { useBudget } from '../../hooks/budget';

import Input from '../../components/Input';
import SectionLabel from '../../components/SectionLabel';

import {
  Container,
  ScrollView,
  ButtonAdressWrapper,
  LoadingIndicatorContainer,
  LoadingIndicator,
} from './styles';

const ManageAdress: React.FC = () => {
  const { goBack } = useNavigation();
  const { client: contextClient, saveOrCreateAddress } = useBudget();

  const [address, setAddress] = useState<ClientAddress>({
    id: generateID(),
  } as ClientAddress);
  const [loading, setLoading] = useState(false);

  const handleChangeCEP = useCallback(
    (value: string) => {
      setAddress({ ...address, cep: value });
    },
    [address],
  );

  const queryAndValidateCEP = useCallback(async () => {
    if (address.cep.length === 8) {
      try {
        setLoading(true);
        const {
          state,
          city,
          neighborhood,
          street,
          cep: cepAddress,
        } = await cep(address.cep);
        setAddress(oldAdress => ({
          ...oldAdress,
          state,
          street,
          city,
          neighborhood,
          cep: cepAddress,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [address.cep]);

  const handleChangeState = useCallback(
    (value: string) => {
      setAddress({ ...address, state: value });
    },
    [address],
  );

  const handleChangeCity = useCallback(
    (value: string) => {
      setAddress({ ...address, city: value });
    },
    [address],
  );

  const handleChangeNeighborhood = useCallback(
    (value: string) => {
      setAddress({ ...address, neighborhood: value });
    },
    [address],
  );

  const handleChangeStreet = useCallback(
    (value: string) => {
      setAddress({ ...address, street: value });
    },
    [address],
  );

  const handleChangeNumber = useCallback(
    (value: string) => {
      setAddress({ ...address, number: value });
    },
    [address],
  );

  const handleChangeComplement = useCallback(
    (value: string) => {
      setAddress({ ...address, complement: value });
    },
    [address],
  );

  const saveAddress = useCallback(() => {
    saveOrCreateAddress({ ...address, id: generateID() });
    goBack();
  }, [saveOrCreateAddress, address, goBack]);

  return (
    <Container>
      <ScrollView>
        <SectionLabel title="Cliente">
          <Input
            label="CEP"
            placeholder="Digite o CEP"
            value={address.cep}
            onChangeText={handleChangeCEP}
            onEndEditing={queryAndValidateCEP}
            keyboardType="number-pad"
            maxLength={8}
          />
          <Modal visible={loading} transparent>
            <LoadingIndicatorContainer>
              <LoadingIndicator animating size="large" color={secondary300} />
            </LoadingIndicatorContainer>
          </Modal>

          <Input
            label="Estado"
            placeholder="Selecione o Estado"
            autoCapitalize="none"
            value={address.state}
            onChangeText={handleChangeState}
          />

          <Input
            label="Cidade"
            placeholder="Digite a cidade"
            value={address.city}
            onChangeText={handleChangeCity}
            keyboardType="default"
          />

          <Input
            label="Bairro"
            placeholder="Digite o bairro"
            value={address.neighborhood}
            onChangeText={handleChangeNeighborhood}
          />

          <Input
            label="Rua"
            placeholder="Digite a rua"
            value={address.street}
            onChangeText={handleChangeStreet}
            keyboardType="default"
          />

          <Input
            label="Número"
            placeholder="Digite o número"
            value={address.number}
            onChangeText={handleChangeNumber}
            keyboardType="default"
          />

          <Input
            label="Complemento"
            placeholder="Digite o complemento"
            value={address.complement}
            onChangeText={handleChangeComplement}
            keyboardType="default"
          />
        </SectionLabel>

        <ButtonAdressWrapper>
          <Button onPress={saveAddress}>Salvar</Button>
        </ButtonAdressWrapper>
      </ScrollView>
    </Container>
  );
};

export default ManageAdress;
