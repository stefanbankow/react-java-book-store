import { HStack, Text, Icon } from "@chakra-ui/react";
import * as React from "react";
import { FiShoppingCart } from "react-icons/fi";

export interface IMobileCartProps {
  itemCount?: number;
}

export default function MobileCart({ itemCount }: IMobileCartProps) {
  return (
    <HStack>
      <Icon as={FiShoppingCart} />
      <Text>{itemCount ? itemCount : 0}</Text>
    </HStack>
  );
}
