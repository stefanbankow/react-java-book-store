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
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import useSWR from "swr";
import { fetcher } from "../../../../lib/fetcher";
import {
  BookProps,
  PaginatedBooksResponseProps,
} from "../../../../types/BookTypes";
import ErrorMessage from "../../ErrorMessage";
import AdminBooksTableHead from "./AdminBooksTableHead";
import AdminDesktopBookCard from "./AdminDesktopBookCard";
import CreateBookModal from "./Modals/CreateUpdateBookModal";
import DeleteBookModal from "./Modals/DeleteBookModal";
import { ParsedUrlQuery } from "querystring";
import PaginationButtonsWrapper from "../../Buttons/Pagination/PaginationButtonsWrapper";

export interface IBooksAdminPanelProps {}

const useBooksAdmin = (
  query: ParsedUrlQuery,
  pageSize: number | undefined,
  sortBy: string | undefined,
  asc: boolean | undefined
) => {
  const { data, error, mutate, isValidating } = useSWR(
    `/api/store/books?page=${parseInt(
      (query.page as string) || "0"
    )}&size=${pageSize}&sortBy=${sortBy}&asc=${asc}`,
    fetcher
  );

  return {
    data: data as PaginatedBooksResponseProps,
    isLoading: !error && !data,
    error,
    mutate,

    isValidating,
  };
};

export default function BooksAdminPanel({}: IBooksAdminPanelProps) {
  //Pagination
  const router = useRouter();

  const [pageSize] = useState(24);
  const [sortBy, setSortBy] = useState("id");
  const [asc, setAsc] = useState(false);

  const { data, error, isLoading, isValidating, mutate } = useBooksAdmin(
    router.query,
    pageSize,
    sortBy,
    asc
  );

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
      <Box>
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
            Add a book
          </Button>
          <Button
            size="lg"
            isLoading={isValidating}
            onClick={() => {
              mutate();
            }}
          >
            Refresh
          </Button>
        </HStack>
        <CreateBookModal
          isOpen={createOrUpdateBookModalState.isOpen}
          onClose={createOrUpdateBookModalState.onClose}
          type={modalType}
          currentBook={currentBook}
          updateData={mutate}
        />
        <AdminBooksTableHead
          sortByState={sortBy}
          setSortBy={setSortBy}
          ascState={asc}
          setAsc={setAsc}
        />
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
        <PaginationButtonsWrapper
          data={data}
          page={parseInt((router.query.page as string) || "0")}
          handlePaginationButtonClick={(page: number) =>
            router.push(`/admin?page=${page}`)
          }
        />
        {currentBook && (
          <DeleteBookModal
            id={currentBook.id}
            title={currentBook.title}
            isOpen={deleteBookModalState.isOpen}
            onClose={deleteBookModalState.onClose}
            updateData={mutate}
          />
        )}
      </Box>
    );
}
