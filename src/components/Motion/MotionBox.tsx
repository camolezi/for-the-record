import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';
import { HTMLMotionProps, motion } from 'framer-motion';

const MotionBoxChakra = motion(Box);

export default function MotionBox({
  children,
  ...props
}: BoxProps & HTMLMotionProps<'div'>): JSX.Element {
  return (
    <>
      <MotionBoxChakra {...props}>{children}</MotionBoxChakra>
    </>
  );
}
