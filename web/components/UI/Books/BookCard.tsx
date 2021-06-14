import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

export interface ILatestBookCardProps {
  id: number;
  imgSrc?: string;
  title: string;
  authorName: string;
  price: number;
}

export default function LatestBookCard({
  id,
  imgSrc,
  title,
  authorName,
  price,
}: ILatestBookCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
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
        <Link href={`/books/${id}`}>
          <Box
            w="100%"
            transition="0.2s ease"
            _hover={{
              cursor: "pointer",
              bgColor: "brand.200",
            }}
          >
            <AspectRatio m="10px auto" w="75%" ratio={0.68}>
              <Skeleton isLoaded={imgLoaded}>
                <Image
                  src={imgSrc}
                  alt="Image Cover"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(true)}
                />
              </Skeleton>
            </AspectRatio>
            <Stack direction="column" spacing={2.5} mx="auto" w="100%" flex={1}>
              <Center mx="3" flexDir="column" textAlign="center">
                <Text
                  noOfLines={2}
                  fontWeight="bold"
                  fontSize={["md", "md", "md", "md", "md", "lg"]}
                  minH="3em"
                >
                  {title}
                </Text>
                <Text
                  my="2"
                  noOfLines={1}
                  fontSize={["sn", "sm", "sm", "sm", "sm", "md"]}
                >
                  {authorName}
                </Text>
              </Center>
            </Stack>
          </Box>
        </Link>

        <Divider />
        <Flex
          textAlign="start"
          mx="auto"
          my="1"
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
          <Icon
            as={FiHeart}
            transition="0.2s ease"
            boxSize="5"
            _hover={{
              transform: "scale(1.25)",
              transition: "0.2s ease",
              cursor: "pointer",
            }}
          />
          <Spacer />
          <Icon
            as={FiShoppingCart}
            transition="0.2s ease"
            boxSize="5"
            _hover={{
              transform: "scale(1.25)",
              transition: "0.2s ease",
              cursor: "pointer",
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
