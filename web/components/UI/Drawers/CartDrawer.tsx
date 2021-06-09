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
  DrawerBody,
  DrawerFooter,
  Button,
  HStack,
} from "@chakra-ui/react";
import NavbarLink from "../Navbar/DesktopNavbar/NavbarLink";

export interface ICartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: ICartDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader
          borderBottomWidth="1px"
          borderColor="brand.300"
          textAlign="center"
          color="brand.300"
        >
          Cart
        </DrawerHeader>
        <DrawerBody>
          <VStack justify="left">
            <Spacer />
          </VStack>
        </DrawerBody>
        <DrawerFooter
          justifyContent="center"
          borderTop="1px"
          borderColor="brand.300"
        >
          <HStack align="center">
            <NavbarLink link="/order">Order</NavbarLink>

            <Button mx="10" variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
