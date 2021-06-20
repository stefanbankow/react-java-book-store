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
import ErrorMessage from "../ErrorMessage";
import PaginationButtonsComponent from "../Buttons/Pagination/PaginationButtonsWrapper";
import AuthorCard from "./AuthorCard";
import {
  AuthorProps,
  PaginatedAuthorsResponseProps,
} from "../../../types/AuthorTypes";

export interface IAuthorsPageAbstractionProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  sortBy: string;
  asc: boolean;
}

const authorsFetcher = async (url: string) => {
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

function useAuthors(
  page: number | undefined,
  size: number | undefined,
  sortBy: string | undefined,
  asc: boolean | undefined
) {
  const { data, error } = useSWR(
    `/api/store/authors?page=${page}&size=${size}&sortBy=${sortBy}&asc=${asc}`,
    authorsFetcher
  );

  return {
    data: data as PaginatedAuthorsResponseProps,
    isLoading: !error && !data,
    error,
  };
}

export default function AuthorsPageAbstraction({
  asc,
  page,
  size,
  sortBy,
  setPage,
}: IAuthorsPageAbstractionProps) {
  const slidesPerViewCount = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
  });

  const { data, error, isLoading } = useAuthors(page, size, sortBy, asc);

  const router = useRouter();

  const handlePaginationButtonClick = (pageIndex: number) => {
    setPage(pageIndex);
    router.replace("/authors");
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
          message="There was an error when attempting to retrieve author data, we're sorry for the inconvenience"
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
          {data?.content.map((author: AuthorProps) => {
            return (
              <AuthorCard
                key={author.id}
                id={author.id}
                name={author.name}
                description={author.description}
                yearBorn={author.yearBorn}
                yearOfDeath={author.yearOfDeath}
                imageURL={author.imageURL}
              />
            );
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
