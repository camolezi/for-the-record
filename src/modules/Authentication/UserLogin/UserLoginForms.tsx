import React from 'react';
import { useTypedDispatch } from '../../../app/Store';
import BasicForm from '../../../components/Form/BasicForm';
import { loginUser } from '../actions/UserActions';

function UserLoginForms(): JSX.Element {
  const dispatch = useTypedDispatch();
  return (
    <BasicForm
      onSubmit={(state) => dispatch(loginUser(state.password.value))}
      definition={[
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
      ]}
    />
  );
}

export default UserLoginForms;
