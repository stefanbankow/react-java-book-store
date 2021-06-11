import {
  Image,
  Box,
  Heading,
  Text,
  Container,
  Fade,
  Center,
  useBreakpointValue,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import { Waypoint } from "react-waypoint";
import Link from "next/link";
import React from "react";

import LatestBooksCarousel from "../components/UI/HomePage/Carousel/LatestBooksCarousel";

export default function Home() {
  const slidesPerViewCount = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    "2xl": 6,
    "3xl": 7,
  });

  const { onOpen, isOpen } = useDisclosure();

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
            top="30vh"
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
            offsetY="100px"
            transition={{ enter: { duration: 0.5 } }}
            in={isOpen}
          >
            <Waypoint onEnter={onOpen}>
              <Box>
                <LatestBooksCarousel
                  totalSlides={10}
                  slidesPerViewCount={slidesPerViewCount}
                />
              </Box>
            </Waypoint>
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

        {/* Authors sections */}
        <Box
          w="100%"
          h="100vh"
          bgColor="brand.200"
          borderRadius="50% 50% 0 0 / 100px"
        ></Box>
      </Fade>
    </Box>
  );
}
