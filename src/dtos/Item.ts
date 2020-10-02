export default interface Item {
  id: string;
  name: string;
  measures: {
    unit: 'cm' | 'm';
    width: string;
    length: string;
  };
  quantity: number;
  shape: 'Retangular' | 'Circular' | 'triangular';
}
