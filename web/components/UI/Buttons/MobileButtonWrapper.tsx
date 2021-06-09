import { Flex, FlexboxProps } from "@chakra-ui/react";
import * as React from "react";

export interface IMobileButtonWrapperProps {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: React.MouseEventHandler;
  boxSize?: number;
  flexboxProps?: FlexboxProps;
}

export default function MobileButtonWrapper({
  children,
  ariaLabel,
  boxSize,
  flexboxProps,
  onClick,
}: IMobileButtonWrapperProps) {
  return (
    <Flex
      aria-label={ariaLabel}
      as="button"
      flexDir={flexboxProps && flexboxProps.flexDir}
      justifyContent={flexboxProps && flexboxProps.justifyContent}
      alignItems={flexboxProps && flexboxProps.alignItems}
      textAlign="center"
      boxSize={boxSize}
      borderRadius="50%"
      transition="0.3s ease-out"
      _hover={{
        bg: "rgba(0, 0, 0, 0.05)",
        transition: "0.3s ease-out",
      }}
      onClick={onClick}
    >
      {children}
    </Flex>
  );
}
