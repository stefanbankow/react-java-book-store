import { Box, Container, Fade, Heading, Text } from "@chakra-ui/react";
import * as React from "react";

export interface IBooksPageProps {}

export default function BooksPage(props: IBooksPageProps) {
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
      </Fade>
    </Box>
  );
}
