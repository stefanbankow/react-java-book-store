//React libs
import React from "react";
import { Waypoint } from "react-waypoint";
import { FaBook, FaPen, FaStoreAlt, FaUser } from "react-icons/fa";
import {
  Box,
  Center,
  Container,
  Fade,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SlideFade,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

//Next.js
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";

//Components
import LatestBooksCarousel from "../components/UI/Books/LatestBooksCarousel";
import MyErrorMessage from "../components/UI/MyErrorMessage";

//PropTypes
import { PaginatedBooksResponseProps } from "../types/BookTypes";

export async function getServerSideProps() {
  const res = await fetch(
    `http://localhost:3000/api/store/books?page=0&size=10&sortBy=id&asc=false`
  );
  const books: PaginatedBooksResponseProps = await res.json();
  return { props: { books, status: res.status } };
}

//Note: I would have loved to split each section in it's own separate component, but doing so messes up the link styling.
//I decided that trying to fix it would be more trouble than it's worth and so this file is longger than it could be
export default function Home({
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

  const latestBooksState = useDisclosure();
  const authorsSectionState = useDisclosure();
  const aboutSectionState = useDisclosure();

  return (
    <Box>
      <Fade in transition={{ enter: { duration: 1 } }}>
        {/* Cover Image Section (Hero) */}
        <Box w="100%" h="95vh">
          <Container
            centerContent
            maxW="95%"
            position="absolute"
            left="50%"
            top="40vh"
            transform="translate(-50%, -50%)"
          >
            <Heading
              color="brand.300"
              fontWeight="semibold"
              fontSize={{ base: "2xl", md: "4xl", lg: "6xl" }}
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
                transition="0.25s ease-out"
                _hover={{
                  transform: "scale(1.1)",
                  transition: "0.25s ease-out",
                }}
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
            borderRadius="0 0 50% 50% / 100px"
          />
        </Box>

        {/* Latest books section */}

        <Box w="100%" my="10">
          <Heading textAlign="center">Latest Books</Heading>
          <SlideFade
            offsetY="50px"
            transition={{ enter: { duration: 0.5 } }}
            in={latestBooksState.isOpen}
          >
            <Waypoint onEnter={latestBooksState.onOpen} />
            <Box>
              {books.totalElements ? (
                <LatestBooksCarousel
                  books={books.content}
                  totalSlides={
                    books.content.length < 10 ? books.content.length : 10
                  }
                  slidesPerViewCount={slidesPerViewCount}
                />
              ) : status != 200 ? (
                <Center
                  flexDir="column"
                  mx="auto"
                  textAlign="center"
                  w="90%"
                  h="70vh"
                >
                  <MyErrorMessage
                    status={status}
                    message="There was an error when attempting to retrieve book data, we're sorry for the inconvenience"
                  />
                </Center>
              ) : (
                <Center
                  flexDir="column"
                  mx="auto"
                  textAlign="center"
                  w="90%"
                  h="70vh"
                >
                  <MyErrorMessage
                    status={status}
                    message="There are no books available at this time, check back later!"
                  />
                </Center>
              )}
            </Box>
            <Center my="-5" mb="10">
              <Link href="/books">
                <Box
                  as="button"
                  aria-label="view_more_button"
                  w={{ base: "60%", md: "35%", lg: "15%" }}
                  border="2px"
                  borderColor="brand.300"
                  textAlign="center"
                  padding="3"
                  transition="0.25s ease-out"
                  _hover={{
                    transform: "scale(1.1)",
                    transition: "0.25s ease-out",
                  }}
                >
                  <Text h="100%">View more</Text>
                </Box>
              </Link>
            </Center>
          </SlideFade>
        </Box>

        {/* Authors/About us section */}
        <Flex
          pt="20"
          w="100%"
          bgColor="brand.200"
          borderRadius="50% 50% 0 0 / 100px"
          position="relative"
          flexDir={{ base: "column", md: "row" }}
          flexGrow={1}
        >
          <Box mb="10" mx="auto" w={{ base: "90%", md: "50%" }}>
            <Heading my="10px" textAlign="center">
              Authors
            </Heading>
            <Waypoint onEnter={authorsSectionState.onOpen}>
              <Fade
                transition={{ enter: { duration: 1 } }}
                in={authorsSectionState.isOpen}
              >
                <Center textAlign="center" flexDir="column" my="10">
                  <HStack spacing={3}>
                    <Icon as={FaPen} boxSize={30} />
                    <Icon as={FaUser} boxSize={30} />
                    <Icon as={FaBook} boxSize={30} />
                  </HStack>
                  <Text mx="10" my="10">
                    Discover more information about the authors available on our
                    website
                  </Text>
                  <Link href="/authors">
                    <Box
                      as="button"
                      aria-label="view_more_button"
                      w={{ base: "60%", md: "35%" }}
                      border="2px"
                      borderColor="brand.300"
                      textAlign="center"
                      padding="3"
                      transition="0.25s ease-out"
                      _hover={{
                        transform: "scale(1.1)",
                        transition: "0.25s ease-out",
                      }}
                    >
                      <Text h="100%">Browse authors</Text>
                    </Box>
                  </Link>
                </Center>
              </Fade>
            </Waypoint>
          </Box>

          <Box textAlign="center" mx="auto" w={{ base: "90%", md: "50%" }}>
            <Heading my="10px" textAlign="center">
              About us
            </Heading>
            <Waypoint onEnter={aboutSectionState.onOpen}>
              <Fade
                transition={{ enter: { duration: 1 } }}
                in={aboutSectionState.isOpen}
              >
                <Center flexDir="column" my="10">
                  <Icon as={FaStoreAlt} boxSize={30} />
                  <Text mx="10" my="10">
                    Take a peek at our history, motivations, and goals moving
                    forward
                  </Text>
                  <Link href="/about">
                    <Box
                      as="button"
                      aria-label="view_more_button"
                      w={{ base: "60%", md: "35%" }}
                      border="2px"
                      borderColor="brand.300"
                      textAlign="center"
                      padding="3"
                      transition="0.25s ease-out"
                      _hover={{
                        transform: "scale(1.1)",
                        transition: "0.25s ease-out",
                      }}
                    >
                      <Text h="100%">Read about us</Text>
                    </Box>
                  </Link>
                </Center>
              </Fade>
            </Waypoint>
          </Box>
        </Flex>
      </Fade>
    </Box>
  );
}
