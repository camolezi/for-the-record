import React from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';

import useForm, { FormState, Validation } from '../../modules/Forms/useForm';

export interface InputDeclation {
  id: string;
  label: string;
  type?: string;
  helperText?: string;
  validation?: (newValue: string, formState: FormState) => string | null;
}

interface BasicFormProps {
  definition: ReadonlyArray<InputDeclation>;
  submitText?: string;
  onSubmit?: (state: FormState) => void;
}

function isNotNullAndEmpty(input: string | null): boolean {
  if (input !== null && input !== '') return true;
  return false;
}

function BasicForm({
  definition,
  submitText = 'Submit',
  onSubmit = () => {},
}: BasicFormProps): JSX.Element {
  function getFormValidation(): Validation {
    return definition.reduce<Validation>((validationObj, input) => {
      const validationFunc = input.validation ?? (() => null);
      return { ...validationObj, [input.id]: validationFunc };
    }, {});
  }

  const [onChange, formState] = useForm(getFormValidation());

  const inputs = definition.map((inputElement) => (
    <FormControl
      key={inputElement.id}
      id={inputElement.id}
      isInvalid={isNotNullAndEmpty(formState[inputElement.id].error)}
    >
      <FormLabel>{inputElement.label}</FormLabel>
      <Input type={inputElement.type ?? 'text'} />
      {inputElement.helperText && (
        <FormHelperText>{inputElement.helperText}</FormHelperText>
      )}
      <FormErrorMessage>{formState[inputElement.id].error}</FormErrorMessage>
    </FormControl>
  ));

  const submitButtonDisabled = Object.values(formState).reduce(
    (current, field) => {
      if (field.error === null || field.error !== '') return true;
      return current;
    },
    false
  );

  return (
    <form
      onChange={onChange}
      onSubmit={() => {
        onSubmit(formState);
      }}
    >
      <VStack spacing={7} align="stretch">
        {inputs}
      </VStack>

      <Button
        width="100%"
        my={7}
        type="submit"
        colorScheme="gray"
        disabled={submitButtonDisabled}
      >
        {submitText}
      </Button>
    </form>
  );
}

export default BasicForm;
