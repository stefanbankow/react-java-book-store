import {
  Box,
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
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import AuthorSortByMenu from "../../components/UI/Authors/AuthorSortByMenu";
import AuthorsPageAbstraction from "../../components/UI/Authors/AuthorsPageAbstraction";

export interface IAuthorsPageProps {}

export default function AuthorsPage() {
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
        <Heading textAlign={{ base: "center", md: "left" }} my="10">
          Authors
        </Heading>
        <Text my="5" textAlign={{ base: "center", md: "left" }}>
          Browse our collection of authors and learn more about their life and
          bibliography.
        </Text>
        <HStack>
          <AuthorSortByMenu
            sortByValue={sortBy}
            ascValue={asc}
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
          page={page}
          setPage={setPage}
          sortBy={sortBy}
          asc={asc}
          size={size}
        />
        <div style={{ display: "none" }}>
          <AuthorsPageAbstraction
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
