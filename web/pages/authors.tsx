import { Box, Container, Fade, Heading, Text } from "@chakra-ui/react";
import * as React from "react";

export interface IAuthorsPageProps {}

export default function AuthorsPage(props: IAuthorsPageProps) {
  return (
    <Box mx={{ base: "5", md: "10" }}>
      <Box h="70px" />

      <Fade in transition={{ enter: { duration: 1 } }}>
        <Container maxW="100%">
          <Heading textAlign={{ base: "center", md: "left" }} my="10">
            Authors
          </Heading>
          <Text textAlign={{ base: "center", md: "left" }}>
            Take the time to browse the people whom we have to thank for their
            amazing works.
          </Text>
        </Container>
      </Fade>
    </Box>
  );
}
