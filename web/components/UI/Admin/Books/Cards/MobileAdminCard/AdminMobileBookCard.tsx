import {
  AspectRatio,
  VStack,
  Text,
  Image,
  Box,
  Button,
  Collapse,
  Divider,
  HStack,
  Icon,
} from "@chakra-ui/react";

import Link from "next/link";
import React, { useState } from "react";
import { FiCheck, FiEdit, FiX } from "react-icons/fi";
import { BookProps } from "../../../../../../types/BookTypes";
import AdminMobileCardSection from "./AdminMobileCardSection";

export interface IAdminMobileBookCardProps {
  book: BookProps;
  setCurrentBook: React.Dispatch<React.SetStateAction<BookProps | null>>;
  handleUpdateModalOpen: () => void;
  handleDeleteModalOpen: () => void;
}

export default function AdminMobileBookCard({
  book,
  setCurrentBook,
  handleUpdateModalOpen,
  handleDeleteModalOpen,
}: IAdminMobileBookCardProps) {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <VStack
      w="100%"
      borderRadius={5}
      position="relative"
      boxShadow="0 5px 10px rgba(0, 0, 0, 0.25)"
      mx="auto"
      my="5"
      justifyContent="center"
      textAlign="center"
      p="5"
      spacing={5}
    >
      <AspectRatio mx="auto" w="75%" ratio={0.68}>
        <Image src={book.coverArtURL} />
      </AspectRatio>
      <Box w="100%" textAlign="center">
        <AdminMobileCardSection type="ID:" content={book.id} />
        <AdminMobileCardSection type="Title:" content={book.title} />
        <Box my="5">
          <Text align="left" fontWeight="bold">
            Descripton:
          </Text>
          <VStack>
            {!book.description ? (
              <Text align="right">No description given</Text>
            ) : book.description.length > 180 ? (
              <>
                <Collapse startingHeight={70} in={show}>
                  <Text align="right">{book.description}</Text>
                </Collapse>
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleToggle}
                  mt="1rem"
                >
                  Show {show ? "Less" : "More"}
                </Button>
              </>
            ) : (
              <Text align="right">{book.description}</Text>
            )}
          </VStack>
        </Box>
        <Divider />
        <AdminMobileCardSection
          type="Price:"
          content={book.price}
          isEmptyMessage="Not given"
        />
        <AdminMobileCardSection
          type="Year of Release:"
          content={book.yearOfRelease}
          isEmptyMessage="Not given"
        />
        <AdminMobileCardSection
          type="For Sale?:"
          content={book.forSale ? <Icon as={FiCheck} /> : <Icon as={FiX} />}
          isEmptyMessage="Not given"
        />
        <AdminMobileCardSection
          isLast
          type="Author:"
          content={
            book.author && (
              <Text as="u">
                <Link href={`/authors/${book.author?.id}`}>
                  {book.author.name}
                </Link>
              </Text>
            )
          }
          isEmptyMessage="Not given"
        />
        <HStack>
          <Button
            leftIcon={<Icon as={FiEdit} />}
            onClick={() => {
              setCurrentBook(book);
              handleUpdateModalOpen();
            }}
            colorScheme="blue"
          >
            Update
          </Button>
          <Button
            colorScheme="red"
            leftIcon={<Icon as={FiX} />}
            onClick={() => {
              setCurrentBook(book);
              handleDeleteModalOpen();
            }}
          >
            Delete
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
}
