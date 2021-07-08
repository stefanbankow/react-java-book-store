import {
  Text,
  Icon,
  UseDisclosureProps,
  IconButton,
  Button,
  HStack,
  Box,
  Center,
} from "@chakra-ui/react";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import React from "react";
import HomePageLink from "../HomePageLink";

import { useAppSelector } from "../../../../redux/hooks";

export interface IMobileNavbarProps {
  menuStatus: UseDisclosureProps;
  cartStatus: UseDisclosureProps;
}

export default function MobileNavbar({
  cartStatus,
  menuStatus,
}: IMobileNavbarProps) {
  const cartItems = useAppSelector((state) => state.cart.items);
  return (
    <Box
      zIndex="10"
      position="fixed"
      bg="brand.100"
      w="100%"
      h="70px"
      boxShadow="0 5px 5px rgba(0, 0, 0, 0.1)"
    >
      <HStack position="relative" justifyContent="center" alignItems="center">
        <Center>
          <IconButton
            aria-label="mobile_menu_button"
            icon={<Icon as={FiMenu} />}
            onClick={menuStatus.onOpen}
            variant="ghost"
          />
        </Center>
        <Box flexGrow={1}>
          <HomePageLink size="md" />
        </Box>
        <Center>
          <Button onClick={cartStatus.onOpen} variant="ghost">
            <HStack>
              <Icon as={FiShoppingCart} />
              <Text>{cartItems.length}</Text>
            </HStack>
          </Button>
        </Center>
      </HStack>
    </Box>
  );
}
