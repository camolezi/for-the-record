import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';
import ColorModeButton from './ColorModeButton';

function AppHeader(): JSX.Element {
  return (
    <Flex boxSize="100%" align="center" justify="space-around">
      <Button as="div">
        <Link to="calendar">Calendar</Link>
      </Button>

      <Button as="div">
        <Link to="/">Recording</Link>
      </Button>
      <ColorModeButton />
    </Flex>
  );
}

export default AppHeader;
