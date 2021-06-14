import {
  Box,
  Center,
  Container,
  Fade,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import BookCard from "../components/UI/Books/BookCard";
import { BookProps, PaginatedBooksResponseProps } from "../types/BookTypes";
import React from "react";
import { InferGetServerSidePropsType } from "next";
import { FiSearch } from "react-icons/fi";
import ErrorMessage from "../components/UI/ErrorMessage";

export interface IBooksPageProps {}

export async function getServerSideProps() {
  const res = await fetch(
    `http://localhost:3000/api/store/books?page=0&size=20&sortBy=id&asc=false`
  );
  const books: PaginatedBooksResponseProps = await res.json();
  return { props: { books, status: res.status } };
}

export default function BooksPage({
  books,
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const slidesPerViewCount = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    "2xl": 6,
    "3xl": 7,
  });

  return (
    <Box mx={{ base: "5", md: "10" }}>
      <Fade in transition={{ enter: { duration: 1 } }}>
        <Container my="10" maxW="100%">
          <Heading textAlign={{ base: "center", md: "left" }} my="10">
            Our library
          </Heading>
          <Text textAlign={{ base: "center", md: "left" }}>
            Browse our ever-expanding collection of books and you'll be sure to
            find a book to love.
          </Text>
        </Container>
        <InputGroup my="10">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FiSearch} />}
          />
          <Input placeholder="Book name, Author name, etc." />
        </InputGroup>
        {books.content ? (
          <SimpleGrid
            justifyContent="center"
            my="5"
            spacing={3}
            columns={slidesPerViewCount}
          >
            {books.content.map((book: BookProps) => {
              return (
                <BookCard
                  key={book.id}
                  id={book.id}
                  imgSrc={book.coverArtURL}
                  title={book.title}
                  authorName={book.author?.name}
                  price={book.price}
                />
              );
            })}
          </SimpleGrid>
        ) : (
          books.error && (
            <Center
              flexDir="column"
              mx="auto"
              textAlign="center"
              w="90%"
              h="60vh"
            >
              <ErrorMessage
                status={status}
                message="There was an error when attempting to retrieve book data, we're sorry for the inconvenience"
              />
            </Center>
          )
        )}
      </Fade>
    </Box>
  );
}
