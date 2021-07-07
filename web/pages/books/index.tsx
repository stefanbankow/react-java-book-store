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
import React, { useState } from "react";

import SortByMenu from "../../components/UI/Books/SortByMenu";
import { useRouter } from "next/router";
import SearchInput from "../../components/UI/Forms/SearchInput";
import CardPageAbstraction from "../../components/UI/CardPageAbstraction";

export default function BooksPage({}) {
  const router = useRouter();

  const [isTyping, setIsTyping] = useState(false);

  //These use shallow pushing since the user is already at the top of the page
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
            Our library
          </Heading>
          <Text textAlign={{ base: "center", md: "left" }}>
            Browse our ever-expanding collection of books and you'll be sure to
            find a book to love.
          </Text>
        </Container>
        <HStack>
          <SortByMenu
            sortByValue={(router.query.sortBy as string) || "id"}
            ascValue={Boolean(router.query.asc === "true" || false)}
            handleSortButtonClick={handleSortButtonClick}
            handleAscButtonClick={handleAscButtonClick}
          />

          <SearchInput
            placeholder="Title, Author name, etc."
            setIsTyping={setIsTyping}
          />
        </HStack>
        {isTyping ? (
          <Center w="100%" h="50vh">
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            <CardPageAbstraction
              type="books"
              page={router.query.page}
              sortBy={router.query.sortBy}
              asc={router.query.asc}
              size={"24"}
              search={router.query.search || ""}
            />
            {/*Used to pre-render the next page*/}
            <div style={{ display: "none" }}>
              <CardPageAbstraction
                type="books"
                page={router.query.page}
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
