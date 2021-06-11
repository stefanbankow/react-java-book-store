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
import BookCard from "../../../UI/LatestBookCard";

export interface ILatestBooksCarouselProps {
  slidesPerViewCount: number | undefined;
  totalSlides: number;
}

export default function LatestBooksCarousel({
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
            <Slide className="slide" index={0}>
              <BookCard
                imgSrc="/book_covers/book_cover_1.jpg"
                title=" A Middle-earth Traveller: Sketches from Bag End to Mordor"
                authorName="J.R.R. Tolkien"
                price={599}
              />
            </Slide>
            <Slide index={1}>
              <BookCard
                imgSrc="/book_covers/book_cover_2.jpg"
                title="EverCursed Traveller: Sketches from Bag End to Mordor"
                authorName="Author 1"
                price={599}
              />
            </Slide>
            <Slide index={2}>
              <BookCard
                imgSrc="/book_covers/book_cover_3.jpg"
                title="The Familiars"
                authorName="Author 2"
                price={999}
              />
            </Slide>
            <Slide index={3}>
              <BookCard
                imgSrc="/book_covers/book_cover_4.jpg"
                title="Witch Born"
                authorName="Author 3"
                price={899}
              />
            </Slide>
            <Slide index={4}>
              <BookCard
                imgSrc="/book_covers/book_cover_2.jpg"
                title="EverCursed Traveller: Sketches from Bag End to Mordor"
                authorName="Author 1"
                price={599}
              />
            </Slide>
            <Slide className="slide" index={5}>
              <BookCard
                imgSrc="/book_covers/book_cover_1.jpg"
                title=" A Middle-earth Traveller: Sketches from Bag End to Mordor"
                authorName="J.R.R. Tolkien"
                price={599}
              />
            </Slide>
            <Slide index={6}>
              <BookCard
                imgSrc="/book_covers/book_cover_2.jpg"
                title="EverCursed Traveller: Sketches from Bag End to Mordor"
                authorName="Author 1"
                price={599}
              />
            </Slide>
            <Slide index={7}>
              <BookCard
                imgSrc="/book_covers/book_cover_3.jpg"
                title="The Familiars"
                authorName="Author 2"
                price={999}
              />
            </Slide>
            <Slide index={8}>
              <BookCard
                imgSrc="/book_covers/book_cover_4.jpg"
                title="Witch Born"
                authorName="Author 3 Long Name With 3 Surnames"
                price={899}
              />
            </Slide>
            <Slide index={9}>
              <BookCard
                imgSrc="/book_covers/book_cover_2.jpg"
                title="EverCursed Traveller: Sketches from Bag End to Mordor"
                authorName="Author 1"
                price={599}
              />
            </Slide>
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
