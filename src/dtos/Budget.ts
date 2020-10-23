import Room from './Room';
import Client from './Client';

export default interface Budget {
  id: string;
  rooms: Room[];
  client: Client;
  created_at: Date;
}
