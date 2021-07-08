import {
  Flex,
  SimpleGrid,
  Icon,
  HStack,
  UseDisclosureProps,
  Center,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import * as React from "react";
import HomePageLink from "../HomePageLink";
import MobileCart from "../MobileNavbar/MobileCartButton";
import MobileButtonWrapper from "../../Buttons/MobileButtonWrapper";
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
    <Flex
      zIndex="10"
      position="fixed"
      bg="brand.100"
      w="100%"
      h="70px"
      boxShadow="0 5px 5px rgba(0, 0, 0, 0.1)"
    >
      <SimpleGrid px="5" mx="auto" columns={3} w="100%">
        <Flex justifyContent="left">
          <Center>
            <MobileButtonWrapper
              boxSize={12}
              flexboxProps={{
                justifyContent: "center",
                alignItems: "center",
              }}
              ariaLabel="mobile_navigation_menu"
              onClick={menuStatus.onOpen}
            >
              <Icon as={FiMenu} />
            </MobileButtonWrapper>
          </Center>
        </Flex>
        <Center>
          <HomePageLink size="md" />
        </Center>

        <Flex justifySelf="end" justifyContent="right">
          <HStack>
            <MobileButtonWrapper
              boxSize={12}
              flexboxProps={{
                justifyContent: "center",
                alignItems: "center",
              }}
              ariaLabel="mobile_cart_drawer"
              onClick={cartStatus.onOpen}
            >
              <MobileCart itemCount={cartItems.length} />
            </MobileButtonWrapper>
          </HStack>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}
