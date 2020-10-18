import ClientAddress from './ClientAddress';

export default interface Client {
  name: string;
  phone: string;
  cpf: string;
  email: string;
  address: ClientAddress[];
}
