import { UseDisclosureReturn } from "@chakra-ui/react";
import React, { SetStateAction } from "react";
import {
  PaginatedAuthorsResponseProps,
  AuthorProps,
} from "../../../../types/AuthorTypes";
import { BookProps } from "../../../../types/BookTypes";
import DesktopTabEntityRow from "../DesktopTabEntityRow";
import TabTableHead from "../TabTableHead";

import AdminMobileAuthorCard from "./Mobile/AdminMobileAuthorCard";

export interface IAdminAuthorCardTabProps {
  data: PaginatedAuthorsResponseProps;
  smallScreen: boolean;
  setModalType: (type: "update" | "create") => void;
  setCurrentAuthor: React.Dispatch<SetStateAction<AuthorProps | null>>;
  createOrUpdateAuthorModalState: UseDisclosureReturn;
  deleteAuthorModalState: UseDisclosureReturn;
}

export default function AdminAuthorCardTab({
  data,
  smallScreen,
  setCurrentAuthor,
  setModalType,
  createOrUpdateAuthorModalState,
  deleteAuthorModalState,
}: IAdminAuthorCardTabProps) {
  return (
    <>
      {smallScreen ? (
        data?.content.map((author) => (
          <AdminMobileAuthorCard
            key={`author-${author.id}`}
            author={author}
            setCurrentAuthor={setCurrentAuthor}
            handleUpdateModalOpen={() => {
              setModalType("update");
              createOrUpdateAuthorModalState.onOpen();
            }}
            handleDeleteModalOpen={deleteAuthorModalState.onOpen}
          />
        ))
      ) : (
        <>
          <TabTableHead type="authors" />
          {data?.content.map((author) => (
            <DesktopTabEntityRow
              type="authors"
              key={`author-${author.id}`}
              entity={author}
              setCurrentEntity={
                setCurrentAuthor as React.Dispatch<
                  React.SetStateAction<AuthorProps | BookProps | null>
                >
              }
              handleUpdateModalOpen={() => {
                setModalType("update");
                createOrUpdateAuthorModalState.onOpen();
              }}
              handleDeleteModalOpen={deleteAuthorModalState.onOpen}
            />
          ))}
        </>
      )}
    </>
  );
}
