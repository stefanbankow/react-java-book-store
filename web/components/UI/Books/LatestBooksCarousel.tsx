import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Box, Flex, Icon } from "@chakra-ui/react";
import BookCard from "./BookCard";
import { BookProps } from "../../../types/BookTypes";

export interface ILatestBooksCarouselProps {
  books: BookProps[];
  slidesPerViewCount: number | undefined;
  totalSlides: number;
}

export default function LatestBooksCarousel({
  books,
  slidesPerViewCount,
  totalSlides,
}: ILatestBooksCarouselProps) {
  return (
    <CarouselProvider
      visibleSlides={slidesPerViewCount ?? 1}
      totalSlides={totalSlides}
      step={slidesPerViewCount ?? 1}
      naturalSlideWidth={100}
      naturalSlideHeight={200}
      infinite
    >
      <Flex position="relative" w="95%" my="10" mx="auto">
        <Box w={{ base: "70%", md: "85%" }} m="auto">
          <Slider>
            {books.map((book, index) => (
              <Slide
                key={book.id + " " + index}
                className="slide"
                index={index}
              >
                <BookCard book={book} />
              </Slide>
            ))}
          </Slider>
        </Box>

        <ButtonBack>
          <Icon
            as={IoIosArrowBack}
            aria-label="latest_books_carousel_back"
            position="absolute"
            transform="translateY(-50%)"
            top="42.5%"
            left="0"
            boxSize={{ base: "10", md: "12" }}
            transition="0.2s ease-out"
            _hover={{
              color: "rgba(0, 0, 0, 0.25)",
              transition: "0.2s ease-out",
            }}
            _focus={{
              color: "rgba(0, 0, 0, 0.25)",
              transition: "0.2s ease-out",
            }}
          />
        </ButtonBack>

        <ButtonNext>
          <Icon
            as={IoIosArrowForward}
            aria-label="latest_books_carousel_next"
            position="absolute"
            transform="translateY(-50%)"
            top="42.5%"
            right="0"
            boxSize={{ base: "10", md: "12" }}
            transition="0.2s ease-out"
            _hover={{
              color: "rgba(0, 0, 0, 0.25)",
              transition: "0.2s ease-out",
            }}
          />
        </ButtonNext>
      </Flex>
    </CarouselProvider>
  );
}
