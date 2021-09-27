import { useAuth0 } from "@auth0/auth0-react";
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
import ChakraFormikFileUpload from "../../../Forms/ChakraFormikFileUpload";
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
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues =
    type === "create"
      ? {
          name: undefined,
          description: undefined,
          yearBorn: undefined,
          yearOfDeath: undefined,
          image: undefined,
        }
      : {
          name: currentAuthor?.name,
          description: currentAuthor?.description,
          yearBorn: currentAuthor?.yearBorn,
          yearOfDeath: currentAuthor?.yearOfDeath,
          image: undefined,
        };

  const handleAuthorSubmit = async (
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
        "author",
        new Blob([JSON.stringify(values)], {
          type: "application/json",
        })
      );

      const response = await fetch(
        requestType === "POST"
          ? "http://localhost:8080/api/store/authors"
          : `http://localhost:8080/api/store/authors/${currentAuthor?.id}`,
        {
          method: requestType,
          headers: { authorization: `Bearer ${accessToken}` },
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
                  />

                  <ChakraFormikNumberInput
                    fieldName="yearOfDeath"
                    label="Year of Death"
                    min={0}
                    max={2025}
                    step={1}
                  />

                  <ChakraFormikFileUpload
                    accept="image/*"
                    fieldName="image"
                    label="Author Image"
                    externalFileUrl={currentAuthor?.imageURL}
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
