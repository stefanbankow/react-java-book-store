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
  const [isLoading, setisLoading] = useState(false);

  const handleDeleteBook = async () => {
    setisLoading(true);
    const res = await fetch(`http://localhost:3000/api/store/books/${id}`, {
      method: "DELETE",
    });
    if (res.status === 204) {
      onClose();
      updateData();
    } else {
      res
        .json()
        .then((data) => setError({ message: data.error, status: res.status }))
        .catch((err) => setError({ message: err.message, status: res.status }));
    }
    setisLoading(false);
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
