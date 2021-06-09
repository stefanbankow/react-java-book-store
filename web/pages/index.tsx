import { Image, Box, Heading, Text, Container, Fade } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box>
      <Fade in transition={{ enter: { duration: 1 } }}>
        <Box w="100%" h="100vh">
          <Container
            centerContent
            maxW="95%"
            position="absolute"
            left="50%"
            top="30%"
            transform="translate(-50%, -50%)"
          >
            <Heading
              color="brand.300"
              fontWeight="semibold"
              fontSize={{ base: "2xl", lg: "6xl" }}
              textAlign="center"
              marginY="20"
            >
              Find the book that calls to you
            </Heading>

            <Link href="/books">
              <Box
                as="button"
                w={{ base: "95%", md: "50%", lg: "25%" }}
                border="2px"
                borderColor="brand.300"
                textAlign="center"
                padding="15"
                transition="0.2s ease-out"
                _hover={{ transform: "scale(1.1)", transition: "0.3s" }}
              >
                <Text h="100%">Shop now</Text>
              </Box>
            </Link>
          </Container>
          <Image
            src="/bookshelves-background.jpg"
            alt="Landing page background"
            width="100%"
            height="100%"
            objectFit="cover"
            borderBottomRadius="30%"
          />
        </Box>
      </Fade>
    </Box>
  );
}
