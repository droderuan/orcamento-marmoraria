import React, { useCallback, useState, useEffect } from 'react';
import cep from 'cep-promise';
import { useNavigation, useRoute } from '@react-navigation/core';

import generateID from '@utils/GenerateID';

import ClientAddress from '@dtos/ClientAddress';
import Button from '@components/Button';
import Modal from '@components/Modal';
import { secondary300 } from '@styles/theme/colors';
import { useBudget } from '@hooks/budget';

import Input from '@components/Input';
import SectionLabel from '@components/SectionLabel';

import { RadioButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import {
  Container,
  ScrollView,
  ButtonAdressWrapper,
  LoadingIndicatorContainer,
  LoadingIndicator,
} from './styles';
import { RadioButtomItem } from '../CreateItem/styles';

interface RouteParamsProps {
  addressId?: string;
}

const ManageAdress: React.FC = () => {
  const { goBack, setOptions } = useNavigation();
  const route = useRoute();
  const { addressId } = route?.params as RouteParamsProps;
  const { saveOrCreateAddress, getAddress, deleteAddress } = useBudget();

  const [address, setAddress] = useState<ClientAddress>({
    id: generateID(),
    deliveryAddress: true,
  } as ClientAddress);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (addressId) {
      setAddress(getAddress(addressId));
    }
  }, []);

  useEffect(() => {
    if (address) {
      setOptions({
        headerRight: () => (
          <TouchableNativeFeedback
            onPress={() => {
              deleteAddress(address.id);
              goBack();
            }}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={42}
              color="#fff"
            />
          </TouchableNativeFeedback>
        ),
      });
    }
  }, [setOptions, address, deleteAddress, goBack]);

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

  const handleSetDeliveryAddress = useCallback(
    (value: string) => {
      setAddress({
        ...address,
        deliveryAddress: value === 'true',
      });
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
          <Input label="Endereço de entrega?">
            <RadioButton.Group
              onValueChange={value => handleSetDeliveryAddress(value)}
              value="true"
            >
              <RadioButtomItem>
                <RadioButton.Item
                  label="Sim"
                  value="true"
                  labelStyle={{ fontSize: 20 }}
                  style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                />
                <RadioButton.Item
                  label="Não"
                  value="false"
                  labelStyle={{ fontSize: 20 }}
                  style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                />
              </RadioButtomItem>
            </RadioButton.Group>
          </Input>
        </SectionLabel>

        <ButtonAdressWrapper>
          <Button onPress={saveAddress}>Salvar</Button>
        </ButtonAdressWrapper>
      </ScrollView>
    </Container>
  );
};

export default ManageAdress;
