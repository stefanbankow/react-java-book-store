import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import * as React from "react";

export interface IChakraFormikNumberInputProps {
  fieldName: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  isRequired?: boolean;
}

export default function ChakraFormikNumberInput({
  fieldName,
  label,
  isRequired,
  min,
  max,
  step,
}: IChakraFormikNumberInputProps) {
  return (
    <Field name={fieldName}>
      {({ field, form }: FieldProps) => (
        <FormControl
          isInvalid={
            Boolean(form.errors[fieldName]) && Boolean(form.touched[fieldName])
          }
          isRequired={isRequired}
        >
          <FormLabel htmlFor={fieldName}>{label}</FormLabel>
          <NumberInput
            {...field}
            onChange={(val) => {
              form.setFieldValue(field.name, val);
              form.setFieldTouched(field.name, true);
            }}
            id={fieldName}
            min={min}
            max={max}
            step={step}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
