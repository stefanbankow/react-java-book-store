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
import React from "react";
import { BookProps } from "../../../../../types/BookTypes";
import ChakraFormikFormField from "../../../Forms/ChakraFormikFormField";
import ChakraFormikNumberInput from "../../../Forms/ChakraFormikNumberInput";
import ChakraFormikTextArea from "../../../Forms/ChakraFormikTextArea";

export interface ICreateOrUpdateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "create" | "update";
  currentBook: BookProps | null;
}

export default function CreateOrUpdateBookModal({
  isOpen,
  onClose,
  type,
  currentBook,
}: ICreateOrUpdateBookModalProps) {
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

  let errorMessage: React.ReactElement | null = null;

  const handleCreateBookSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const response = await fetch("http://localhost:3000/api/store/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.status < 200 || response.status > 299) {
        const data = await response.json();
        console.log(data);
        actions.setErrors(data);
      } else {
        onClose();
      }
    } catch (error) {
      errorMessage = (
        <>
          <Text>There was an error while attempting to create the book</Text>
        </>
      );
    }
  };

  const handleUpdateBookSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    if (currentBook)
      try {
        const response = await fetch(
          `http://localhost:3000/api/store/books/${currentBook.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        if (response.status < 200 || response.status > 299) {
          const data = await response.json();
          console.log(data);
          actions.setErrors(data);
        } else {
          onClose();
        }
      } catch (error) {
        errorMessage = (
          <>
            <Text>There was an error while attempting to update the book</Text>
          </>
        );
      }
    else {
      errorMessage = <Text>There is no book to update</Text>;
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          type === "create"
            ? handleCreateBookSubmit(values, actions)
            : handleUpdateBookSubmit(values, actions);
        }}
      >
        {(props) => (
          <Form>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Book</ModalHeader>
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
                </VStack>
                <Box mx="auto">{errorMessage}</Box>
              </ModalBody>

              <ModalFooter>
                {type === "create" ? (
                  <Button colorScheme="green" mr={3} type="submit">
                    Create
                  </Button>
                ) : (
                  <Button colorScheme="blue" mr={3} type="submit">
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
