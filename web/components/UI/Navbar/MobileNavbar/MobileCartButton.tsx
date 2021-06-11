import { HStack, Text, Icon } from "@chakra-ui/react";
import * as React from "react";
import { FiShoppingCart } from "react-icons/fi";
import MobileButtonWrapper from "../../Buttons/MobileButtonWrapper";

export interface IMobileCartProps {
  itemCount?: number;
}

export default function MobileCart({ itemCount }: IMobileCartProps) {
  return (
    <MobileButtonWrapper
      boxSize={12}
      ariaLabel="mobile_navigation_cart"
      flexboxProps={{ justifyContent: "center", alignItems: "center" }}
    >
      <HStack>
        <Icon as={FiShoppingCart} />
        <Text>{itemCount ? itemCount : 0}</Text>
      </HStack>
    </MobileButtonWrapper>
  );
}
