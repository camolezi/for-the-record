import React from 'react';

import { AspectRatio, Text } from '@chakra-ui/react';
import MotionBox from '../../../components/Motion/MotionBox';
import MotionCenter from '../../../components/Motion/MotionCenter';
import { useTypedDispatch } from '../../../app/Store';
import { selectedDay } from '../actions/CalendarActions';

export interface TileProps {
  dayNumber?: number;
  recordsNumber?: number;
}

const Tile: React.FC<TileProps> = ({ dayNumber, recordsNumber = 0 }) => {
  const dispatch = useTypedDispatch();

  const addTileRecordDecoration = (
    numberOfRecords: number,
    element: JSX.Element | null
  ) => {
    if (numberOfRecords > 0)
      return (
        <MotionCenter
          bgColor="blue.800"
          width="30%"
          height="30%"
          borderRadius="50%"
          whileHover={{ scale: 1.2 }}
        >
          <MotionCenter
            bgColor="blue.300"
            width="60%"
            height="60%"
            borderRadius="50%"
            whileHover={{ scale: 1.5 }}
          >
            {element}
          </MotionCenter>
        </MotionCenter>
      );

    return element;
  };

  return (
    <AspectRatio ratio={1}>
      <MotionBox
        initial={{ x: '-25vw', scaleY: 0.7 }}
        animate={{ x: 0, scaleY: [0.7, 0.7, 1] }}
        boxSize="100%"
        bgColor="gray.700"
        layout
        whileHover={{ scale: 1.2 }}
        onClick={() => {
          if (dayNumber) dispatch(selectedDay(dayNumber));
        }}
      >
        {addTileRecordDecoration(recordsNumber, null)}
        <Text textAlign="center">{dayNumber}</Text>
      </MotionBox>
    </AspectRatio>
  );
};

export default Tile;
