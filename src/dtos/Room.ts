import Product from './Product';

export default interface Room {
  id: string;
  name: string;
  products: Product[];
}
