import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

export default function WrapWithProviders(children: JSX.Element): JSX.Element {
  return (
    <Provider store={store}>
      <ChakraProvider>{children}</ChakraProvider>
    </Provider>
  );
}
