import React from 'react';
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import useForm from '../modules/Forms/useForm';

function LoginView(): JSX.Element {
  const [onChange, formState] = useForm({
    name: (value) => {
      if (value === 'error') return false;
      return true;
    },
    password: () => true,
    passwordConfirmation: () => true,
  });

  return (
    <Container maxW="container.sm">
      <form
        onChange={onChange}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formState);
        }}
      >
        <FormControl id="name">
          <FormLabel>Your Name</FormLabel>
          <Input type="text" />
          <FormHelperText>What should we call you?</FormHelperText>
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
          <FormHelperText>
            Your data is not stored in servers. If you lose your password your
            data is lost forever!
          </FormHelperText>
        </FormControl>

        <FormControl id="passwordConfirmation">
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" />
          <Button type="submit">Create</Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default LoginView;
