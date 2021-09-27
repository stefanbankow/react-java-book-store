import { useAuth0 } from "@auth0/auth0-react";
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
import ChakraFormikFileUpload from "../../../Forms/ChakraFormikFileUpload";
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
  const isCreateModal = type === "create";
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const initialValues = isCreateModal
    ? {
        title: undefined,
        description: undefined,
        forSale: true,
        price: undefined,
        image: undefined,
        yearOfRelease: undefined,
        authorId: undefined,
      }
    : {
        title: currentBook?.title,
        description: currentBook?.description,
        forSale: currentBook?.forSale,
        price: currentBook?.price,
        image: currentBook?.coverArtURL,
        yearOfRelease: currentBook?.yearOfRelease,
        authorId: currentBook?.author.id,
      };

  const handleBookSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>,
    requestType: "POST" | "PATCH"
  ) => {
    try {
      let accessToken = await getAccessTokenSilently();
      let formData = new FormData();

      if (values.image) {
        formData.append("image", values.image!);
      }
      delete values.image;

      formData.append(
        "book",
        new Blob([JSON.stringify(values)], {
          type: "application/json",
        })
      );

      const response = await fetch(
        requestType === "POST"
          ? "http://localhost:8080/api/store/books"
          : `http://localhost:8080/api/store/books/${currentBook?.id}`,
        {
          method: requestType,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      if (response.ok || response.status === 204) {
        updateData();
        onClose();
      } else {
        const data = await response.json();
        actions.setErrors(
          response.status === 400 ? data : { error: data.error }
        );
      }
    } catch (error: any) {
      console.error(error);
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
                {isCreateModal ? "Create" : "Update"} Book
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
                        colorScheme={isCreateModal ? "green" : "blue"}
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

                  <ChakraFormikFileUpload
                    accept="image/*"
                    fieldName="image"
                    label="Book Image"
                    externalFileUrl={currentBook?.coverArtURL}
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
                {isCreateModal ? (
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
