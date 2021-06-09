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
            <NavbarLink link="/about">Sign in</NavbarLink>
            <NavbarLink link="/about">Sign up</NavbarLink>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}