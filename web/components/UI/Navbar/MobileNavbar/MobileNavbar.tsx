import {
  Stack,
  Flex,
  SimpleGrid,
  Icon,
  HStack,
  UseDisclosureProps,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import * as React from "react";
import HomePageLink from "../HomePageLink";
import MobileCart from "../MobileNavbar/MobileCartButton";
import MobileButtonWrapper from "../../Buttons/MobileButtonWrapper";

export interface IMobileNavbarProps {
  menuStatus: UseDisclosureProps;
  cartStatus: UseDisclosureProps;
}

export default function MobileNavbar({
  cartStatus,
  menuStatus,
}: IMobileNavbarProps) {
  return (
    <Flex zIndex="10" position="fixed" bg="brand.100" w="100%" h="70px">
      <SimpleGrid px="5" mx="auto" columns={3} w="100%">
        <Flex justifyContent="left">
          <HStack>
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
          </HStack>
        </Flex>
        <Stack>
          <HomePageLink size="md" />
        </Stack>

        <Flex justifyContent="right">
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
              <MobileCart />
            </MobileButtonWrapper>
          </HStack>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}
