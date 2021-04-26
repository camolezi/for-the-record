import React from 'react';

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export interface TileProps {
  text: string;
}

const MotionBox = motion(Box);

const Tile: React.FC<TileProps> = ({ text }) => {
  return (
    <MotionBox
      height="40px"
      bg="red.300"
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {text}
    </MotionBox>
  );
};

export default Tile;
