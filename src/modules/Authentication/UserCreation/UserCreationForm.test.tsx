import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserCreationForm from './UserCreationForm';

describe('UserCreationForm', () => {
  const passwordNotEqualErrorText = 'Passwords are different';

  it('should display error if passwords are not equal', () => {
    render(<UserCreationForm />);

    const passwordIn = screen.getAllByLabelText('Password', {
      exact: false,
    })[0];
    userEvent.type(passwordIn, 'secretPassword');

    const passwordConfirmationIn = screen.getByLabelText('Confirm Password', {
      exact: false,
    });
    userEvent.type(passwordConfirmationIn, 'differentPassword');

    expect(screen.getByText(passwordNotEqualErrorText)).toBeVisible();
  });

  it('should not diplay error if passwords are equal', () => {
    render(<UserCreationForm />);

    const passwordConfirmationIn = screen.getByLabelText('Confirm Password', {
      exact: false,
    });
    userEvent.type(passwordConfirmationIn, 'secretPassword');

    const passwordIn = screen.getAllByLabelText('Password', {
      exact: false,
    })[0];
    userEvent.type(passwordIn, 'secretPassword');

    expect(screen.queryByText(passwordNotEqualErrorText)).toBeNull();
  });
});
