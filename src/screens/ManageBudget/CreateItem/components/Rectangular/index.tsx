import React, { useMemo } from 'react';

import {
  SelectFinishingContainer,
  SelectFinishingBackground,
  EdgeFinishingButtonWrapper,
  MiddleFinishingButtonWrapper,
  ButtonText,
  FinishingSelectButton,
} from './styles';

interface RectangularProps {
  stoneImage: any;
  edgeFinishing: { position: string }[];
  handleChangeFinishingPosition(position: string): void;
}

const Rectangular: React.FC<RectangularProps> = ({
  stoneImage,
  edgeFinishing,
  handleChangeFinishingPosition,
}) => {
  const positionOne = useMemo(() => {
    return !!edgeFinishing.find(edgeFinish => edgeFinish.position === '1');
  }, [edgeFinishing]);

  const positionTwo = useMemo(() => {
    return !!edgeFinishing.find(edgeFinish => edgeFinish.position === '2');
  }, [edgeFinishing]);

  const positionThree = useMemo(() => {
    return !!edgeFinishing.find(edgeFinish => edgeFinish.position === '3');
  }, [edgeFinishing]);

  const positionFour = useMemo(() => {
    return !!edgeFinishing.find(edgeFinish => edgeFinish.position === '4');
  }, [edgeFinishing]);

  return (
    <SelectFinishingContainer>
      <SelectFinishingBackground
        imageStyle={{ borderRadius: 10 }}
        source={stoneImage}
      >
        <EdgeFinishingButtonWrapper>
          <FinishingSelectButton
            onPress={() => handleChangeFinishingPosition('1')}
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

        <MiddleFinishingButtonWrapper>
          <FinishingSelectButton
            isSelected={positionTwo}
            style={{
              marginLeft: -19,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 6,
            }}
            onPress={() => handleChangeFinishingPosition('2')}
          >
            <ButtonText isSelected={positionTwo}>2</ButtonText>
          </FinishingSelectButton>
          <FinishingSelectButton
            isSelected={positionThree}
            style={{
              marginRight: -19,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 6,
            }}
            onPress={() => handleChangeFinishingPosition('3')}
          >
            <ButtonText isSelected={positionThree}>3</ButtonText>
          </FinishingSelectButton>
        </MiddleFinishingButtonWrapper>

        <EdgeFinishingButtonWrapper>
          <FinishingSelectButton
            isSelected={positionFour}
            style={{
              marginBottom: -19,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 6,
            }}
            onPress={() => handleChangeFinishingPosition('4')}
          >
            <ButtonText isSelected={positionFour}>4</ButtonText>
          </FinishingSelectButton>
        </EdgeFinishingButtonWrapper>
      </SelectFinishingBackground>
    </SelectFinishingContainer>
  );
};

export default Rectangular;
