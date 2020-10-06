import Room from './Room';

export default interface Budget {
  id: string;
  room: Room[];
  client: {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    adress: [
      {
        street: string;
        complement: string;
        city: string;
        state: string;
        zip: string;
      },
    ];
  };
}
