import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppTheme from '../theme/theme';
import mainStore from './Store';

export default function WrapWithProviders(
  children: JSX.Element,
  store = mainStore
): JSX.Element {
  return (
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={AppTheme}>{children}</ChakraProvider>
      </Router>
    </Provider>
  );
}
