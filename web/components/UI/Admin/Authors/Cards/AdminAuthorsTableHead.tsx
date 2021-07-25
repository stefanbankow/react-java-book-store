import { HStack, Box, Text } from "@chakra-ui/react";
import * as React from "react";
import AdminTableHeadButton from "../../Books/AdminTableHeadButton";

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
    >
      <AdminTableHeadButton type="id" width="10%">
        ID
      </AdminTableHeadButton>
      <AdminTableHeadButton type="name" width="20%">
        Name
      </AdminTableHeadButton>
      <AdminTableHeadButton type="description" width="30%">
        Description
      </AdminTableHeadButton>

      <AdminTableHeadButton type="yearBorn" width="15%">
        Year of Birth
      </AdminTableHeadButton>
      <AdminTableHeadButton type="yearOfDeath" width="15%">
        Year of Death
      </AdminTableHeadButton>
      <Text color="gray.500" fontWeight="bold" minW="10%">
        Image
      </Text>

      <Box w="5%" />
    </HStack>
  );
}
