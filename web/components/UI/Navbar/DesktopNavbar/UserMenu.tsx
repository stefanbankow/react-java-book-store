import { User } from "@auth0/auth0-react";
import {
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiChevronDown, FiServer, FiLogOut, FiUser } from "react-icons/fi";

import styles from "../../../../styles/AnimatedUnderlineLink.module.css";

export interface IUserMenuProps {
  user: User;
  isAdmin: boolean;
  logout: () => void;
}

export default function UserMenu({ user, isAdmin, logout }: IUserMenuProps) {
  const router = useRouter();
  return (
    <Menu placement="bottom">
      <MenuButton className={styles.menuButton}>
        {user.email}
        <Icon as={FiChevronDown} />
      </MenuButton>
      <MenuList bgColor="brand.100">
        {isAdmin && (
          <MenuGroup title="Admin">
            <MenuItem
              icon={<Icon as={FiServer} />}
              onClick={() => router.push("/admin")}
            >
              Dashboard
            </MenuItem>
          </MenuGroup>
        )}
        <MenuGroup title="Menu">
          <MenuItem
            icon={<Icon as={FiUser} />}
            onClick={() => router.push("/profile")}
          >
            Profile
          </MenuItem>

          <MenuItem icon={<Icon as={FiLogOut} />} onClick={() => logout()}>
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
