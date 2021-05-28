import React from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import useForm, {
  FormInputState,
  Validation,
} from '../../modules/Forms/useForm';

export interface InputDeclation {
  id: string;
  label: string;
  type?: string;
  helperText?: string;
  validation?: (newValue: string) => boolean;
}

interface BasicFormProps {
  definition: ReadonlyArray<InputDeclation>;
  onSubmit?: (state: FormInputState) => void;
}

function BasicForm({
  definition,
  onSubmit = () => {},
}: BasicFormProps): JSX.Element {
  function getFormValidation(): Validation {
    return definition.reduce((validationObj, input) => {
      const validationFunc = input.validation ?? (() => true);
      return { ...validationObj, [input.id]: validationFunc };
    }, {});
  }

  const [onChange, formState] = useForm(getFormValidation());

  const inputs = definition.map((inputElement) => (
    <FormControl key={inputElement.id} id={inputElement.id}>
      <FormLabel>{inputElement.label}</FormLabel>
      <Input type={inputElement.type ?? 'text'} />
      {inputElement.helperText && (
        <FormHelperText>{inputElement.helperText}</FormHelperText>
      )}
    </FormControl>
  ));

  return (
    <form
      onChange={onChange}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formState);
      }}
    >
      {inputs}
      <Button type="submit">Create</Button>
    </form>
  );
}

export default BasicForm;
