package com.bankov.bookstorebackend.controllers;

import com.bankov.bookstorebackend.DTOs.BookRequestDTO;
import com.bankov.bookstorebackend.models.Author;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

public class ControllerTestUtils {
    public static RequestPostProcessor patchMultipartPostProcessor = request -> {
        request.setMethod("PATCH");
        return request;
    };

    public static MockMultipartFile getMultipartFileFromBookRequestDTO(BookRequestDTO book, ObjectMapper mapper) throws JsonProcessingException {
        return new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(book).getBytes());
    }

    public static MockMultipartFile getMultipartFileFromAuthor(Author author, ObjectMapper mapper) throws JsonProcessingException {
        return new MockMultipartFile("author", "author.txt",
                "application/json", mapper.writeValueAsString(author).getBytes());
    }
}
