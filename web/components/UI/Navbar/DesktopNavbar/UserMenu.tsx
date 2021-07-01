import { UserProfile } from "@auth0/nextjs-auth0";
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
  user: UserProfile;
  isAdmin: boolean;
}

export default function UserMenu({ user, isAdmin }: IUserMenuProps) {
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

          <MenuItem
            icon={<Icon as={FiLogOut} />}
            onClick={() => router.push("/api/auth/logout")}
          >
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
