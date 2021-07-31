import React from 'react';
import { Box } from '@chakra-ui/react';
import ColorModeButton from '../components/Header/ColorModeButton';

function OptionsView(): JSX.Element {
  return (
    <Box centerContent boxSize="100%">
      <ColorModeButton />
    </Box>
  );
}

export default OptionsView;
