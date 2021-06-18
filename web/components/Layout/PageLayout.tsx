import { Box, Flex } from "@chakra-ui/react";
import * as React from "react";
import Footer from "../UI/Footer/Footer";
import Navbar from "../UI/Navbar/NavbarWrapper";

export interface IPageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: IPageLayoutProps) {
  return (
    <Flex minH="100vh" flexDir="column">
      <Navbar />
      <Box mt="70px">{children}</Box>

      <Box position="relative" bottom="0" w="100%" mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
}
