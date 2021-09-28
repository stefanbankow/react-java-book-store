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

export interface IDeleteBookModalProps {
  id: number;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  updateData: () => void;
}

export default function DeleteBookModal({
  id,
  title,
  isOpen,
  onClose,
  updateData,
}: IDeleteBookModalProps) {
  const [error, setError] = useState<
    { message: string; status: number } | undefined
  >(undefined);

  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setisLoading] = useState(false);

  const handleDeleteBook = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      setisLoading(true);
      const res = await fetch(`http://localhost:8080/api/store/books/${id}`, {
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
        <ModalHeader>Delete Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete "{title}", ID: {id} ?
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
            onClick={handleDeleteBook}
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
