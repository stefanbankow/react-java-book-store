import { Text } from "@chakra-ui/react";
import React from "react";

export interface IMyErrorMessageProps {
  status: number;
  message: string;
  reason?: string;
}

export default function MyErrorMessage({
  status,
  message,
  reason,
}: IMyErrorMessageProps) {
  let informationText;

  switch (status) {
    case 500:
      informationText = (
        <>
          <Text fontSize="md" color="red.400">
            Status: {status} Internal Server Error
          </Text>
        </>
      );
      break;
    case 400:
      informationText = (
        <>
          <Text fontSize="md" color="red.400">
            Status: {status} Bad Request
          </Text>
        </>
      );
      break;
    case 404:
      informationText = (
        <>
          <Text fontSize="md" color="red.400">
            Status: {status} Not Found
          </Text>
        </>
      );
      break;
    default:
      break;
  }
  return (
    <>
      <Text fontSize="xl" color="red.400">
        {message}
      </Text>
      {informationText}
      {reason && (
        <Text fontSize="md" color="red.400">
          Reason: {reason}
        </Text>
      )}
    </>
  );
}
