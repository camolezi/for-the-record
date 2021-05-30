import React from 'react';
import { Container } from '@chakra-ui/react';

import UserCreationForm from '../modules/Authentication/UserCreation/UserCreationForm';

function CreateUserView(): JSX.Element {
  return (
    <Container maxW="container.sm">
      <UserCreationForm />
    </Container>
  );
}

export default CreateUserView;
