import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, Heading } from '@chakra-ui/react';
import { AnimateSharedLayout } from 'framer-motion';
import MotionCenter from '../Motion/MotionCenter';

function AppHeader(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
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

  const MenuItem = (path: string, text: string) => (
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
      <Heading position="absolute" as="h4" size="md">
        {text}
      </Heading>

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
        {MenuItem(calendarPath, 'Calendar')}
        {MenuItem(recordingPath, 'Recording')}
        {MenuItem(optionsPath, 'Options')}
      </Flex>
    </AnimateSharedLayout>
  );
}

export default AppHeader;
