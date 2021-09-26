import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import * as React from "react";

export interface IChakraFormikFileUploadProps {
  fieldName: string;
  label: String;
  accept: string;
  isRequired?: boolean;
}

export default function ChakraFormikFileUpload({
  fieldName,
  label,
  isRequired,
  accept,
}: IChakraFormikFileUploadProps) {
  return (
    <Field name={fieldName}>
      {({ form }: FieldProps) => (
        <FormControl
          isInvalid={
            Boolean(form.errors[fieldName]) && Boolean(form.touched[fieldName])
          }
          isRequired={isRequired}
        >
          <FormLabel htmlFor={fieldName}>{label}</FormLabel>
          <Input
            type="file"
            accept={accept}
            onChange={(event) => {
              if (event.currentTarget.files)
                form.setFieldValue(fieldName, event.currentTarget.files[0]);
            }}
            id={fieldName}
          />
          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
