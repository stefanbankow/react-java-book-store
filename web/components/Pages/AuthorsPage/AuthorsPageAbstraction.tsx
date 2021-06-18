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
import ErrorMessage from "../../UI/ErrorMessage";
import PaginationButtonsComponent from "../../UI/Buttons/Pagination/PaginationButtonsWrapper";
import AuthorCard from "../../UI/Authors/AuthorCard";
import { AuthorProps } from "../../../types/AuthorTypes";

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

  const router = useRouter();

  const { data, error } = useSWR(
    `/api/store/authors?page=${page}&size=${size}&sortBy=${sortBy}&asc=${asc}`,
    authorsFetcher
  );

  const handlePaginationButtonClick = (pageIndex: number) => {
    setPage(pageIndex);
    router.replace("/authors");
  };

  if (!error && !data)
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
