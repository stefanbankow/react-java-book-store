import {
  AspectRatio,
  Box,
  Button,
  CloseButton,
  Flex,
  Icon,
  Image,
  Input,
  Spacer,
  Stack,
  Text,
  useNumberInput,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FiBookOpen } from "react-icons/fi";
import { useAppDispatch } from "../../../redux/hooks";
import { changeQuantity, removeItem } from "../../../redux/slices/cartSlice";
import { BookProps } from "../../../types/BookTypes";

export interface IBookCartItemProps {
  book: BookProps;
  quantity: number;
}

export default function BookCartItem({ book, quantity }: IBookCartItemProps) {
  const dispatch = useAppDispatch();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      min: 1,
      max: 10,
      value: quantity,
      onChange: (value) =>
        dispatch(
          changeQuantity({
            id: book.id,
            quantity: parseInt(value),
            price: book.price,
          })
        ),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();

  const input = getInputProps({
    readOnly: true,
  });
  return (
    <Box
      borderRadius={5}
      position="relative"
      w="90%"
      boxShadow="0 5px 10px rgba(0, 0, 0, 0.25)"
    >
      <CloseButton
        top={2}
        right={2}
        position="absolute"
        onClick={() => dispatch(removeItem(book.id))}
      />
      <Flex direction={{ base: "column", sm: "row" }} w="100%" p={5}>
        <AspectRatio
          my="auto"
          mx={{ base: "auto", sm: 0 }}
          minW="120px"
          h="90%"
          ratio={0.68}
        >
          <Image
            src={book.coverArtURL}
            alt="Book Cover"
            fallback={<Icon as={FiBookOpen} />}
          />
        </AspectRatio>
        <Spacer />
        <VStack m="auto" spacing={7} mx="auto">
          <Box mx={{ base: 0, sm: 5 }} my={5} textAlign="center">
            <Text
              my="2"
              noOfLines={1}
              align="center"
              fontSize="lg"
              fontWeight="bold"
            >
              {book.title}
            </Text>
            <Text noOfLines={1}>{book.author?.name}</Text>
          </Box>
          <Stack direction={{ base: "column", sm: "row" }} spacing={5}>
            <Text fontWeight="bold" px="5" m="auto">
              {(book.price / 100).toFixed(2)}$
            </Text>

            <Flex>
              <Button w="40px" borderRadius="5em 0em 0em 5em" {...dec}>
                -
              </Button>
              <Input
                as="input"
                borderRadius={0}
                w="50px"
                textAlign="center"
                {...input}
              />
              <Button w="40px" borderRadius="0em 5em 5em 0em" {...inc}>
                +
              </Button>
            </Flex>
          </Stack>
        </VStack>
      </Flex>
    </Box>
  );
}
