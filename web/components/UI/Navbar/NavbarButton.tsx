import { Box } from "@chakra-ui/react";
import * as React from "react";
import styles from "../../../styles/AnimatedUnderlineLink.module.css";
export interface INavbarButtonProps {
  text: string;
  ariaLabel: string;
  onClick: (() => void) | undefined;
}

export default function NavbarButton({
  text,
  ariaLabel,
  onClick,
}: INavbarButtonProps) {
  return (
    <Box as="button" aria-label={ariaLabel}>
      <a onClick={onClick} className={styles.navbarLink}>
        {text}
      </a>
    </Box>
  );
}
