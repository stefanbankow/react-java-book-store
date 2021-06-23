import {
  Box,
  Flex,
  AspectRatio,
  Stack,
  Center,
  Text,
  Image,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { FiUser } from "react-icons/fi";

export interface IAuthorProps {
  id: number;
  name: string;
  description?: string;
  imageURL?: string;
  yearBorn: number;
  yearOfDeath?: number;
}

export default function AuthorCard({
  id,
  name,
  yearBorn,
  imageURL,
}: IAuthorProps) {
  return (
    <Box py="5px">
      <Flex
        boxShadow="0 10px 10px rgba(0, 0, 0, 0.25)"
        borderRadius="5px"
        flexDir="column"
        maxW="90%"
        mx="auto"
        h="100%"
        transition="0.2s ease"
        _hover={{
          transform: "scale(1.05)",
          transition: "0.2s ease",
        }}
      >
        <Link href={`/authors/${id}`}>
          <Box
            w="100%"
            h="100%"
            transition="0.2s ease"
            _hover={{
              cursor: "pointer",
              bgColor: "brand.200",
            }}
          >
            <AspectRatio m="10px auto" w="75%" ratio={0.68}>
              <Image src={imageURL} fallback={<Icon as={FiUser} />} />
            </AspectRatio>
            <Stack direction="column" mx="auto" w="100%" flex={1}>
              <Center mx="3" flexDir="column" textAlign="center">
                <Text
                  noOfLines={2}
                  fontWeight="bold"
                  fontSize={["md", "md", "md", "md", "md", "lg"]}
                  minH="3em"
                >
                  {name}
                </Text>
                <Text
                  noOfLines={1}
                  fontSize={["sn", "sm", "sm", "sm", "sm", "md"]}
                >
                  {yearBorn}
                </Text>
              </Center>
            </Stack>
          </Box>
        </Link>
      </Flex>
    </Box>
  );
}