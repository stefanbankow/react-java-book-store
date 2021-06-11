import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Icon,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";

export interface ILatestBookCardProps {
  id?: number;
  imgSrc: string;
  title: string;
  authorName: string;
  price: number;
}

export default function LatestBookCard({
  imgSrc,
  title,
  authorName,
  price,
}: ILatestBookCardProps) {
  return (
    <Box py="5px">
      <Flex
        boxShadow="0 0 10px rgba(0, 0, 0, 0.25)"
        borderRadius="5px"
        flexDir="column"
        maxW="90%"
        p="1"
        mx="auto"
        h="100%"
      >
        <AspectRatio m="10px auto" w="75%" ratio={0.68 / 1}>
          <Image src={imgSrc} objectFit="cover" />
        </AspectRatio>
        <Stack direction="column" spacing={2.5} mx="auto" w="100%" flex={1}>
          <Center flexDir="column" textAlign="center">
            <Text
              noOfLines={2}
              fontWeight="bold"
              my="5px"
              fontSize={["md", "md", "md", "md", "md", "lg"]}
              minH="3em"
            >
              {title}
            </Text>
            <Text noOfLines={1} fontSize={["sn", "sm", "sm", "sm", "sm", "md"]}>
              {authorName}
            </Text>
          </Center>
          <Divider />
          <Flex
            textAlign="start"
            mx="auto"
            w="70%"
            direction="row"
            alignSelf="center"
            alignItems="center"
          >
            <Box
              fontSize={["md", "md", "md", "lg", "lg", "xl"]}
              fontWeight="italic"
            >
              {(price / 100).toFixed(2) + "$"}
            </Box>
            <Spacer />
            <Icon as={FiShoppingCart} />
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
}
