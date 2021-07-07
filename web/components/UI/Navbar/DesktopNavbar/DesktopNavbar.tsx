import {
  Box,
  Flex,
  SimpleGrid,
  HStack,
  UseDisclosureProps,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import HomePageLink from "../HomePageLink";
import NavbarLink from "./NavbarLink";
import MyDivider from "../../Divider";
import { useAppSelector } from "../../../../redux/hooks";

import UserMenu from "./UserMenu";

import styles from "../../../../styles/AnimatedUnderlineLink.module.css";
import { useUserWithRole } from "../../../../lib/swrHooks";

export interface IDesktopNavbarProps {
  cartStatus: UseDisclosureProps;
}

export default function DesktopNavbar({ cartStatus }: IDesktopNavbarProps) {
  const { isLoading, data } = useUserWithRole();

  const items = useAppSelector((state) => state.cart.items);
  return (
    <Flex
      boxShadow="0 5px 5px rgba(0, 0, 0, 0.1)"
      zIndex="10"
      position="fixed"
      bg="brand.100"
      w="100%"
      h="70px"
    >
      <SimpleGrid
        px={{ base: "10px", lg: "40px" }}
        mx="auto"
        columns={3}
        w="100%"
      >
        <HStack justifyContent="left" spacing={{ base: "1rem", lg: "2rem" }}>
          <NavbarLink link="/books">Books</NavbarLink>

          <NavbarLink link="/authors">Authors</NavbarLink>

          <NavbarLink link="/about">About us</NavbarLink>
        </HStack>
        <Box mx="auto" px="5">
          <HomePageLink size="lg" />
        </Box>

        <HStack justifyContent="right" spacing={{ base: "1rem", lg: "2rem" }}>
          {isLoading ? (
            <div />
          ) : data && data.user ? (
            <UserMenu user={data.user} isAdmin={data.isAdmin} />
          ) : (
            <>
              <NavbarLink link="/api/auth/login">Sign in / Sign up</NavbarLink>
            </>
          )}
          <MyDivider width="1px" orientation="vertical" />
          <Box as="button" aria-label="desktop_cart_button">
            <a onClick={cartStatus.onOpen} className={styles.navbarLink}>
              <Text textAlign="center">Cart {items.length}</Text>
            </a>
          </Box>
        </HStack>
      </SimpleGrid>
    </Flex>
  );
}
