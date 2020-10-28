import React, { useMemo } from 'react';

import {
  SelectFinishingContainer,
  SelectFinishingBackground,
  EdgeFinishingButtonWrapper,
  ButtonText,
  FinishingSelectButton,
} from './styles';

interface EdgeFinishingPosition {
  position: string;
  name: string;
}

interface CircleSelectEdgeProps {
  stoneImage: any;
  edgeFinishing: { position: string }[];
  handleChangeFinishingPosition(options: EdgeFinishingPosition): void;
}

const CircleSelectEdge: React.FC<CircleSelectEdgeProps> = ({
  stoneImage,
  edgeFinishing,
  handleChangeFinishingPosition,
}) => {
  const positionOne = useMemo(() => {
    return !!edgeFinishing.find(edgeFinish => edgeFinish.position === '1');
  }, [edgeFinishing]);

  return (
    <SelectFinishingContainer>
      <SelectFinishingBackground
        imageStyle={{ borderRadius: 90 }}
        source={stoneImage}
      >
        <EdgeFinishingButtonWrapper>
          <FinishingSelectButton
            onPress={() =>
              handleChangeFinishingPosition({
                position: '1',
                name: 'Perímetro',
              })
            }
            isSelected={positionOne}
            style={{
              marginTop: -19,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 6,
            }}
          >
            <ButtonText isSelected={!!positionOne}>1</ButtonText>
          </FinishingSelectButton>
        </EdgeFinishingButtonWrapper>
      </SelectFinishingBackground>
    </SelectFinishingContainer>
  );
};

export default CircleSelectEdge;
