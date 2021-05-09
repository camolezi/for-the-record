import React from 'react';

import { Center, CenterProps } from '@chakra-ui/react';
import { HTMLMotionProps, motion } from 'framer-motion';

const MotionCenterChakra = motion(Center);

export default function MotionCenter({
  children,
  ...props
}: CenterProps & HTMLMotionProps<'div'>): JSX.Element {
  return <MotionCenterChakra {...props}>{children}</MotionCenterChakra>;
}
