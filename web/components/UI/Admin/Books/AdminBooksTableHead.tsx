import { HStack, Box, Text } from "@chakra-ui/react";
import * as React from "react";
import AdminBookPanelButton from "./AdminBookPanelButton";

export interface IAdminBooksTableHeadProps {
  sortByState: string;
  ascState: boolean;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setAsc: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminBooksTableHead({
  sortByState,
  ascState,
  setSortBy,
  setAsc,
}: IAdminBooksTableHeadProps) {
  return (
    <HStack
      w="98%"
      borderRadius={5}
      mx="auto"
      my="5"
      justifyContent="center"
      textAlign="center"
      px="5"
      spacing={5}
    >
      <AdminBookPanelButton
        type="id"
        width="5%"
        sortByValue={sortByState}
        ascValue={ascState}
        setSortBy={setSortBy}
        setAsc={setAsc}
      >
        ID
      </AdminBookPanelButton>
      <AdminBookPanelButton
        type="title"
        width="15%"
        sortByValue={sortByState}
        ascValue={ascState}
        setSortBy={setSortBy}
        setAsc={setAsc}
      >
        Title
      </AdminBookPanelButton>
      <AdminBookPanelButton type="description" width="20%">
        Description
      </AdminBookPanelButton>
      <AdminBookPanelButton
        type="price"
        width="5%"
        sortByValue={sortByState}
        ascValue={ascState}
        setSortBy={setSortBy}
        setAsc={setAsc}
      >
        Price
      </AdminBookPanelButton>
      <AdminBookPanelButton type="forSale" width="5%" sortByValue={sortByState}>
        For Sale?
      </AdminBookPanelButton>
      <AdminBookPanelButton type="yearOfRelease" width="10%">
        Year of Release
      </AdminBookPanelButton>

      <Text color="gray.500" fontWeight="bold" minW="10%">
        Image
      </Text>
      <AdminBookPanelButton type="authorName" width="10%">
        Author
      </AdminBookPanelButton>
      <Box minW="5%" />
    </HStack>
  );
}
