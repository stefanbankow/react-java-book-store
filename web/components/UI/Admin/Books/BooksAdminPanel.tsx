import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiChevronDown, FiPlus, FiSearch } from "react-icons/fi";
import useSWR from "swr";
import { fetcher } from "../../../../lib/fetcher";
import {
  BookProps,
  PaginatedBooksResponseProps,
} from "../../../../types/BookTypes";
import ErrorMessage from "../../ErrorMessage";
import AdminBookPanelButton from "./AdminBookPanelButton";
import AdminDesktopBookCard from "./AdminDesktopBookCard";
import CreateBookModal from "./Modals/CreateUpdateBookModal";
import DeleteBookModal from "./Modals/DeleteBookModal";

export interface IBooksAdminPanelProps {}

const useBooksAdmin = (
  page: number | undefined,
  size: number | undefined,
  sortBy: string | undefined,
  asc: boolean | undefined
) => {
  const { data, error } = useSWR(
    `/api/store/books?page=${page}&size=${size}&sortBy=${sortBy}&asc=${asc}`,
    fetcher
  );

  return {
    data: data as PaginatedBooksResponseProps,
    isLoading: !error && !data,
    error,
  };
};

export default function BooksAdminPanel({}: IBooksAdminPanelProps) {
  //Pagination
  const [page, setPage] = useState(0);
  const [size] = useState(50);
  const [sortBy, setSortBy] = useState("id");
  const [asc, setAsc] = useState(false);
  const { data, error, isLoading } = useBooksAdmin(page, size, sortBy, asc);

  //Modals
  const [modalType, setModalType] = useState<"create" | "update">("create"); //Used by the CreateOrUpdateBookModal to have different functionality depending on which button is pressed
  const [currentBook, setCurrentBook] = useState<BookProps | null>(null); //Used by the modals so the app doesn't have to render a different modal for each book card
  const createOrUpdateBookModalState = useDisclosure();
  const deleteBookModalState = useDisclosure();

  if (isLoading)
    return (
      <Flex my="20" minH="80vh">
        <Center my="auto" w="100%">
          <Spinner size="xl" />
        </Center>
      </Flex>
    );
  else if (error)
    return (
      <Center
        flexDir="column"
        mx="auto"
        my="10"
        textAlign="center"
        w="90%"
        h="60vh"
      >
        <ErrorMessage
          status={error.status}
          message="There was an error when attempting to retrieve book data"
        />
      </Center>
    );
  else
    return (
      <Box overflowX="auto">
        <HStack m="5" direction="row">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FiSearch} />}
            />
            <Input placeholder="Book name, Author name, etc." />
          </InputGroup>
          <Spacer />
          <Button
            onClick={() => {
              setModalType("create");
              createOrUpdateBookModalState.onOpen();
            }}
            size="lg"
            colorScheme="green"
            leftIcon={<Icon as={FiPlus} />}
          >
            Add new book
          </Button>
        </HStack>

        <CreateBookModal
          isOpen={createOrUpdateBookModalState.isOpen}
          onClose={createOrUpdateBookModalState.onClose}
          type={modalType}
          currentBook={currentBook}
        />

        <HStack
          w="98%"
          position="relative"
          mx="auto"
          spacing={10}
          textAlign="center"
          justify="center"
          px="5"
        >
          <AdminBookPanelButton text="ID" type="id" width="5%" />
          <AdminBookPanelButton text="Title" type="title" width="15%" />
          <Text w="20%">Description</Text>
          <AdminBookPanelButton text="Price" type="price" width="5%" />
          <Text w="5%">For Sale</Text>
          <Text w="10%" rightIcon={<Icon as={FiChevronDown} />}>
            Year of release
          </Text>
          <Text minW="10%">Image</Text>
          <Text w="10%">Author Name</Text>
          <Box w="5%" />
        </HStack>
        {data?.content.map((book) => (
          <AdminDesktopBookCard
            key={`book-${book.id}`}
            book={book}
            setCurrentBook={setCurrentBook}
            handleUpdateModalOpen={() => {
              setModalType("update");
              createOrUpdateBookModalState.onOpen();
            }}
            handleDeleteModalOpen={deleteBookModalState.onOpen}
          />
        ))}
        {currentBook && (
          <DeleteBookModal
            id={currentBook.id}
            title={currentBook.title}
            isOpen={deleteBookModalState.isOpen}
            onClose={deleteBookModalState.onClose}
          />
        )}
      </Box>
    );
}
