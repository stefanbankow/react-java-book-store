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
import { useAuthorsAdmin, useBooksAdmin } from "../../../lib/swrHooks";
import {
  AuthorProps,
  PaginatedAuthorsResponseProps,
} from "../../../types/AuthorTypes";
import {
  BookProps,
  PaginatedBooksResponseProps,
} from "../../../types/BookTypes";
import BookSortByMenu from "../Books/SortByMenu";
import PaginationButtonsWrapper from "../Buttons/Pagination/PaginationButtonsWrapper";
import SearchInput from "../Forms/SearchInput";
import MyErrorMessage from "../MyErrorMessage";
import AdminAuthorCardTab from "./Authors/AdminAuthorsCardTab";
import CreateOrUpdateAuthorModal from "./Authors/Modals/CreateUpdateAuthorModal";
import DeleteAuthorModal from "./Authors/Modals/DeleteAuthorModal";
import AdminBookCardTab from "./Books/AdminBookCardsTab";
import CreateUpdateBookModal from "./Books/Modals/CreateUpdateBookModal";
import DeleteBookModal from "./Books/Modals/DeleteBookModal";

export interface IAdminTabPanelProps {
  tabType: "orders" | "books" | "authors";
}

export default function AdminTabPanel({ tabType }: IAdminTabPanelProps) {
  const [smallScreen] = useMediaQuery("(max-width: 750px)");
  const router = useRouter();

  const [isTyping, setisTyping] = useState(false);

  const { data, error, isLoading, isValidating, mutate } =
    tabType === "orders"
      ? {
          data: null,
          error: {},
          isLoading: false,
          isValidating: false,
          mutate: () => {},
        }
      : tabType === "books"
      ? useBooksAdmin(
          router.query.search,
          router.query.page || "0",
          router.query.size || "24",
          router.query.sortBy || "id",
          router.query.asc || "false",
          isTyping
        )
      : useAuthorsAdmin(
          router.query.search,
          router.query.page || "0",
          router.query.size || "24",
          router.query.sortBy || "id",
          router.query.asc || "false",
          isTyping
        );

  //Modals
  const [modalType, setModalType] = useState<"create" | "update">("create"); //Used by the CreateOrUpdate modals to have different functionality depending on which button is pressed
  const [currentItem, setCurrentItem] = useState<
    BookProps | AuthorProps | null
  >(null); //Used by the modals so the app doesn't have to render a different modal for each card
  const createOrUpdateItemModalState = useDisclosure();
  const deleteItemModalState = useDisclosure();

  //For mobile
  const handleSortButtonClick = (value: string) => {
    router.push(
      `/admin/${tabType}?search=${
        router.query.search || ""
      }&page=0&sortBy=${value}&asc=${router.query.asc || "false"}`,
      undefined,
      { shallow: true }
    );
  };

  const handleAscButtonClick = (value: boolean) => {
    router.push(
      `/admin/${tabType}?search=${router.query.search || ""}&page=0&sortBy=${
        router.query.sortBy || "id"
      }&asc=${value}`,
      undefined,
      { shallow: true }
    );
  };

  //These if else statements probab
  let createUpdateModal, deleteModal, contentPage;
  if (tabType === "orders") {
  } else if (tabType === "books") {
    contentPage = data && (
      <AdminBookCardTab
        data={data as PaginatedBooksResponseProps}
        smallScreen={smallScreen}
        createOrUpdateBookModalState={createOrUpdateItemModalState}
        deleteBookModalState={deleteItemModalState}
        setCurrentBook={
          setCurrentItem as React.Dispatch<
            React.SetStateAction<BookProps | null>
          >
        }
        setModalType={setModalType}
      />
    );
    createUpdateModal = (
      <CreateUpdateBookModal
        isOpen={createOrUpdateItemModalState.isOpen}
        onClose={createOrUpdateItemModalState.onClose}
        type={modalType}
        currentBook={currentItem as BookProps}
        updateData={mutate}
      />
    );
    deleteModal = currentItem && (
      <DeleteBookModal
        id={(currentItem as BookProps).id}
        title={(currentItem as BookProps).title}
        isOpen={deleteItemModalState.isOpen}
        onClose={deleteItemModalState.onClose}
        updateData={mutate}
      />
    );
  } else {
    contentPage = data && (
      <AdminAuthorCardTab
        data={data as PaginatedAuthorsResponseProps}
        smallScreen={smallScreen}
        createOrUpdateAuthorModalState={createOrUpdateItemModalState}
        deleteAuthorModalState={deleteItemModalState}
        setCurrentAuthor={
          setCurrentItem as React.Dispatch<
            React.SetStateAction<AuthorProps | null>
          >
        }
        setModalType={setModalType}
      />
    );
    createUpdateModal = (
      <CreateOrUpdateAuthorModal
        isOpen={createOrUpdateItemModalState.isOpen}
        onClose={createOrUpdateItemModalState.onClose}
        type={modalType}
        currentAuthor={currentItem as AuthorProps}
        updateData={mutate}
      />
    );
    deleteModal = currentItem && (
      <DeleteAuthorModal
        id={currentItem.id}
        name={(currentItem as AuthorProps).name}
        isOpen={deleteItemModalState.isOpen}
        onClose={deleteItemModalState.onClose}
        updateData={mutate}
      />
    );
  }

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
          message={`There was an error when attempting to retrieve ${tabType} data`}
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
              createOrUpdateItemModalState.onOpen();
            }}
            colorScheme="green"
            leftIcon={<Icon as={FiPlus} />}
          >
            New {tabType.slice(0, tabType.length - 1)}
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
        {createUpdateModal}
        {isTyping || isLoading ? (
          <Center w="100%" h="50vh">
            <Spinner size="xl" />
          </Center>
        ) : (
          data && (
            <>
              {contentPage}
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
        {deleteModal}
      </Box>
    );
}
