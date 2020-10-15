export default interface Item {
  id: string;
  name: string;
  measures: {
    unit: string;
    width: string;
    length: string;
  };
  stone: string;
  type: string;
  surfaceFinish: string;
  finishing: {
    position: string;
    type: string;
  }[];
  quantity: string;
  shape: string;
}
