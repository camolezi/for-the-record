import React from 'react';
import BasicForm from '../../../components/Form/BasicForm';

function UserCreationForm(): JSX.Element {
  return (
    <BasicForm
      onSubmit={(state) => console.log(state)}
      definition={[
        {
          id: 'name',
          label: 'Your Name',
          helperText: 'What should we call you?',
          validation: (value) => {
            if (value.length >= 5) return null;
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
            if (value.length >= 5) return null;
            return 'Your password is too short';
          },
        },
        {
          id: 'passwordConfirmation',
          label: 'Confirm Password',
          type: 'password',
          validation: (value, otherValues) => {
            if (value === otherValues.password.value) return null;
            return 'Passwords are different';
          },
        },
      ]}
    />
  );
}

export default UserCreationForm;
