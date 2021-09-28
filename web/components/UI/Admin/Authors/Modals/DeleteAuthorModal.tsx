import { useAuth0 } from "@auth0/auth0-react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";

export interface IDeleteAuthorModalProps {
  id: number;
  name: string;
  isOpen: boolean;
  onClose: () => void;
  updateData: () => void;
}

export default function DeleteAuthorModal({
  id,
  name,
  isOpen,
  onClose,
  updateData,
}: IDeleteAuthorModalProps) {
  const [error, setError] = useState<
    { message: string; status: number } | undefined
  >(undefined);
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setisLoading] = useState(false);

  const handleDeleteAuthor = async () => {
    try {
      setisLoading(true);

      const accessToken = await getAccessTokenSilently();

      const res = await fetch(`http://localhost:8080/api/store/authors/${id}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE",
      });
      if (res.status === 204) {
        onClose();
        updateData();
      } else {
        const errorData = await res.json();
        setError({ message: errorData.error, status: res.status });
      }
      setisLoading(false);
    } catch (err) {
      console.error(err);
      setError({
        message:
          "There was an unexpected server error while trying to delete the resource",
        status: 500,
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Author</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete author "{name}", ID: {id} ?
          </Text>
          {error && (
            <Box mx="auto" my="5" textAlign="center">
              <Text mb={2} color="red">
                {error.message}
              </Text>
              <Text color="red">Status: {error.status}</Text>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoading}
            colorScheme="red"
            mr={3}
            onClick={handleDeleteAuthor}
          >
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
