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

import React, { useState } from "react";
import { FiBookOpen, FiEdit, FiX } from "react-icons/fi";
import { AuthorProps } from "../../../../../types/AuthorTypes";
import AdminMobileCardSection from "../../AdminMobileCardSection";

export interface IAdminMobileAuthorCardProps {
  author: AuthorProps;
  setCurrentAuthor: React.Dispatch<React.SetStateAction<AuthorProps | null>>;
  handleUpdateModalOpen: () => void;
  handleDeleteModalOpen: () => void;
}

export default function AdminMobileAuthorCard({
  author,
  setCurrentAuthor,
  handleUpdateModalOpen,
  handleDeleteModalOpen,
}: IAdminMobileAuthorCardProps) {
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
        <Image
          src={author.imageURL}
          alt="Author Cover"
          fallback={<Icon as={FiBookOpen} />}
        />
      </AspectRatio>
      <Box w="100%" textAlign="center">
        <AdminMobileCardSection type="ID:" content={author.id} />
        <AdminMobileCardSection type="Title:" content={author.name} />
        <Box my="5">
          <Text align="left" fontWeight="bold">
            Descripton:
          </Text>
          <VStack>
            {!author.description ? (
              <Text align="right">No description given</Text>
            ) : author.description.length > 180 ? (
              <>
                <Collapse startingHeight={70} in={show}>
                  <Text align="right">{author.description}</Text>
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
              <Text align="right">{author.description}</Text>
            )}
          </VStack>
        </Box>
        <Divider />
        <AdminMobileCardSection
          type="Year of birth:"
          content={author.yearBorn}
          isEmptyMessage="Not given"
        />
        <AdminMobileCardSection
          isLast
          type="Year of death:"
          content={author.yearOfDeath}
          isEmptyMessage="Not given"
        />

        <HStack justify="center">
          <Button
            leftIcon={<Icon as={FiEdit} />}
            onClick={() => {
              setCurrentAuthor(author);
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
              setCurrentAuthor(author);
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
