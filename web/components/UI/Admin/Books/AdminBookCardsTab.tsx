import { UseDisclosureReturn } from "@chakra-ui/react";
import React, { SetStateAction } from "react";
import {
  BookProps,
  PaginatedBooksResponseProps,
} from "../../../../types/BookTypes";
import TabTableHead from "../TabTableHead";
import AdminMobileBookCard from "./Mobile/AdminMobileBookCard";
import DesktopTabEntityRow from "../DesktopTabEntityRow";
import { AuthorProps } from "../../../../types/AuthorTypes";

export interface IAdminBookCardTabProps {
  data: PaginatedBooksResponseProps;
  smallScreen: boolean;
  setModalType: (type: "update" | "create") => void;
  setCurrentBook: React.Dispatch<SetStateAction<BookProps | null>>;
  createOrUpdateBookModalState: UseDisclosureReturn;
  deleteBookModalState: UseDisclosureReturn;
}

export default function AdminBookCardTab({
  data,
  smallScreen,
  setCurrentBook,
  setModalType,
  createOrUpdateBookModalState,
  deleteBookModalState,
}: IAdminBookCardTabProps) {
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
          <TabTableHead type="books" />
          {data?.content.map((book) => (
            <DesktopTabEntityRow
              type="books"
              key={`book-${book.id}`}
              entity={book}
              setCurrentEntity={
                setCurrentBook as React.Dispatch<
                  React.SetStateAction<AuthorProps | BookProps | null>
                >
              }
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
