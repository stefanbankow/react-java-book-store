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
} from "@chakra-ui/react";
import React from "react";
import { mutate } from "swr";

export interface IDeleteBookModalProps {
  id: number;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteBookModal({
  id,
  title,
  isOpen,
  onClose,
}: IDeleteBookModalProps) {
  let error;
  const handleDeleteBook = async () => {
    const res = await fetch(`http://localhost:3000/api/store/books/${id}`, {
      method: "DELETE",
    });
    if (res.status === 204) {
      onClose();
    } else {
      error = (
        <>
          <Text color="red.300">
            There was an error while attempting to delete this book, please try
            again later!
          </Text>
          <Text>Status: {res.status}</Text>
        </>
      );
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
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDeleteBook}>
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
