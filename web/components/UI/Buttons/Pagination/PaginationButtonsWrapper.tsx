import { IconButton, Stack, useBreakpointValue } from "@chakra-ui/react";
import * as React from "react";
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";
import { PaginatedBooksResponseProps } from "../../../../types/BookTypes";
import PaginationButton from "./PaginationButton";

export interface IPaginationButtonsWrapperProps {
  data: PaginatedBooksResponseProps;
  page: number;
  handlePaginationButtonClick: (value: number) => void;
}

export default function PaginationButtonsWrapper({
  data,
  page,
  handlePaginationButtonClick,
}: IPaginationButtonsWrapperProps) {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false });

  const pageButtons = [];

  if (data?.totalPages && !isSmallScreen) {
    if (data.totalPages < 5) {
      //If the total pages are less that 5
      for (let i = 0; i < data.totalPages; i++) {
        pageButtons.push(
          <PaginationButton
            key={i}
            pageId={i}
            pageState={page}
            onClick={() => handlePaginationButtonClick(i)}
          />
        );
      }
    } else if (page < 3) {
      for (let i = 0; i < 5; i++) {
        //Buttons in the begginning
        pageButtons.push(
          <PaginationButton
            key={i}
            pageId={i}
            pageState={page}
            onClick={() => handlePaginationButtonClick(i)}
          />
        );
      }
    } else if (page >= data.totalPages - 3) {
      for (let i = data.totalPages - 5; i < data.totalPages; i++) {
        //Buttons in the middle
        pageButtons.push(
          <PaginationButton
            key={i}
            pageId={i}
            pageState={page}
            onClick={() => handlePaginationButtonClick(i)}
          />
        );
      }
    } else {
      for (let i = page - 2; i < page + 3; i++) {
        //Last buttons
        pageButtons.push(
          <PaginationButton
            key={i}
            pageId={i}
            pageState={page}
            onClick={() => handlePaginationButtonClick(i)}
          />
        );
      }
    }
  } else {
    //Mobile button, only showing current page
    pageButtons.push(
      <PaginationButton
        key={page}
        pageId={page}
        pageState={page}
        onClick={() => handlePaginationButtonClick(page)}
      />
    );
  }

  return (
    <Stack my="5" justifyContent="center" direction="row" spacing={3}>
      <IconButton
        variant="ghost"
        aria-label="first_page_button"
        disabled={data?.first}
        onClick={() => handlePaginationButtonClick(0)}
        icon={<FiChevronsLeft />}
      />
      <IconButton
        variant="ghost"
        aria-label="prev_page_button"
        disabled={data?.first}
        onClick={() => handlePaginationButtonClick(page - 1)}
        icon={<FiChevronLeft />}
      />

      {pageButtons}
      <IconButton
        variant="ghost"
        aria-label="next_page_button"
        disabled={data?.last}
        onClick={() => handlePaginationButtonClick(page + 1)}
        icon={<FiChevronRight />}
      />
      <IconButton
        variant="ghost"
        aria-label="last_page_button"
        disabled={data?.last}
        onClick={() => handlePaginationButtonClick(data.totalPages - 1)}
        icon={<FiChevronsRight />}
      />
    </Stack>
  );
}
