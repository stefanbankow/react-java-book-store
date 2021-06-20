import {
  Menu,
  MenuButton,
  Button,
  Icon,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from "@chakra-ui/react";
import * as React from "react";
import { FiChevronDown } from "react-icons/fi";

export interface IBookSortByMenuProps {
  sortByValue: string;
  ascValue: boolean;
  handleSortButtonClick: (value: string) => void;
  handleAscButtonClick: (value: boolean) => void;
}

export default function BookSortByMenu({
  sortByValue,
  ascValue,
  handleSortButtonClick,
  handleAscButtonClick,
}: IBookSortByMenuProps) {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        minW={{ base: "35%", sm: "25%", md: "15%", lg: "10%" }}
        rightIcon={<Icon as={FiChevronDown} />}
      >
        Sort
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue={sortByValue} title="By" type="radio">
          <MenuItemOption
            onClick={() => handleSortButtonClick("id")}
            value="id"
          >
            Latest
          </MenuItemOption>
          <MenuItemOption
            onClick={() => handleSortButtonClick("price")}
            value="price"
          >
            Price
          </MenuItemOption>
          <MenuItemOption
            onClick={() => handleSortButtonClick("title")}
            value="title"
          >
            Title
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />

        <MenuOptionGroup
          defaultValue={ascValue ? "asc" : "desc"}
          title="Order"
          type="radio"
        >
          <MenuItemOption
            onClick={() => handleAscButtonClick(true)}
            value="asc"
          >
            Ascending
          </MenuItemOption>
          <MenuItemOption
            onClick={() => handleAscButtonClick(false)}
            value="desc"
          >
            Descending
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
