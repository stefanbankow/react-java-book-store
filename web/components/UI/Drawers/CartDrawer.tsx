import React from "react";
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spacer,
  VStack,
  DrawerBody,
  DrawerFooter,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
import NavbarLink from "../Navbar/DesktopNavbar/NavbarLink";
import styles from "../../../styles/AnimatedUnderlineLink.module.css";
import Link from "next/link";

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
          textColor="brand.300"
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
          <HStack spacing={20} align="center">
            <Link href="/order">
              <Button
                textColor="brand.300"
                fontSize={"xl"}
                onClick={onClose}
                variant="ghost"
              >
                Order
              </Button>
            </Link>

            <Button
              textColor="brand.300"
              fontSize={"xl"}
              onClick={onClose}
              variant="ghost"
            >
              Close
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
