export default interface Item {
  id: string;
  name: string;
  measures: {
    unit: 'cm' | 'm';
    width: string;
    length: string;
  };
  stone: string;
  type: string;
  finishing: string;
  quantity: number;
  shape: 'Retangular' | 'Circular' | 'Triangular';
}
