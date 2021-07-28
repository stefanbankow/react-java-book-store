import {
  Flex,
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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FiBookOpen,
  FiCheck,
  FiEdit,
  FiMoreVertical,
  FiUser,
  FiX,
} from "react-icons/fi";
import { AuthorProps } from "../../../types/AuthorTypes";
import { BookProps } from "../../../types/BookTypes";

export interface IDesktopTabEntityRowProps {
  type: "authors" | "books" | "orders";
  entity: AuthorProps | BookProps;
  setCurrentEntity: React.Dispatch<
    React.SetStateAction<AuthorProps | BookProps | null>
  >;

  handleUpdateModalOpen: () => void;
  handleDeleteModalOpen: () => void;
}

export default function AdminDesktopAuthorCard({
  type,
  entity,
  setCurrentEntity,
  handleUpdateModalOpen,
  handleDeleteModalOpen,
}: IDesktopTabEntityRowProps) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  let content;
  let propertyCount = type === "books" ? 10 : 8;
  if (type === "authors") {
    const author = entity as AuthorProps;
    content = (
      <>
        <Text>{author.id}</Text>
        <Text>{author.name}</Text>
        <GridItem colSpan={2}>
          <Flex py="5" direction="column" justify="center">
            {!author.description ? (
              <Text>No description given</Text>
            ) : author.description.length > 180 ? (
              <>
                <Collapse startingHeight={70} in={show}>
                  <Text mx="auto">{author.description}</Text>
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
              <Text>{author.description}</Text>
            )}
          </Flex>
        </GridItem>
        <Text>{author.yearBorn || "Unknown"}</Text>

        <Text>{author.yearOfDeath || "Unknown"}</Text>

        <AspectRatio ratio={0.68}>
          <Image
            src={author.imageURL}
            alt="Author Image"
            fallback={<Icon as={FiUser} />}
          />
        </AspectRatio>

        <Flex justify="center">
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              aria-label="edit_book_options"
              icon={<Icon as={FiMoreVertical} color="brand.300" />}
              borderRadius="50%"
              variant="ghost"
              onClick={() => setCurrentEntity(author)}
            />
            <MenuList>
              <MenuItem
                icon={<Icon as={FiEdit} />}
                onClick={handleUpdateModalOpen}
              >
                Update
              </MenuItem>
              <MenuItem
                icon={<Icon as={FiX} />}
                onClick={handleDeleteModalOpen}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </>
    );
  } else if (type === "books") {
    const book = entity as BookProps;
    content = (
      <>
        <Text>{book.id}</Text>
        <Text>{book.title}</Text>
        <GridItem colSpan={2}>
          <Flex py="5" direction="column" justify="center">
            {!book.description ? (
              <Text>No description given</Text>
            ) : book.description.length > 180 ? (
              <>
                <Collapse startingHeight={70} in={show}>
                  <Text mx="auto">{book.description}</Text>
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
              <Text>{book.description}</Text>
            )}
          </Flex>
        </GridItem>
        <Text>{book.price}</Text>
        <Flex justify="center">
          {book.forSale ? <Icon as={FiCheck} /> : <Icon as={FiX} />}
        </Flex>
        <Text>{book.yearOfRelease || "Unknown"}</Text>

        <AspectRatio ratio={0.68}>
          <Image
            src={book.coverArtURL}
            alt="Book cover"
            fallback={<Icon as={FiBookOpen} />}
          />
        </AspectRatio>
        <Text>{book.author?.name}</Text>
        <Flex justify="center">
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              aria-label="edit_book_options"
              icon={<Icon as={FiMoreVertical} color="brand.300" />}
              borderRadius="50%"
              variant="ghost"
              onClick={() => setCurrentEntity(book)}
            />
            <MenuList>
              <MenuItem
                icon={<Icon as={FiEdit} />}
                onClick={handleUpdateModalOpen}
              >
                Update
              </MenuItem>
              <MenuItem
                icon={<Icon as={FiX} />}
                onClick={handleDeleteModalOpen}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </>
    );
  }

  return (
    <Grid
      templateColumns={`repeat(${propertyCount}, 1fr)`}
      w="98%"
      borderRadius={5}
      position="relative"
      boxShadow="0 5px 10px rgba(0, 0, 0, 0.25)"
      mx="auto"
      my="5"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      px={3}
      gap={5}
    >
      {content}
    </Grid>
  );
}
