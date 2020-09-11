import Room from './Room';

export default interface Budget {
  client: {
    name: string;
    phone: string;
  };
  rooms: Room[];
}
