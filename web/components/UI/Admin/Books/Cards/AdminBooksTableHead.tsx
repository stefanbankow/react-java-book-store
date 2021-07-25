import { HStack, Box, Text } from "@chakra-ui/react";
import * as React from "react";
import AdminTableHeadButton from "../AdminTableHeadButton";

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
      <AdminTableHeadButton type="id" width="5%">
        ID
      </AdminTableHeadButton>
      <AdminTableHeadButton type="title" width="15%">
        Title
      </AdminTableHeadButton>
      <AdminTableHeadButton type="description" width="20%">
        Description
      </AdminTableHeadButton>
      <AdminTableHeadButton type="price" width="5%">
        Price
      </AdminTableHeadButton>
      <AdminTableHeadButton type="forSale" width="5%">
        For Sale?
      </AdminTableHeadButton>
      <AdminTableHeadButton type="yearOfRelease" width="10%">
        Year of Release
      </AdminTableHeadButton>

      <Text color="gray.500" fontWeight="bold" minW="10%">
        Image
      </Text>
      <AdminTableHeadButton type="authorName" width="10%">
        Author
      </AdminTableHeadButton>
      <Box minW="5%" />
    </HStack>
  );
}
