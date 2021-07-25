import {
  Flex,
  HStack,
  Text,
  Image,
  AspectRatio,
  Button,
  Collapse,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiEdit, FiMoreVertical, FiUser, FiX } from "react-icons/fi";
import { AuthorProps } from "../../../../../types/AuthorTypes";

export interface IAdminDesktopAuthorCardProps {
  author: AuthorProps;
  setCurrentAuthor: React.Dispatch<React.SetStateAction<AuthorProps | null>>;
  handleUpdateModalOpen: () => void;
  handleDeleteModalOpen: () => void;
}

export default function AdminDesktopAuthorCard({
  author,
  setCurrentAuthor,
  handleUpdateModalOpen,
  handleDeleteModalOpen,
}: IAdminDesktopAuthorCardProps) {
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
      textAlign="center"
      px="5"
      spacing={5}
    >
      <Text w="10%">{author.id}</Text>
      <Text w="20%">{author.name}</Text>
      <Flex py="5" direction="column" justify="center" w="30%">
        {!author.description ? (
          <Text>No description given</Text>
        ) : author.description.length > 180 ? (
          <>
            <Collapse startingHeight={70} in={show}>
              <Text mx="auto">{author.description}</Text>
            </Collapse>
            <Button variant="link" size="sm" onClick={handleToggle} mt="1rem">
              Show {show ? "Less" : "More"}
            </Button>
          </>
        ) : (
          <Text>{author.description}</Text>
        )}
      </Flex>
      <Text w="15%">{author.yearBorn || "Unknown"}</Text>

      <Text w="15%">{author.yearOfDeath || "Unknown"}</Text>

      <AspectRatio w="10%" ratio={0.68}>
        <Image
          src={author.imageURL}
          alt="Author Image"
          fallback={<Icon as={FiUser} />}
        />
      </AspectRatio>

      <Flex w="5%" justify="center">
        <Menu isLazy>
          <MenuButton
            as={IconButton}
            aria-label="edit_book_options"
            icon={<Icon as={FiMoreVertical} color="brand.300" />}
            borderRadius="50%"
            variant="ghost"
            onClick={() => setCurrentAuthor(author)}
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
