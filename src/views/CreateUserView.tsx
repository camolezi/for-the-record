import React from 'react';
import { Container } from '@chakra-ui/react';

import BasicForm from '../components/Form/BasicForm';

function LoginView(): JSX.Element {
  return (
    <Container maxW="container.sm">
      <BasicForm
        onSubmit={(state) => console.log(state)}
        definition={[
          {
            id: 'name',
            label: 'Your Name',
            helperText: 'What should we call you?',
            validation: (value) => {
              if (value === 'error') return false;
              return true;
            },
          },
          {
            id: 'password',
            label: 'Password',
            type: 'password',
            helperText:
              'Your data is not stored in servers. If you lose your password your data is lost forever!',
          },
          {
            id: 'passwordConfirmation',
            label: 'Confirm Password',
            type: 'password',
          },
        ]}
      />
    </Container>
  );
}

export default LoginView;
