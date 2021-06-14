import { Box, Container, Fade, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import Footer from "../components/UI/Footer/Footer";

export interface IAuthorsPageProps {}

export default function AuthorsPage(props: IAuthorsPageProps) {
  return (
    <Box mx={{ base: "5", md: "10" }}>
      <Fade in transition={{ enter: { duration: 1 } }}>
        <Container maxW="100%">
          <Heading textAlign={{ base: "center", md: "left" }} my="10">
            Authors
          </Heading>
          <Text textAlign={{ base: "center", md: "left" }}>
            Browse our collection of authors and learn more about their life and
            bibliography.
          </Text>
        </Container>
      </Fade>
    </Box>
  );
}
