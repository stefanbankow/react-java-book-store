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
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAppSelector } from "../../../redux/hooks";
import BookCartItem from "../Books/BookCartItem";

export interface ICartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: ICartDrawerProps) {
  const cart = useAppSelector((state) => state.cart);
  return (
    <Drawer size="md" isOpen={isOpen} onClose={onClose} placement="right">
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
          <VStack justify="center">
            {cart.items.map((book) => (
              <BookCartItem
                key={book.id}
                book={book}
                quantity={cart.quantityById[book.id]}
              />
            ))}
            <Spacer />
          </VStack>
        </DrawerBody>
        <DrawerFooter
          justifyContent="center"
          borderTop="1px"
          borderColor="brand.300"
        >
          <Flex direction="column" justifyContent="center">
            <Heading mb="5" size="md" align="center">
              Total: {(cart.totalPrice / 100).toFixed(2)}$
            </Heading>
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
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
