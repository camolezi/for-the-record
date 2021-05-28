import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BasicForm, { InputDeclation } from './BasicForm';

describe('Basic form', () => {
  const basicFormFixture: InputDeclation[] = [
    {
      id: 'name',
      label: 'Your Name',
      helperText: 'What should we call you?',
      validation: (value) => {
        if (value === 'notvalid') return 'Error message';
        return null;
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
  ];

  it('Should contain specified inputs labels', () => {
    render(<BasicForm definition={basicFormFixture} />);

    basicFormFixture.forEach(({ label }) =>
      expect(screen.getByLabelText(label)).toBeVisible()
    );
  });

  it('Should contain specified helper texts', () => {
    render(<BasicForm definition={basicFormFixture} />);

    basicFormFixture.forEach(({ helperText }) => {
      if (helperText) expect(screen.getByText(helperText)).toBeVisible();
    });
  });

  it('Should contains input of the specified types', () => {
    render(<BasicForm definition={basicFormFixture} />);

    basicFormFixture.forEach(({ label, type }) => {
      const input = screen.getByLabelText(label);
      expect(input).toHaveProperty('type', type ?? 'text');
    });
  });

  it('Have correct submit button text', () => {
    render(
      <BasicForm definition={basicFormFixture} submitText="ButtonTextTest" />
    );

    const button = screen.getByRole('button', { name: 'ButtonTextTest' });
    expect(button).toBeVisible();
  });

  it('Should display correct error message', () => {
    render(<BasicForm definition={basicFormFixture} />);

    const errorText = screen.queryByText('Error message');
    expect(errorText).toBeNull();

    userEvent.type(screen.getByLabelText('Your Name'), 'notvalid');

    const errorTextAfterType = screen.getByText('Error message');
    expect(errorTextAfterType).toBeVisible();
  });

  it('Should call submit callback when submit button is clicked, using correct form state', () => {
    const spy = jest.fn();
    render(<BasicForm definition={basicFormFixture} onSubmit={spy} />);

    userEvent.type(screen.getByLabelText('Your Name'), 'notvalid');
    userEvent.type(screen.getByLabelText('Password'), 'somepassword');

    screen.getByRole('button', { name: 'Submit', exact: false }).click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      name: {
        error: 'Error message',
        value: 'notvalid',
      },
      password: {
        error: null,
        value: 'somepassword',
      },
      passwordConfirmation: {
        error: null,
        value: '',
      },
    });
  });
});
