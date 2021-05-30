import React, { useCallback, useState } from 'react';
import _ from 'lodash';

export interface Validation {
  readonly [id: string]: (
    newValue: string,
    formState: FormState
  ) => null | string;
}

export interface FormState {
  readonly [id: string]: {
    readonly error: string | null;
    readonly value: string;
  };
}

function useForm(
  validation: Validation
): readonly [(e: React.FormEvent<HTMLFormElement>) => void, FormState] {
  const [formState, changeState] = useState<FormState>(
    _.mapValues(validation, () => ({ error: null, value: '' }))
  );

  const validateFormFields = useCallback(
    (currentformState: FormState) => {
      const newFormState = Object.entries(validation).reduce<FormState>(
        (result, [id, validationFunc]) => {
          if (validationFunc) {
            const { value } = currentformState[id];
            const newValidationState = validationFunc(value, currentformState);
            return { ...result, [id]: { error: newValidationState, value } };
          }
          return result;
        },
        {}
      );
      changeState({ ...currentformState, ...newFormState });
    },
    [validation]
  );

  const onChange = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const inputElement = e.target as HTMLInputElement;

      const { id, value } = inputElement;
      validateFormFields({ ...formState, [id]: { ...formState[id], value } });
    },
    [formState, validateFormFields]
  );

  return [onChange, formState] as const;
}

export default useForm;
