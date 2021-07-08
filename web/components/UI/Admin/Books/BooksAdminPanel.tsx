import {
  Box,
  Button,
  Center,
  Icon,
  Spacer,
  Spinner,
  Stack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BookProps } from "../../../../types/BookTypes";
import MyErrorMessage from "../../MyErrorMessage";
import AdminBooksTableHead from "./AdminBooksTableHead";
import AdminDesktopBookCard from "./Cards/AdminDesktopBookCard";
import CreateBookModal from "./Modals/CreateUpdateBookModal";
import DeleteBookModal from "./Modals/DeleteBookModal";
import PaginationButtonsWrapper from "../../Buttons/Pagination/PaginationButtonsWrapper";
import SearchInput from "../../Forms/SearchInput";
import { useBooksAdmin } from "../../../../lib/swrHooks";
import AdminMobileBookCard from "./Cards/MobileAdminCard/AdminMobileBookCard";
import BookSortByMenu from "../../Books/SortByMenu";

export interface IBooksAdminPanelProps {}

export default function BooksAdminPanel({}: IBooksAdminPanelProps) {
  const [smallScreen] = useMediaQuery("(max-width: 750px)");

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

  //For mobile
  const handleSortButtonClick = (value: string) => {
    router.push(
      `/admin/books?search=${
        router.query.search || ""
      }&page=0&sortBy=${value}&asc=${router.query.asc || "false"}`,
      undefined,
      { shallow: true }
    );
  };

  const handleAscButtonClick = (value: boolean) => {
    router.push(
      `/admin/books?search=${router.query.search || ""}&page=0&sortBy=${
        router.query.sortBy || "id"
      }&asc=${value}`,
      undefined,
      { shallow: true }
    );
  };

  let desktopOrMobileCards = smallScreen ? (
    data?.content.map((book) => (
      <AdminMobileBookCard
        key={`book-${book.id}`}
        book={book}
        setCurrentBook={setCurrentBook}
        handleUpdateModalOpen={() => {
          setModalType("update");
          createOrUpdateBookModalState.onOpen();
        }}
        handleDeleteModalOpen={deleteBookModalState.onOpen}
      />
    ))
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
    </>
  );

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
        <Stack m="5" direction={smallScreen ? "column" : "row"}>
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
            colorScheme="green"
            leftIcon={<Icon as={FiPlus} />}
          >
            Add a book
          </Button>
          <Button
            isLoading={isValidating}
            onClick={() => {
              mutate();
            }}
          >
            Refresh
          </Button>
          {smallScreen && (
            <BookSortByMenu
              sortByValue={(router.query.sortBy as string) || "id"}
              ascValue={Boolean(router.query.asc === "true" || false)}
              handleSortButtonClick={handleSortButtonClick}
              handleAscButtonClick={handleAscButtonClick}
            />
          )}
        </Stack>
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
          data && (
            <>
              {desktopOrMobileCards}
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
          )
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
