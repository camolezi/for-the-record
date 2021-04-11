import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider } from 'react-redux';
import mainStore from './store';

export default function WrapWithProviders(
  children: JSX.Element,
  store = mainStore
): JSX.Element {
  return (
    <Provider store={store}>
      <ChakraProvider>{children}</ChakraProvider>
    </Provider>
  );
}
