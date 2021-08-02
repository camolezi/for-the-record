import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Flex,
  Heading,
  HStack,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AnimateSharedLayout } from 'framer-motion';
import { BsCalendar, BsMic, BsGear } from 'react-icons/bs';
import { IconType } from 'react-icons';
import MotionCenter from '../Motion/MotionCenter';

function AppHeader(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const useDesktopHeading = useBreakpointValue([false, false, true]);

  const notSelectedBackgroundColor = 'whiteAlpha.100';
  const selectedBackgroudColor = 'blue.700';

  const calendarPath = '/calendar';
  const recordingPath = '/';
  const optionsPath = '/options';

  const wrapDecorationIfSelected = (isSelected: boolean): JSX.Element => {
    if (isSelected)
      return (
        <MotionCenter
          boxSize="100%"
          layout
          layoutId="outline"
          initial={false}
          transition={{ type: 'spring' }}
          backgroundColor={selectedBackgroudColor}
          zIndex={-1}
        />
      );

    return <></>;
  };

  const MenuItem = (path: string, text: string, icon: IconType) => (
    <MotionCenter
      as="button"
      onTapStart={() => {
        navigate(path);
      }}
      backgroundColor={notSelectedBackgroundColor}
      textAlign="center"
      flex="1"
      role="link"
    >
      <HStack spacing={3} position="absolute">
        {useDesktopHeading && (
          <Heading as="h4" size="md">
            {text}
          </Heading>
        )}
        <Icon boxSize={6} as={icon} aria-label={text} />
      </HStack>

      {wrapDecorationIfSelected(path === location.pathname)}
    </MotionCenter>
  );

  return (
    <AnimateSharedLayout>
      <Flex
        boxSize="100%"
        align="stretch"
        justify="space-around"
        overflow="hidden"
      >
        {MenuItem(calendarPath, 'Calendar', BsCalendar)}
        {MenuItem(recordingPath, 'Recording', BsMic)}
        {MenuItem(optionsPath, 'Options', BsGear)}
      </Flex>
    </AnimateSharedLayout>
  );
}

export default AppHeader;
