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

import { useState } from "react";
import SortByMenu from "../components/Pages/BooksPage/SortByMenu";
import BookPageAbstraction from "../components/Pages/BooksPage/BooksPageAbstraction";

export default function BooksPage({}) {
  const [page, setPage] = useState(0);
  const [size] = useState(24);
  const [sortBy, setSortBy] = useState("id");
  const [asc, setAsc] = useState(false);

  const handleSortButtonClick = (value: string) => {
    setSortBy(value);
    setPage(0);
  };

  const handleAscButtonClick = (value: boolean) => {
    setAsc(value);
    setPage(0);
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
            sortByValue={sortBy}
            ascValue={asc}
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
          page={page}
          setPage={setPage}
          sortBy={sortBy}
          asc={asc}
          size={size}
        />

        {/*Used to pre-render the next page*/}
        <div style={{ display: "none" }}>
          <BookPageAbstraction
            page={page + 1}
            setPage={setPage}
            sortBy={sortBy}
            asc={asc}
            size={size}
          />
        </div>
      </Fade>
    </Box>
  );
}
