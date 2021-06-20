import {
  AspectRatio,
  Box,
  Center,
  Container,
  Fade,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  Button,
  HStack,
  Spacer,
  Icon,
  Stack,
  Collapse,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import ErrorMessage from "../../components/UI/ErrorMessage";
import { FiHeart, FiUser } from "react-icons/fi";
import { AuthorProps } from "../../types/AuthorTypes";

const authorFetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

function useSingleBook(id?: string | string[] | number) {
  const { data, error } = useSWR(
    () => `/api/store/authors/${id}`,
    authorFetcher
  );

  return {
    data: data as AuthorProps,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function SingleBookPage() {
  const router = useRouter();

  const { data, isError, isLoading } = useSingleBook(router.query.id);

  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);

  let pageData;

  if (isLoading)
    pageData = (
      <Center mx="auto" my="20">
        <Spinner size="lg" />
      </Center>
    );
  else if (isError)
    pageData = (
      <Center
        flexDir="column"
        mx="auto"
        my="10"
        textAlign="center"
        w="90%"
        h="60vh"
      >
        <ErrorMessage
          status={isError?.status}
          message={"There was an error while trying to fetch this resource"}
        />
      </Center>
    );
  else {
    const descriptionLength = data.description ? data.description.length : 0;
    pageData = (
      <Box mx="auto">
        <Flex flexDir={{ base: "column", lg: "row" }}>
          <Box
            w={{ base: "100%", sm: "70%", lg: "30%" }}
            my="5"
            mx={{ base: "auto", lg: "10%" }}
          >
            <AspectRatio mx="auto" w={"100%"} ratio={0.68}>
              <Image src={data.imageURL} fallback={<Icon as={FiUser} />} />
            </AspectRatio>
          </Box>
          <Flex
            flexGrow={1}
            flexDir="column"
            justifyContent={{ base: "center", lg: "left" }}
            textAlign={{ base: "center", lg: "left" }}
            mx="10"
          >
            <Heading my="5">{data.name}</Heading>
            <Text fontWeight="bold">
              {data.yearBorn}
              {data.yearOfDeath ? " - " + data.yearOfDeath : null}
            </Text>

            <Text my="10">Description:</Text>
            {!data.description ? (
              <Text>No description given</Text>
            ) : descriptionLength > 180 ? (
              <>
                <Collapse startingHeight={70} in={show}>
                  <Text maxW="60ch">{data.description}</Text>
                </Collapse>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggle}
                  mt="1rem"
                >
                  Show {show ? "Less" : "More"}
                </Button>
              </>
            ) : (
              <Text maxW="60ch">{data.description}</Text>
            )}

            <Spacer />
            <Stack
              my="10"
              direction={{ base: "column", lg: "row" }}
              justifyContent={{ base: "center", lg: "left" }}
              spacing={3}
            >
              <HStack justifyContent={{ base: "center", lg: "left" }}>
                <Button leftIcon={<Icon as={FiHeart} />} variant="ghost">
                  Favorite
                </Button>
              </HStack>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    );
  }
  return (
    <Box mx={{ base: "5", md: "10" }}>
      <Container maxW="100%" my="10">
        <Fade in>{pageData}</Fade>
      </Container>
    </Box>
  );
}
