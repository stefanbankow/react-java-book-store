import React from "react";
import { Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import styles from "../../../../styles/AnimatedUnderlineLink.module.css";

export interface INavbarLinkProps {
  link: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function NavbarLink({
  link,
  children,
  onClick,
}: INavbarLinkProps) {
  const { asPath } = useRouter();
  return (
    <NextLink href={link}>
      <a
        onClick={onClick}
        className={asPath === link ? styles.activeLink : styles.navbarLink}
      >
        <Text textAlign="center">{children}</Text>
      </a>
    </NextLink>
  );
}
