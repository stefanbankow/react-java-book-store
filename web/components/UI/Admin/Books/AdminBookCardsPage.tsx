import { UseDisclosureReturn } from "@chakra-ui/react";
import React, { SetStateAction } from "react";
import {
  BookProps,
  PaginatedBooksResponseProps,
} from "../../../../types/BookTypes";
import AdminBooksTableHead from "./Cards/AdminBooksTableHead";
import AdminDesktopBookCard from "./Cards/AdminDesktopBookCard";
import AdminMobileBookCard from "./Cards/MobileAdminCard/AdminMobileBookCard";

export interface IAdminBookCardPageProps {
  data: PaginatedBooksResponseProps;
  smallScreen: boolean;
  setModalType: (type: "update" | "create") => void;
  setCurrentBook: React.Dispatch<SetStateAction<BookProps | null>>;
  createOrUpdateBookModalState: UseDisclosureReturn;
  deleteBookModalState: UseDisclosureReturn;
}

export default function AdminBookCardPage({
  data,
  smallScreen,
  setCurrentBook,
  setModalType,
  createOrUpdateBookModalState,
  deleteBookModalState,
}: IAdminBookCardPageProps) {
  return (
    <>
      {smallScreen ? (
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
      )}
    </>
  );
}
