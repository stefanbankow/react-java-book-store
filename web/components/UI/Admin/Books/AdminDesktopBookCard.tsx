import {
  Flex,
  HStack,
  Text,
  Image,
  AspectRatio,
  Container,
  Button,
  Collapse,
  Box,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiCheck, FiEdit, FiMoreVertical, FiX } from "react-icons/fi";
import { BookProps } from "../../../../types/BookTypes";

export interface IAdminDesktopBookCardProps {
  book: BookProps;
  setCurrentBook: React.Dispatch<React.SetStateAction<BookProps | null>>;
  handleUpdateModalOpen: () => void;
  handleDeleteModalOpen: () => void;
}

export default function AdminDesktopBookCard({
  book,
  setCurrentBook,
  handleUpdateModalOpen,
  handleDeleteModalOpen,
}: IAdminDesktopBookCardProps) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  return (
    <HStack
      w="98%"
      borderRadius={5}
      position="relative"
      boxShadow="0 5px 10px rgba(0, 0, 0, 0.25)"
      mx="auto"
      my="5"
      justifyContent="center"
      spacing={10}
      textAlign="center"
      px="5"
    >
      <Text w="5%">{book.id}</Text>
      <Text w="15%">{book.title}</Text>
      <Flex py="5" direction="column" justify="center" w="20%">
        {!book.description ? (
          <Text>No description given</Text>
        ) : book.description.length > 180 ? (
          <>
            <Collapse startingHeight={70} in={show}>
              <Text mx="auto">{book.description}</Text>
            </Collapse>
            <Button variant="link" size="sm" onClick={handleToggle} mt="1rem">
              Show {show ? "Less" : "More"}
            </Button>
          </>
        ) : (
          <Text>{book.description}</Text>
        )}
      </Flex>
      <Text w="5%">{book.price}</Text>
      <Flex justify="center" w="5%">
        {book.forSale ? <Icon as={FiCheck} /> : <Icon as={FiX} />}
      </Flex>
      <Text w="10%">{book.yearOfRelease || "Unknown"}</Text>

      <AspectRatio minW="10%" ratio={0.68}>
        <Image src={book.coverArtURL} />
      </AspectRatio>
      <Text w="10%">{book.author?.name}</Text>
      <Flex w="5%" justify="center">
        <Menu isLazy>
          <MenuButton
            as={IconButton}
            aria-label="edit_book_optionss"
            icon={<Icon as={FiMoreVertical} color="brand.300" />}
            borderRadius="50%"
            variant="ghost"
            onClick={() => setCurrentBook(book)}
          />
          <MenuList>
            <MenuItem
              icon={<Icon as={FiEdit} />}
              onClick={handleUpdateModalOpen}
            >
              Update
            </MenuItem>
            <MenuItem icon={<Icon as={FiX} />} onClick={handleDeleteModalOpen}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
}
