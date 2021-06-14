import { Box, Container, Fade, Heading, Text } from "@chakra-ui/react";
import * as React from "react";

export interface IAboutProps {}

export default function About() {
  return (
    <Box mx={{ base: "5", md: "10" }} mb="10">
      <Fade in transition={{ enter: { duration: 1 } }}>
        <Container maxW="100%">
          <Heading textAlign={{ base: "center", md: "left" }} my="10">
            About us
          </Heading>
          <Text textAlign={{ base: "center", md: "left" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed magna
            magna, venenatis eu erat vitae, gravida venenatis tortor. Nam congue
            non elit quis tempor. Nam placerat dictum nunc, in viverra erat
            lacinia nec. Vestibulum interdum at quam ac tempus. Maecenas sapien
            nibh, vehicula non tellus et, tincidunt sodales ligula. Sed sed
            egestas turpis. Vestibulum sed odio urna. Suspendisse tellus nisi,
            blandit non cursus in, lobortis ac massa. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Quisque nisl nisl, elementum nec libero et, gravida
            volutpat lacus. Ut vel congue augue, in pellentesque erat. Donec
          </Text>
          <Text>
            ullamcorper scelerisque hendrerit. Aenean id neque elementum,
            venenatis ligula in, facilisis lorem. Etiam gravida hendrerit
            accumsan. Nullam justo tellus, laoreet eu tristique a, blandit ac
            leo. Phasellus magna elit, facilisis vitae rutrum a, condimentum ut
            urna. Vivamus porttitor ultrices enim quis venenatis. Sed erat
            libero, aliquam a nisl vitae, varius ultricies nulla. Pellentesque
            ullamcorper est vel neque placerat, eu auctor nisi egestas. Nam et
            metus sed felis euismod sodales. Praesent at aliquet purus. In
            posuere nisl eget sollicitudin accumsan.
          </Text>
        </Container>
      </Fade>
    </Box>
  );
}
