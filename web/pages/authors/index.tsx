import {
  Box,
  Container,
  Fade,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { FiSearch } from "react-icons/fi";
import AuthorSortByMenu from "../../components/UI/Authors/AuthorSortByMenu";
import AuthorsPageAbstraction from "../../components/UI/Authors/AuthorsPageAbstraction";

export interface IAuthorsPageProps {}

export default function AuthorsPage() {
  const router = useRouter();
  const handleSortButtonClick = (value: string) => {
    router.push(
      `/authors?page=0&sortBy=${value}&asc=${router.query.asc || "false"}`,
      undefined,
      { shallow: true }
    );
  };

  const handleAscButtonClick = (value: boolean) => {
    router.push(
      `/authors?page=0&sortBy=${router.query.sortBy || "id"}&asc=${value}`,
      undefined,
      { shallow: true }
    );
  };

  console.log(process.env.AUTH0_AUDIENCE);
  return (
    <Box mx={{ base: "5", md: "10" }}>
      <Fade in transition={{ enter: { duration: 1 } }}>
        <Container my="10" maxW="100%">
          <Heading textAlign={{ base: "center", md: "left" }} my="10">
            Authors
          </Heading>
          <Text textAlign={{ base: "center", md: "left" }}>
            Browse our collection of authors and learn more about their life and
            bibliography.
          </Text>
        </Container>
        <HStack>
          <AuthorSortByMenu
            sortByValue={(router.query.sortBy as string) || "id"}
            ascValue={Boolean(router.query.asc === "true" || false)}
            handleSortButtonClick={handleSortButtonClick}
            handleAscButtonClick={handleAscButtonClick}
          />
          <InputGroup my="10">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FiSearch} />}
            />
            <Input placeholder="Book name, Author name, etc." />
          </InputGroup>
        </HStack>

        <AuthorsPageAbstraction
          page={parseInt((router.query.page as string) || "0")}
          sortBy={(router.query.sortBy as string) || "id"}
          asc={Boolean(router.query.asc === "true" || false)}
          size={24}
          router={router}
        />
        <div style={{ display: "none" }}>
          <AuthorsPageAbstraction
            page={parseInt((router.query.page as string) || "0")}
            sortBy={(router.query.sortBy as string) || "id"}
            asc={Boolean(router.query.asc === "true" || false)}
            size={24}
            router={router}
          />
        </div>
      </Fade>
    </Box>
  );
}
