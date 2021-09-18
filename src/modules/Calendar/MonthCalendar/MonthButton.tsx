import React from 'react';

import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@chakra-ui/react';

const MotionButton = motion(Button);

export default function MonthButton({
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <MotionButton
      colorScheme="gray"
      // TODO - Button not returning to normal size after framer motion animation
      // whileHover={{ scale: 1.1 }}
      // whileTap={{ scale: 0.6, transition: { duration: 0.1 } }}
      {...props}
    >
      {children}
    </MotionButton>
  );
}
