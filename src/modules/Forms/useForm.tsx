import React, { useState } from 'react';
import _ from 'lodash';

export interface Validation {
  readonly [id: string]: (newValue: string) => null | string;
}
export interface FormInputState {
  readonly [id: string]: {
    readonly error: string | null;
    readonly value: string;
  };
}

function useForm(
  validation: Validation
): readonly [(e: React.FormEvent<HTMLFormElement>) => void, FormInputState] {
  const [formState, changeState] = useState<FormInputState>(
    _.mapValues(validation, () => ({ error: null, value: '' }))
  );

  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const inputElement = e.target as HTMLInputElement;

    const { id, value } = inputElement;
    const validationFunction = validation[id] ?? null;
    if (validationFunction) {
      const newValidationState = validationFunction(value);
      changeState({ ...formState, [id]: { error: newValidationState, value } });
    }
  };
  return [onChange, formState] as const;
}

export default useForm;
