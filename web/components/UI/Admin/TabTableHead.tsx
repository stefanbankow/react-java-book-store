import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import * as React from "react";
import AdminTableHeadButton from "./Books/AdminTableHeadButton";

export interface IAdminBooksTableHeadProps {
  type: "books" | "authors" | "orders";
}

export default function AdminBooksTableHead({
  type,
}: IAdminBooksTableHeadProps) {
  let buttons,
    propertyCount = 7;
  if (type === "books") {
    buttons = (
      <>
        <AdminTableHeadButton type="id">ID</AdminTableHeadButton>
        <AdminTableHeadButton type="title">Title</AdminTableHeadButton>
        <GridItem colSpan={2}>
          <AdminTableHeadButton type="description">
            Description
          </AdminTableHeadButton>
        </GridItem>
        <AdminTableHeadButton type="price">Price</AdminTableHeadButton>
        <AdminTableHeadButton type="forSale">For Sale?</AdminTableHeadButton>
        <AdminTableHeadButton type="yearOfRelease">
          Year of Release
        </AdminTableHeadButton>
        <Text color="gray.500" fontWeight="bold">
          Image
        </Text>
        <AdminTableHeadButton type="authorName">Author</AdminTableHeadButton>
        <Box />
      </>
    );
    propertyCount = 10;
  } else if (type === "authors") {
    buttons = (
      <>
        <AdminTableHeadButton type="id">ID</AdminTableHeadButton>
        <AdminTableHeadButton type="name">Name</AdminTableHeadButton>
        <GridItem colSpan={2}>
          <AdminTableHeadButton type="description">
            Description
          </AdminTableHeadButton>
        </GridItem>
        <AdminTableHeadButton type="yearBorn">
          Year of Birth
        </AdminTableHeadButton>
        <AdminTableHeadButton type="yearOfDeath">
          Year of Death
        </AdminTableHeadButton>
        <Text color="gray.500" fontWeight="bold">
          Image
        </Text>
        <Box />
      </>
    );
    propertyCount = 8;
  } else {
    buttons = <></>;
  }
  return (
    <Grid
      templateColumns={`repeat(${propertyCount}, 1fr)`}
      w="98%"
      borderRadius={5}
      mx="auto"
      my="5"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      px={3}
      gap={5}
    >
      {buttons}
    </Grid>
  );
}
