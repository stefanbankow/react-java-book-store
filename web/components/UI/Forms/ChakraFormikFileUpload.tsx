import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import React, { useState } from "react";

export interface IChakraFormikFileUploadProps {
  externalFileUrl?: string;
  fieldName: string;
  label: String;
  accept: string;
  isRequired?: boolean;
}

export default function ChakraFormikFileUpload({
  externalFileUrl,
  fieldName,
  label,
  isRequired,
  accept,
}: IChakraFormikFileUploadProps) {
  const [fileName, setFileName] = useState<string | undefined>(undefined);
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
          <InputGroup>
            <Input
              _disabled={{ cursor: "default" }}
              isReadOnly
              value={fileName ? fileName : externalFileUrl}
            />
            <InputRightElement>
              <Button as="label" htmlFor={fieldName} cursor="pointer">
                +
              </Button>
            </InputRightElement>
            <input
              itemID="file-input"
              style={{ display: "none" }}
              type="file"
              accept={accept}
              onChange={(event) => {
                if (event.currentTarget.files) {
                  form.setFieldValue(fieldName, event.currentTarget.files[0]);
                  setFileName(event.currentTarget.files[0].name);
                }
              }}
              id={fieldName}
            />
          </InputGroup>

          <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
