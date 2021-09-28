import {
  Box,
  Flex,
  SimpleGrid,
  HStack,
  UseDisclosureProps,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import HomePageLink from "../HomePageLink";
import NavbarLink from "./NavbarLink";
import MyDivider from "../../Divider";
import { useAppSelector } from "../../../../redux/hooks";

import UserMenu from "./UserMenu";

import { useAuth0 } from "@auth0/auth0-react";
import NavbarButton from "../NavbarButton";
import { isUserAdmin } from "../../../../lib/auth0util";

export interface IDesktopNavbarProps {
  cartStatus: UseDisclosureProps;
}

export default function DesktopNavbar({ cartStatus }: IDesktopNavbarProps) {
  const { user, isLoading, loginWithRedirect, logout } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isUserAdmin(user));
  }, [user]);

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

        <HStack
          justifySelf="end"
          justifyContent="right"
          spacing={{ base: "1rem", lg: "2rem" }}
        >
          {isLoading ? (
            <div />
          ) : user ? (
            <UserMenu user={user} isAdmin={isAdmin} logout={logout} />
          ) : (
            <NavbarButton
              text="Sign in/Sign up"
              ariaLabel="desktop_sign_in_button"
              onClick={loginWithRedirect}
            />
          )}
          <MyDivider width="1px" orientation="vertical" />
          <NavbarButton
            text={`Cart ${items.length}`}
            ariaLabel="desktop_cart_button"
            onClick={cartStatus.onOpen}
          />
        </HStack>
      </SimpleGrid>
    </Flex>
  );
}
