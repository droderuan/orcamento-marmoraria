export default interface Client {
  name: string;
  phone: string;
  cpf: string;
  adress: {
    street: string;
    zip: string;
    complement: string;
  }[];
}
