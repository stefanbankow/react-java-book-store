import {
  Button,
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
import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { AuthorProps } from "../../../../../types/AuthorTypes";
import ChakraFormikFormField from "../../../Forms/ChakraFormikFormField";
import ChakraFormikNumberInput from "../../../Forms/ChakraFormikNumberInput";
import ChakraFormikTextArea from "../../../Forms/ChakraFormikTextArea";

export interface ICreateOrUpdateAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "create" | "update";
  currentAuthor: AuthorProps | null;
  updateData: () => void;
}

export default function CreateOrUpdateAuthorModal({
  isOpen,
  onClose,
  type,
  currentAuthor,
  updateData,
}: ICreateOrUpdateAuthorModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues =
    type === "create"
      ? {
          name: undefined,
          description: undefined,
          yearBorn: undefined,
          yearOfDeath: undefined,
          imageURL: undefined,
        }
      : {
          name: currentAuthor?.name,
          description: currentAuthor?.description,
          yearBorn: currentAuthor?.yearBorn,
          yearOfDeath: currentAuthor?.yearOfDeath,
          imageURL: currentAuthor?.imageURL,
        };

  const handleAuthorSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>,
    requestType: "POST" | "PATCH"
  ) => {
    try {
      const response = await fetch(
        requestType === "POST"
          ? "http://localhost:3000/api/store/authors"
          : `http://localhost:3000/api/store/authors/${currentAuthor?.id}`,
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
            ? await handleAuthorSubmit(values, actions, "POST")
            : await handleAuthorSubmit(values, actions, "PATCH");

          setIsLoading(false);
        }}
      >
        {({ status }) => (
          <Form>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {type === "create" ? "Create" : "Update"} Author
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={5} align="start">
                  <ChakraFormikFormField
                    isRequired
                    fieldName="name"
                    label="Name"
                  />
                  <ChakraFormikTextArea
                    fieldName="description"
                    label="Description"
                  />
                  <ChakraFormikNumberInput
                    isRequired
                    fieldName="yearBorn"
                    label="Year of birth"
                    min={99}
                    max={99999}
                    step={50}
                  />

                  <ChakraFormikNumberInput
                    fieldName="yearOfDeath"
                    label="Year of Death"
                    min={0}
                    max={2025}
                    step={1}
                  />

                  <ChakraFormikFormField
                    fieldName="imageURL"
                    label="Image URL"
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
