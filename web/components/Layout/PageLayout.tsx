import { useMediaQuery } from "@chakra-ui/react";
import * as React from "react";
import MobileNavbar from "../UI/Navbar/MobileNavbar/MobileNavbar";
import DesktopNavbar from "../UI/Navbar/DesktopNavbar/DesktopNavbar";
import Navbar from "../UI/Navbar/NavbarWrapper";

export interface IPageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: IPageLayoutProps) {
  const [smallScreen] = useMediaQuery("(max-width: 800px)");

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
