import {
  Flex,
  Center,
  Spinner,
  SimpleGrid,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import {
  BookProps,
  PaginatedBooksResponseProps,
} from "../../../types/BookTypes";
import BookCard from "./BookCard";
import ErrorMessage from "../ErrorMessage";
import PaginationButtonsComponent from "../Buttons/Pagination/PaginationButtonsWrapper";

export interface IBooksPageAbstractionProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  sortBy: string;
  asc: boolean;
}

const bookFetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

function useBooks(
  page: number | undefined,
  size: number | undefined,
  sortBy: string | undefined,
  asc: boolean | undefined
) {
  const { data, error } = useSWR(
    `/api/store/books?page=${page}&size=${size}&sortBy=${sortBy}&asc=${asc}`,
    bookFetcher
  );

  return {
    data: data as PaginatedBooksResponseProps,
    isLoading: !error && !data,
    error,
  };
}

export default function BooksPageAbstraction({
  asc,
  page,
  size,
  sortBy,
  setPage,
}: IBooksPageAbstractionProps) {
  const slidesPerViewCount = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
  });

  const router = useRouter();

  const { data, error, isLoading } = useBooks(page, size, sortBy, asc);

  const handlePaginationButtonClick = (pageIndex: number) => {
    setPage(pageIndex);
    router.replace("/books");
  };

  if (isLoading)
    return (
      <Flex my="20" minH="55vh">
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
          message="There was an error when attempting to retrieve book data, we're sorry for the inconvenience"
        />
      </Center>
    );
  else
    return (
      <Box>
        <SimpleGrid
          justifyContent="center"
          spacing={3}
          columns={slidesPerViewCount}
          my="5"
        >
          {data.content.map((book: BookProps) => {
            return <BookCard key={book.id} book={book} />;
          })}
        </SimpleGrid>
        <PaginationButtonsComponent
          data={data}
          page={page}
          handlePaginationButtonClick={handlePaginationButtonClick}
        />
      </Box>
    );
}
