export default interface Item {
  id: string;
  name: string;
  measures: {
    unit: string;
    width: string;
    length: string;
  };
  surfaceFinish: string;
  finishing: {
    position: string;
    type: string;
  }[];
  quantity: string;
  shape: string;
  stoneType: {
    type: string;
    stone: string;
  };
}
