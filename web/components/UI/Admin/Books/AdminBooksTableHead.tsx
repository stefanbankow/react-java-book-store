import { HStack, Box, Text } from "@chakra-ui/react";
import * as React from "react";
import AdminBookPanelButton from "./AdminBookPanelButton";

export interface IAdminBooksTableHeadProps {}

export default function AdminBooksTableHead({}: IAdminBooksTableHeadProps) {
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
      <AdminBookPanelButton type="id" width="5%">
        ID
      </AdminBookPanelButton>
      <AdminBookPanelButton type="title" width="15%">
        Title
      </AdminBookPanelButton>
      <AdminBookPanelButton type="description" width="20%">
        Description
      </AdminBookPanelButton>
      <AdminBookPanelButton type="price" width="5%">
        Price
      </AdminBookPanelButton>
      <AdminBookPanelButton type="forSale" width="5%">
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
