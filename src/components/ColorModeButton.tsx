import React from 'react';
import { Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { MdBrightness4 } from 'react-icons/md';

function ColorModeButton(): JSX.Element {
  const { toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      colorScheme="teal"
      aria-label="ColorMode"
      icon={<Icon as={MdBrightness4} />}
    />
  );
}

export default ColorModeButton;
