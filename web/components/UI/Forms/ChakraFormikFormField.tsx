import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import React from "react";

export interface IChakraFormikFormFieldProps {
  fieldName: string;
  label: string;
  isRequired?: boolean;
}

export default function ChakraFormikFormField({
  fieldName,
  label,
  isRequired,
}: IChakraFormikFormFieldProps) {
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
          <Input {...field} id={fieldName} placeholder={label} />
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
