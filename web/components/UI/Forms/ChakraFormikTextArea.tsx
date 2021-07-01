import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import React from "react";

export interface IChakraFormikTextAreaProps {
  fieldName: string;
  label: string;
  isRequired?: boolean;
}

export default function ChakraFormikTextArea({
  fieldName,
  label,
  isRequired,
}: IChakraFormikTextAreaProps) {
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
          <Textarea {...field} id={fieldName} placeholder={label} />
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
