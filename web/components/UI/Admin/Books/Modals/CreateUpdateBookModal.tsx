import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { BookProps } from "../../../../../types/BookTypes";
import ChakraFormikFormField from "../../../Forms/ChakraFormikFormField";
import ChakraFormikNumberInput from "../../../Forms/ChakraFormikNumberInput";
import ChakraFormikTextArea from "../../../Forms/ChakraFormikTextArea";

export interface ICreateOrUpdateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "create" | "update";
  currentBook: BookProps | null;
  updateData: () => void;
}

export default function CreateOrUpdateBookModal({
  isOpen,
  onClose,
  type,
  currentBook,
  updateData,
}: ICreateOrUpdateBookModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues =
    type == "create"
      ? {
          title: undefined,
          description: undefined,
          forSale: true,
          price: undefined,
          coverArtURL: undefined,
          yearOfRelease: undefined,
          authorId: undefined,
        }
      : {
          title: currentBook?.title,
          description: currentBook?.description,
          forSale: currentBook?.forSale,
          price: currentBook?.price,
          coverArtURL: currentBook?.coverArtURL,
          yearOfRelease: currentBook?.yearOfRelease,
          authorId: currentBook?.author.id,
        };

  const handleBookSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>,
    requestType: "POST" | "PATCH"
  ) => {
    try {
      const response = await fetch(
        requestType === "POST"
          ? "http://localhost:3000/api/store/books"
          : `http://localhost:3000/api/store/books/${currentBook?.id}`,
        {
          method: requestType,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (response.ok || response.status === 204) {
        updateData();
        onClose();
      } else if (response.status === 400) {
        const data = await response.json();
        actions.setErrors(data);
      } else {
        const data = await response.json();
        actions.setStatus({ error: data.error });
      }
    } catch (error) {
      actions.setStatus({ error: error.message });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          setIsLoading(true);
          type === "create"
            ? await handleBookSubmit(values, actions, "POST")
            : await handleBookSubmit(values, actions, "PATCH");

          setIsLoading(false);
        }}
      >
        {({ status }) => (
          <Form>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {type === "create" ? "Create" : "Update"} Book
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={5} align="start">
                  <ChakraFormikFormField
                    isRequired
                    fieldName="title"
                    label="Title"
                  />
                  <Field name="forSale">
                    {({ field }: FieldProps) => (
                      <Checkbox
                        colorScheme={type === "create" ? "green" : "blue"}
                        {...field}
                        isChecked={field.value}
                      >
                        For Sale
                      </Checkbox>
                    )}
                  </Field>
                  <ChakraFormikTextArea
                    fieldName="description"
                    label="Description"
                  />
                  <ChakraFormikNumberInput
                    isRequired
                    fieldName="price"
                    label="Price"
                    min={99}
                    max={99999}
                    step={50}
                  />

                  <ChakraFormikNumberInput
                    fieldName="yearOfRelease"
                    label="Year of Release"
                    min={0}
                    max={2025}
                    step={1}
                  />

                  <ChakraFormikFormField
                    isRequired
                    fieldName="coverArtURL"
                    label="Cover Art URL"
                  />
                  <ChakraFormikNumberInput
                    isRequired
                    fieldName="authorId"
                    label="Author ID"
                    min={1}
                    step={1}
                  />
                  {status && (
                    <Box textAlign="center" w="100%">
                      <Text align="center" mx="auto" color="red">
                        {status.error}
                      </Text>
                    </Box>
                  )}
                </VStack>
              </ModalBody>

              <ModalFooter>
                {type === "create" ? (
                  <Button
                    isLoading={isLoading}
                    colorScheme="green"
                    mr={3}
                    type="submit"
                  >
                    Create
                  </Button>
                ) : (
                  <Button
                    isLoading={isLoading}
                    colorScheme="blue"
                    mr={3}
                    type="submit"
                  >
                    Update
                  </Button>
                )}

                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
