import { Button } from "@chakra-ui/react";
import * as React from "react";

export interface IPaginationButtonProps {
  pageId: number;
  pageState: number;
  onClick: () => void;
}

export default function PaginationButton({
  pageId,
  pageState,
  onClick,
}: IPaginationButtonProps) {
  return (
    <Button variant="ghost" disabled={pageState === pageId} onClick={onClick}>
      {pageId + 1}
    </Button>
  );
}
