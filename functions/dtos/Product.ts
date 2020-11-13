import Item from './Item';

export default interface Product {
  id: string;
  name: string;
  items: Item[];
}
