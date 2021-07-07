import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Spacer,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BookProps } from "../../../../types/BookTypes";
import MyErrorMessage from "../../MyErrorMessage";
import AdminBooksTableHead from "./AdminBooksTableHead";
import AdminDesktopBookCard from "./AdminDesktopBookCard";
import CreateBookModal from "./Modals/CreateUpdateBookModal";
import DeleteBookModal from "./Modals/DeleteBookModal";
import PaginationButtonsWrapper from "../../Buttons/Pagination/PaginationButtonsWrapper";
import SearchInput from "../../Forms/SearchInput";
import { useBooksAdmin } from "../../../../lib/swrHooks";

export interface IBooksAdminPanelProps {}

export default function BooksAdminPanel({}: IBooksAdminPanelProps) {
  //Pagination
  const router = useRouter();

  const [isTyping, setisTyping] = useState(false);

  const { data, error, isLoading, isValidating, mutate } = useBooksAdmin(
    router.query.search,
    router.query.page || "0",
    router.query.size || "24",
    router.query.sortBy || "id",
    router.query.asc || "false",
    isTyping
  );

  //Modals
  const [modalType, setModalType] = useState<"create" | "update">("create"); //Used by the CreateOrUpdateBookModal to have different functionality depending on which button is pressed
  const [currentBook, setCurrentBook] = useState<BookProps | null>(null); //Used by the modals so the app doesn't have to render a different modal for each book card
  const createOrUpdateBookModalState = useDisclosure();
  const deleteBookModalState = useDisclosure();

  if (error)
    return (
      <Center
        flexDir="column"
        mx="auto"
        my="10"
        textAlign="center"
        w="90%"
        h="60vh"
      >
        <MyErrorMessage
          status={error.status}
          message="There was an error when attempting to retrieve book data"
        />
      </Center>
    );
  else
    return (
      <Box>
        <HStack m="5" direction="row">
          <SearchInput
            setIsTyping={setisTyping}
            placeholder="Title, Author name, etc."
          />
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
        {isTyping || isLoading ? (
          <Center w="100%" h="50vh">
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            <AdminBooksTableHead />
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
                router.push(
                  `/admin/books?search=${
                    router.query.search || ""
                  }&page=${page}&size=${router.query.size || 24}&sortBy=${
                    router.query.sortBy || "id"
                  }&asc=${router.query.asc || false}`
                )
              }
            />
          </>
        )}
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
