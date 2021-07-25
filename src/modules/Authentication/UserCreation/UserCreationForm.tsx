import React from 'react';
import { useTypedDispatch } from '../../../app/Store';
import BasicForm from '../../../components/Form/BasicForm';
import { createNewUser } from '../actions/UserActions';

function UserCreationForm(): JSX.Element {
  const dispatch = useTypedDispatch();
  return (
    <BasicForm
      onSubmit={(state) =>
        dispatch(
          createNewUser({
            name: state.name.value,
            password: state.password.value,
          })
        )
      }
      definition={[
        {
          id: 'name',
          label: 'Your Name',
          helperText: 'What should we call you?',
          validation: (value) => {
            if (value.length >= 5) return '';
            return 'Your name is too short';
          },
        },
        {
          id: 'password',
          label: 'Password',
          type: 'password',
          helperText:
            'Your data is not stored in servers. If you lose your password your data is lost forever!',
          validation: (value) => {
            if (value.length >= 5) return '';
            return 'Your password is too short';
          },
        },
        {
          id: 'passwordConfirmation',
          label: 'Confirm Password',
          type: 'password',
          validation: (value, otherValues) => {
            if (value === otherValues.password.value) return '';
            return 'Passwords are different';
          },
        },
      ]}
    />
  );
}

export default UserCreationForm;
