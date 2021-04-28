import React from 'react';

import { AspectRatio, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export interface TileProps {
  text: string;
}

const MotionBox = motion(Box);

const Tile: React.FC<TileProps> = ({ text }) => {
  return (
    <AspectRatio ratio={1}>
      <MotionBox
        initial={{ x: '-25vw', scaleY: 0.7 }}
        animate={{ x: 0, scaleY: [0.7, 0.7, 1] }}
        boxSize="100%"
        bgColor="gray.700"
        layout
        whileHover={{ scale: 1.2 }}
      >
        <Text textAlign="center">{text}</Text>
      </MotionBox>
    </AspectRatio>
  );
};

export default Tile;
