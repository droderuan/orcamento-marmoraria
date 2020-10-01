export default interface Item {
  id: string;
  name: string;
  size: string;
  quantity: number;
  format: 'retangular' | 'circular' | 'triangular';
}
