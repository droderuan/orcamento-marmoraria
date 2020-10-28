export default interface Item {
  id: string;
  name: string;
  measures: {
    unit: string;
    width: string;
    length: string;
  };
  surfaceFinish: string;
  edgeFinishing: string;
  edgeFinishingPosition: { position: string; name: string }[];
  quantity: string;
  shape: string;
  stoneType: {
    type: string;
    stone: string;
  };
}
