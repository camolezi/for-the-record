import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider } from 'react-redux';
import CreateStore from './store';

export default function WrapWithProviders(children: JSX.Element): JSX.Element {
  return (
    <Provider store={CreateStore()}>
      <ChakraProvider>{children}</ChakraProvider>
    </Provider>
  );
}
