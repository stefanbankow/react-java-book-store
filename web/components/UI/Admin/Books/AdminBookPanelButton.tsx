import { Button, Icon } from "@chakra-ui/react";
import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export interface IAdminBookPanelButtonProps {
  text: string;
  type: string;
  width: string;
  sortByValue?: string;
  setSortBy?: React.Dispatch<React.SetStateAction<string>>;
  ascValue?: boolean;
  setAsc?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminBookPanelButton({
  text,
  type,
  width,
  sortByValue,
  setSortBy,
  ascValue,
  setAsc,
}: IAdminBookPanelButtonProps) {
  const handleSortButtonClick = (value: string) => {
    if (setSortBy && setAsc)
      if (sortByValue == value) {
        setAsc((prev) => !prev);
      } else {
        setSortBy(value);
        setAsc(false);
      }
  };
  return (
    <Button
      variant="link"
      onClick={() => handleSortButtonClick(type)}
      whiteSpace="normal"
      as="button"
      minW={width}
    >
      {text}{" "}
      {sortByValue === type &&
        (ascValue ? <Icon as={FiChevronUp} /> : <Icon as={FiChevronDown} />)}
    </Button>
  );
}
