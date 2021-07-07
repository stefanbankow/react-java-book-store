import {
  Text,
  Center,
  Spinner,
  SimpleGrid,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { BookProps } from "../../types/BookTypes";
import BookCard from "./Books/BookCard";
import MyErrorMessage from "./MyErrorMessage";
import PaginationButtonsComponent from "./Buttons/Pagination/PaginationButtonsWrapper";
import { useAuthors, useBooks } from "../../lib/swrHooks";
import { AuthorProps } from "../../types/AuthorTypes";
import AuthorCard from "./Authors/AuthorCard";

export interface ICardPageAbstractionProps {
  type: "books" | "authors";
  page: string | string[] | undefined;
  size: string | string[] | undefined;
  sortBy: string | string[] | undefined;
  asc: string | string[] | undefined;
  search?: string | string[] | undefined;
}

//This abstraction is used to preload the next page of data for better user experience
export default function CardPageAbstraction({
  type,
  asc,
  page,
  size,
  sortBy,
  search,
}: ICardPageAbstractionProps) {
  const router = useRouter();

  const isBooksPage = type === "books";
  const slidesPerViewCount = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
  });

  const { data, error, isLoading } = isBooksPage
    ? useBooks(search, page, size, sortBy, asc)
    : useAuthors(search, page, size, sortBy, asc);

  const handlePaginationButtonClick = (pageIndex: number) => {
    if (isBooksPage)
      router.push(
        `/books?search=${search}&page=${pageIndex}&sortBy=${sortBy}&asc=${asc}`
      );
    else
      router.push(
        `/authors?search=${search}&page=${pageIndex}&sortBy=${sortBy}&asc=${asc}`
      );
  };

  if (isLoading)
    return (
      <Center my="20" h="25vh" w="100%">
        <Spinner size="xl" />
      </Center>
    );
  else if (error)
    return (
      <Center
        flexDir="column"
        mx="auto"
        my="10"
        textAlign="center"
        w="90%"
        h="25vh"
      >
        <MyErrorMessage
          status={error.status}
          message={`There was an error when attempting to retrieve ${
            isBooksPage ? "book" : "author"
          } data, we're sorry for the inconvenience`}
        />
      </Center>
    );
  else
    return (
      <Box>
        {data.totalElements ? (
          <>
            <SimpleGrid
              justifyContent="center"
              spacing={3}
              columns={slidesPerViewCount}
              my="5"
            >
              {isBooksPage
                ? data.content?.map((book: BookProps | AuthorProps) => {
                    return <BookCard key={book.id} book={book as BookProps} />;
                  })
                : data.content?.map((author: BookProps | AuthorProps) => {
                    return (
                      <AuthorCard
                        key={author.id}
                        author={author as AuthorProps}
                      />
                    );
                  })}
            </SimpleGrid>
            <PaginationButtonsComponent
              data={data}
              page={parseInt((page as string) || "0")}
              handlePaginationButtonClick={handlePaginationButtonClick}
            />
          </>
        ) : (
          <Center textAlign="center" my="20" h="25vh" w="100%">
            {search?.length ? (
              <Text color="gray.500">
                We could not find any {isBooksPage ? "books" : "authors"}{" "}
                matching your criteria
              </Text>
            ) : (
              <Text color="gray.500">
                There are no {isBooksPage ? "books" : "authors"} to show at this
                time
              </Text>
            )}
          </Center>
        )}
      </Box>
    );
}
