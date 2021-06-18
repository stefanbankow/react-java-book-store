import {
  Flex,
  Text,
  Link,
  Icon,
  VStack,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { FiExternalLink } from "react-icons/fi";
import NextLink from "next/link";

export interface IFooterProps {}

export default function Footer() {
  return (
    <footer>
      <Flex
        w="100%"
        bgColor="brand.100"
        boxShadow="0 -5px 5px rgba(0, 0, 0, 0.1)"
        p="10"
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex
          justifyContent={{ base: "center", md: "left" }}
          textAlign={{ base: "center", md: "left" }}
          flexDir="column"
        >
          <Text fontWeight="bold" fontSize="md">
            Book Store
          </Text>
          <Spacer />
          <Text fontSize="xs">
            Designed and created by Stefan Bankov{" "}
            <Link textColor="blue.400" href="https://github.com/stefanbankow">
              @stefanbankow
            </Link>
          </Text>
          <Text
            mt="5"
            mb={{ base: "5", md: "0" }}
            textColor="blue.400"
            fontSize="xx-small"
          >
            <Link href="https://icons8.com/photos">
              Bookshelf photo by Icons8 <Icon as={FiExternalLink} />
            </Link>
          </Text>
        </Flex>

        <Spacer />
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          spacing={3}
        >
          <Flex
            mx="5"
            flexDir={{ base: "row", md: "column" }}
            justifyContent={{ base: "center", md: "left" }}
          >
            <VStack>
              <Text fontSize="sm" fontWeight="bold">
                Explore
              </Text>

              <NextLink href="/">
                <Link fontSize="xs">Home</Link>
              </NextLink>

              <NextLink href="/books">
                <Link fontSize="xs">Books</Link>
              </NextLink>
              <NextLink href="/authors">
                <Link fontSize="xs">Authors</Link>
              </NextLink>
              <NextLink href="/about">
                <Link fontSize="xs">About us</Link>
              </NextLink>
            </VStack>
          </Flex>

          <Flex
            mx="5"
            flexDir={{ base: "row", md: "column" }}
            textAlign={{ base: "center", md: "left" }}
            justifyContent={{ base: "center", md: "left" }}
          >
            <VStack>
              <Text fontSize="sm" fontWeight="bold">
                Social
              </Text>

              <Link href="https://www.instagram.com/" fontSize="xs">
                Instagram
              </Link>
              <Link href="https://www.facebook.com/" fontSize="xs">
                Facebook
              </Link>
              <Link href="https://twitter.com/" fontSize="xs">
                Twitter
              </Link>
            </VStack>
          </Flex>

          <Flex
            mx="5"
            flexDir={{ base: "row", md: "column" }}
            textAlign={{ base: "center", md: "left" }}
            justifyContent={{ base: "center", md: "left" }}
          >
            <VStack>
              <Text fontSize="sm" fontWeight="bold">
                Contact us
              </Text>

              <Text fontSize="xs">Lorem ipsum Address 19</Text>
              <Text fontSize="xs">bookstore@email.com</Text>
              <Text fontSize="xs">+359999999999</Text>
            </VStack>
          </Flex>
        </Stack>
      </Flex>
    </footer>
  );
}
