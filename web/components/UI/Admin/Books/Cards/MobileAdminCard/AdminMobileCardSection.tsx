import { Flex, Spacer, Text, Divider } from "@chakra-ui/react";
import * as React from "react";

export interface IAdminMobileCardSectionProps {
  type: string;
  content?: string | number | boolean | React.ReactNode;
  isEmptyMessage?: string;
  isLast?: boolean;
}

export default function AdminMobileCardSection({
  type,
  content,
  isEmptyMessage,
  isLast,
}: IAdminMobileCardSectionProps) {
  return (
    <>
      <Flex my="5">
        <Text align="left" fontWeight="bold">
          {type}
        </Text>
        <Spacer />
        <Text align="right">{content || isEmptyMessage}</Text>
      </Flex>
      {!isLast && <Divider />}
    </>
  );
}
