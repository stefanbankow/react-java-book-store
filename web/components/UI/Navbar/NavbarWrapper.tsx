import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import * as React from "react";
import CartDrawer from "../Drawers/CartDrawer";
import MenuDrawer from "../Drawers/MenuDrawer";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";

import MobileNavbar from "./MobileNavbar/MobileNavbar";

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
  const cartDrawerStatus = useDisclosure();
  const menuDrawerStatus = useDisclosure();

  const [smallScreen] = useMediaQuery("(max-width: 800px)");

  return (
    <>
      <header>
        {smallScreen ? (
          <MobileNavbar
            menuStatus={menuDrawerStatus}
            cartStatus={cartDrawerStatus}
          />
        ) : (
          <DesktopNavbar cartStatus={cartDrawerStatus} />
        )}
      </header>
      <MenuDrawer
        placement="left"
        isOpen={menuDrawerStatus.isOpen}
        onClose={menuDrawerStatus.onClose}
      />
      <CartDrawer
        isOpen={cartDrawerStatus.isOpen}
        onClose={cartDrawerStatus.onClose}
      />
    </>
  );
}
