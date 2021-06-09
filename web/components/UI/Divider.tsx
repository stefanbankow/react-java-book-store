import { Box } from "@chakra-ui/react";
import * as React from "react";

export interface IDividerProps {
  orientation: "horizontal" | "vertical";
  width: number | string;
}

export default function Divider({ width, orientation }: IDividerProps) {
  return orientation == "horizontal" ? (
    <Box bgColor="brand.300" h={width} w="75%" />
  ) : (
    <Box bgColor="brand.300" w={width} h="75%" />
  );
}
