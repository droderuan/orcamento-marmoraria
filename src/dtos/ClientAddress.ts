export default interface ClientAddress {
  id: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  cep: string;
  complement: string;
  deliveryAddress: boolean;
}
