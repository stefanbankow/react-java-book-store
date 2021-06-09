import { Heading, Box } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

export interface IHomePageLinkProps {
  size: "lg" | "md";
}

export default function HomePageLink(props: IHomePageLinkProps) {
  return (
    <Link href="/">
      <Box
        px="5"
        role="group"
        as="button"
        transition="0.3s ease-out"
        _hover={{
          bg: "rgba(0, 0, 0, 0.05)",
          transition: "0.3s ease-out",
        }}
        h="100%"
      >
        <Heading
          _groupHover={{
            transform: "scale(1.02)",
            transition: "0.2s ease-in",
          }}
          transition="0.2s ease-in"
          orientation="vertical"
          size={props.size}
        >
          Book Store
        </Heading>
      </Box>
    </Link>
  );
}
