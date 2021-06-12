import {
  Box,
  Container,
  Fade,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import BookCard from "../components/UI/BookCard";
import { BookProps, PaginatedBooksResponseProps } from "../types/BookTypes";

import React from "react";
import { InferGetServerSidePropsType } from "next";

export interface IBooksPageProps {}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/store/books`);
  const data: PaginatedBooksResponseProps = await res.json();
  return { props: { data } };
}

export default function BooksPage({
  data,
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
      <Box h="70px" />

      <Fade in transition={{ enter: { duration: 1 } }}>
        <Container maxW="100%">
          <Heading textAlign={{ base: "center", md: "left" }} my="10">
            Our library
          </Heading>
          <Text textAlign={{ base: "center", md: "left" }}>
            Browse our ever-expanding collection of books and you'll be sure to
            find a book you'll fall in love with.
          </Text>
        </Container>
        <SimpleGrid my="5" spacing={3} columns={slidesPerViewCount}>
          {data.content &&
            data.content.map((book: BookProps) => {
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
      </Fade>
    </Box>
  );
}
