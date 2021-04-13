import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider } from 'react-redux';
import AppTheme from '../theme/theme';
import mainStore from './Store';

export default function WrapWithProviders(
  children: JSX.Element,
  store = mainStore
): JSX.Element {
  return (
    <Provider store={store}>
      <ChakraProvider theme={AppTheme}>{children}</ChakraProvider>
    </Provider>
  );
}
