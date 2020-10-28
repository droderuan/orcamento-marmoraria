import Room from './Room';
import Client from './Client';
import ClientAddress from './ClientAddress';

export default interface Budget {
  id: string;
  rooms: Room[];
  client: Client;
  deliveryAddress: ClientAddress;
  created_at: Date;
}
