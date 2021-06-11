import {
  Box,
  Container,
  Fade,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import BookCard from "../components/UI/LatestBookCard";

export interface IBooksPageProps {}

export default function BooksPage(props: IBooksPageProps) {
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
        <SimpleGrid spacing={3} columns={slidesPerViewCount}>
          <BookCard
            imgSrc="/book_covers/book_cover_1.jpg"
            title=" A Middle-earth Traveller: Sketches from Bag End to Mordor"
            authorName="J.R.R. Tolkien"
            price={599}
          />
          <BookCard
            imgSrc="/book_covers/book_cover_1.jpg"
            title=" A Middle-earth Traveller: Sketches from Bag End to Mordor"
            authorName="J.R.R. Tolkien"
            price={599}
          />
          <BookCard
            imgSrc="/book_covers/book_cover_1.jpg"
            title=" A Middle-earth Traveller: Sketches from Bag End to Mordor"
            authorName="J.R.R. Tolkien"
            price={599}
          />
          <BookCard
            imgSrc="/book_covers/book_cover_1.jpg"
            title=" A Middle-earth Traveller: Sketches from Bag End to Mordor"
            authorName="J.R.R. Tolkien"
            price={599}
          />
          <BookCard
            imgSrc="/book_covers/book_cover_1.jpg"
            title=" A Middle-earth Traveller: Sketches from Bag End to Mordor"
            authorName="J.R.R. Tolkien"
            price={599}
          />
        </SimpleGrid>
      </Fade>
    </Box>
  );
}
