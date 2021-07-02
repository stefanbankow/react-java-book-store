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
import React from "react";
import { FiSearch } from "react-icons/fi";
import SortByMenu from "../../components/UI/Books/SortByMenu";
import BookPageAbstraction from "../../components/UI/Books/BooksPageAbstraction";
import { useRouter } from "next/router";

export default function BooksPage({}) {
  const router = useRouter();

  //These use shallow pushing since the user is already at the top of the page
  const handleSortButtonClick = (value: string) => {
    router.push(
      `/books?page=0&sortBy=${value}&asc=${router.query.asc || "false"}`,
      undefined,
      { shallow: true }
    );
  };

  const handleAscButtonClick = (value: boolean) => {
    router.push(
      `/books?page=0&sortBy=${router.query.sortBy || "id"}&asc=${value}`,
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

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FiSearch} />}
            />
            <Input placeholder="Book name, Author name, etc." />
          </InputGroup>
        </HStack>

        <BookPageAbstraction
          page={parseInt((router.query.page as string) || "0")}
          sortBy={(router.query.sortBy as string) || "id"}
          asc={Boolean(router.query.asc === "true" || false)}
          size={24}
          router={router}
        />

        {/*Used to pre-render the next page*/}
        <div style={{ display: "none" }}>
          <BookPageAbstraction
            page={parseInt((router.query.page as string) || "0") + 1}
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
