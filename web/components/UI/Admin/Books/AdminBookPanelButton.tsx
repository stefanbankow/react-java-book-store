import { Button, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export interface IAdminBookPanelButtonProps {
  children: React.ReactNode;
  type: string;
  width: string;
  sortByValue?: string;
  setSortBy?: React.Dispatch<React.SetStateAction<string>>;
  ascValue?: boolean;
  setAsc?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminBookPanelButton({
  children,
  type,
  width,
  sortByValue,
  setSortBy,
  ascValue,
  setAsc,
}: IAdminBookPanelButtonProps) {
  const router = useRouter();
  const handleSortButtonClick = () => {
    if (setSortBy && setAsc) {
      router.push("/admin?page=0");
      if (sortByValue === type) {
        setAsc((prev) => !prev);
      } else {
        setSortBy(type);
        setAsc(false);
      }
    }
  };
  return (
    <Button
      variant="link"
      isActive={sortByValue === type}
      onClick={handleSortButtonClick}
      whiteSpace="normal"
      h="50px"
      w={width}
    >
      {children}
      {sortByValue === type &&
        (ascValue ? <Icon as={FiChevronUp} /> : <Icon as={FiChevronDown} />)}
    </Button>
  );
}
