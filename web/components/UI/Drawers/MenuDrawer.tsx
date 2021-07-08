import React from "react";
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
  Icon,
  Text,
  HStack,
} from "@chakra-ui/react";
import NavbarLink from "../Navbar/DesktopNavbar/NavbarLink";
import { FiLogOut, FiServer, FiUser } from "react-icons/fi";
import { useUserWithRole } from "../../../lib/swrHooks";

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
  const { isLoading, data } = useUserWithRole();

  const spacing = 3;

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
          <VStack justify="left" spacing={spacing}>
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
            {isLoading ? null : data?.user ? (
              <>
                <Text fontWeight="bold">{data.user.name}</Text>
                {data.isAdmin && (
                  <NavbarLink link="/admin" onClick={onClose}>
                    <HStack as="text">
                      <Icon as={FiServer} />
                      <Text>Dashboard</Text>
                    </HStack>
                  </NavbarLink>
                )}
                <NavbarLink link="/profile" onClick={onClose}>
                  <HStack as="text">
                    <Icon as={FiUser} />
                    <Text>Profile</Text>
                  </HStack>
                </NavbarLink>
                <NavbarLink link="/api/auth/logout" onClick={onClose}>
                  <HStack as="text">
                    <Icon as={FiLogOut} />
                    <Text>Logout</Text>
                  </HStack>
                </NavbarLink>
              </>
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
