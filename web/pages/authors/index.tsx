import {
  Box,
  Center,
  Container,
  Fade,
  Heading,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthorSortByMenu from "../../components/UI/Authors/AuthorSortByMenu";
import CardPageAbstraction from "../../components/UI/CardPageAbstraction";
import SearchInput from "../../components/UI/Forms/SearchInput";

export interface IAuthorsPageProps {}

export default function AuthorsPage() {
  const router = useRouter();
  const [isTyping, setIsTyping] = useState(false);

  const handleSortButtonClick = (value: string) => {
    router.push(
      router.pathname +
        `?search=${router.query.search || ""}&page=0&sortBy=${value}&asc=${
          router.query.asc || "false"
        }`,
      undefined,
      { shallow: true }
    );
  };

  const handleAscButtonClick = (value: boolean) => {
    router.push(
      router.pathname +
        `?search=${router.query.search || ""}&page=0&sortBy=${
          router.query.sortBy || "id"
        }&asc=${value}`,
      undefined,
      { shallow: true }
    );
  };

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
          <SearchInput placeholder="Search" setIsTyping={setIsTyping} />
        </HStack>
        {isTyping ? (
          <Center w="100%" h="50vh">
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            <CardPageAbstraction
              type="authors"
              page={router.query.page}
              sortBy={router.query.sortBy}
              asc={router.query.asc}
              size={"24"}
              search={router.query.search || ""}
            />
            <div style={{ display: "none" }}>
              <CardPageAbstraction
                type="authors"
                page={(
                  parseInt((router.query.page as string) || "0") + 1
                ).toString()}
                sortBy={router.query.sortBy}
                asc={router.query.asc}
                size={"24"}
                search={router.query.search || ""}
              />
            </div>
          </>
        )}
      </Fade>
    </Box>
  );
}
