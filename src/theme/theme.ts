import { extendTheme } from '@chakra-ui/react';
import themeConfig from './config';

const AppTheme = extendTheme({
  config: themeConfig,
  styles: {
    global: {
      '*': {
        '-webkit-tap-highlight-color': 'transparent !important',
      },
    },
  },
});

export default AppTheme;
