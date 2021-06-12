import * as React from "react";
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  SlideOptions,
  Spacer,
  VStack,
  Divider,
  DrawerBody,
} from "@chakra-ui/react";
import NavbarLink from "../Navbar/DesktopNavbar/NavbarLink";
import { useUser } from "@auth0/nextjs-auth0";

export interface IMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: SlideOptions["direction"];
}

export default function MenuDrawer({
  isOpen,
  onClose,
  placement,
}: IMenuDrawerProps) {
  const { isLoading, user } = useUser();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={placement}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader
          borderBottomWidth="1px"
          borderColor="brand.300"
          textAlign="center"
          color="brand.300"
        >
          Menu
        </DrawerHeader>
        <DrawerBody>
          <VStack justify="left">
            <Spacer />
            <NavbarLink link="/books" onClick={onClose}>
              Books
            </NavbarLink>
            <NavbarLink link="/authors" onClick={onClose}>
              Authors
            </NavbarLink>
            <NavbarLink link="/about" onClick={onClose}>
              About us
            </NavbarLink>
            <Spacer />
            <Divider orientation="horizontal" />
            <Spacer />
            {isLoading ? null : user ? (
              <NavbarLink link="/api/auth/logout" onClick={onClose}>
                {user.name!}
              </NavbarLink>
            ) : (
              <>
                <NavbarLink link="/api/auth/login" onClick={onClose}>
                  Sign in / Sign up
                </NavbarLink>
              </>
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
