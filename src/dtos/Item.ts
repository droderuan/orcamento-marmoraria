export default interface Item {
  id: string;
  name: string;
  shape: 'Retangular' | 'Circular';
  unit: string;
  measures: {
    displayMeasures: string;
    width?: string;
    length?: string;
    diameter?: string;
  };
  surfaceFinish: string;
  edgeFinishing: string;
  edgeFinishingPosition: { position: string; name: string }[];
  quantity: string;
  stoneType: {
    type: string;
    stone: string;
  };
  moreInfo: string;
}
