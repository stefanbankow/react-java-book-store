import { UseDisclosureReturn } from "@chakra-ui/react";
import React, { SetStateAction } from "react";
import {
  PaginatedAuthorsResponseProps,
  AuthorProps,
} from "../../../../types/AuthorTypes";

import AdminAuthorsTableHead from "./Cards/AdminAuthorsTableHead";
import AdminDesktopAuthorCard from "./Cards/AdminDesktopAuthorCard";
import AdminMobileAuthorCard from "./Cards/MobileAdminCard/AdminMobileAuthorCard";

export interface IAdminAuthorCardPageProps {
  data: PaginatedAuthorsResponseProps;
  smallScreen: boolean;
  setModalType: (type: "update" | "create") => void;
  setCurrentAuthor: React.Dispatch<SetStateAction<AuthorProps | null>>;
  createOrUpdateAuthorModalState: UseDisclosureReturn;
  deleteAuthorModalState: UseDisclosureReturn;
}

export default function AdminAuthorCardPage({
  data,
  smallScreen,
  setCurrentAuthor,
  setModalType,
  createOrUpdateAuthorModalState,
  deleteAuthorModalState,
}: IAdminAuthorCardPageProps) {
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
          <AdminAuthorsTableHead />
          {data?.content.map((author) => (
            <AdminDesktopAuthorCard
              key={`author-${author.id}`}
              author={author}
              setCurrentAuthor={setCurrentAuthor}
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
