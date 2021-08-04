package com.bankov.bookstorebackend.controllers;

import com.bankov.bookstorebackend.DTOs.CreateBookForm;
import com.bankov.bookstorebackend.exceptions.FileIsNotImageException;
import com.bankov.bookstorebackend.exceptions.ResourceNotFoundException;
import com.bankov.bookstorebackend.models.Author;
import com.bankov.bookstorebackend.models.Book;
import com.bankov.bookstorebackend.services.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BookController.class)
@AutoConfigureMockMvc
public class BookControllerTest {

    Author AUTHOR_1 = new Author(1L, "Author 1", "Description of Author 1",
            null, 1990, null);
    Author AUTHOR_2 = new Author(2L, "Author 2", "This description is longer",
            null, 1870, 1944);
    Book BOOK_1 = new Book(1L, "Book 1", "Desc of book 1",
            null, 999, 2016, true, AUTHOR_1);
    Book BOOK_2 = new Book(2L, "Book 2", "Desc of book 2",
            null, 1599, 1965, false, AUTHOR_1);
    Book BOOK_3 = new Book(3L, "Book 3", "Desc of book 3",
            null, 2099, 1667, true, AUTHOR_2);

    CreateBookForm newBookRequestBody = new CreateBookForm("POST Test Book",
            "This book should be created successfully", 2099, 2021, true, 2L);
    CreateBookForm updatedBookRequestBody = new CreateBookForm("Updated book Test",
            "This description was successfully updated while testing",
            2099, 2010, true, 1L);

    MockMultipartFile mockImage = new MockMultipartFile("image", "image".getBytes());

    RequestPostProcessor patchMultipartPostProcessor = request -> {
        request.setMethod("PATCH");
        return request;
    };


    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Autowired
    private ObjectMapper mapper;


    @Test
    public void getBooksSortedById_success() throws Exception {
        List<Book> books = new ArrayList<>(Arrays.asList(BOOK_1, BOOK_2, BOOK_3));
        ResponseEntity<Page<Book>> booksPage = ResponseEntity.ok().body(new PageImpl<>(books));

        Mockito.when(bookService.getAllBooksPaginated(null, 0, 24, "id", false))
                .thenReturn(booksPage);

        mockMvc.perform(get("/api/store/books")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(3)))
                .andExpect(jsonPath("$.content[1].title", is("Book 2")))
                .andExpect(jsonPath("$.content[2].description", is("Desc of book 3")))
                .andExpect(jsonPath("$.content[0].coverArtURL", emptyOrNullString()))
                .andExpect(jsonPath("$.content[0].price", is(999)))
                .andExpect(jsonPath("$.content[2].yearOfRelease", is(1667)))
                .andExpect(jsonPath("$.content[0].*", hasSize(8)))
                .andExpect(jsonPath("$.totalElements", is(3)));


    }

    @Test
    public void searchBooksSortedById_success() throws Exception {
        List<Book> books = new ArrayList<>(List.of(BOOK_3));
        ResponseEntity<Page<Book>> booksPage = ResponseEntity.ok().body(new PageImpl<>(books));

        Mockito.when(bookService.getAllBooksPaginated("Author 2", 0, 24, "id", false))
                .thenReturn(booksPage);

        mockMvc.perform(get("/api/store/books/?search=Author 2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(1)))
                .andExpect(jsonPath("$.content[0].title", is("Book 3")))
                .andExpect(jsonPath("$.content[0].description", is("Desc of book 3")));

    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"create:books"})
    public void createBook_success() throws Exception {
        Book newBook = newBookRequestBody.toBook();
        newBook.setAuthor(AUTHOR_2);

        MockMultipartFile newBookJson = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(newBookRequestBody).getBytes());

        Mockito.when(bookService.createBook(newBookRequestBody, mockImage))
                .thenReturn(ResponseEntity.created(URI.create("/api/store/books/4")).body(newBook));

        mockMvc.perform(multipart("/api/store/books").file(mockImage).file(newBookJson)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title", is("POST Test Book")))
                .andExpect(jsonPath("$.description", is("This book should be created successfully")))
                .andExpect(jsonPath("$.coverArtURL", emptyOrNullString()))
                .andExpect(jsonPath("$.price", is(2099)))
                .andExpect(jsonPath("$.yearOfRelease", is(2021)))
                .andExpect(jsonPath("$.forSale", is(true)))
                .andExpect(jsonPath("$.author.name", is("Author 2")));
    }

    @Test
    public void createBook_isUnauthorized() throws Exception {
        Book newBook = newBookRequestBody.toBook();
        newBook.setAuthor(AUTHOR_1);

        MockMultipartFile newBookJson = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(newBookRequestBody).getBytes());

        Mockito.when(bookService.createBook(newBookRequestBody, mockImage))
                .thenReturn(ResponseEntity.created(URI.create("/api/store/books/4")).body(newBook));


        mockMvc.perform(multipart("/api/store/books").file(mockImage).file(newBookJson)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser("basic_user")
    public void createBook_isForbidden() throws Exception {
        Book newBook = newBookRequestBody.toBook();
        newBook.setAuthor(AUTHOR_1);

        MockMultipartFile newBookJson = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(newBookRequestBody).getBytes());

        Mockito.when(bookService.createBook(newBookRequestBody, mockImage))
                .thenReturn(ResponseEntity.created(URI.create("/api/store/books/4")).body(newBook));


        mockMvc.perform(multipart("/api/store/books").file(mockImage).file(newBookJson)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isForbidden());
    }


    @Test
    @WithMockUser(username = "admin_test", authorities = {"create:books"})
    public void createBook_badRequest() throws Exception {
        CreateBookForm requestBody = new CreateBookForm("Bad request",
                "This book should not be created because it doesn't have a price",
                null, 2010, true, 1L);

        MockMultipartFile newBookJson = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(requestBody).getBytes());

        Book newBook = requestBody.toBook();
        newBook.setAuthor(AUTHOR_1);

        Mockito.when(bookService.createBook(requestBody, mockImage))
                .thenReturn(ResponseEntity.created(URI.create("/api/store/books/4")).body(newBook));


        mockMvc.perform(multipart("/api/store/books").file(mockImage).file(newBookJson)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$.price", is("Book must have a price")));
    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"create:books"})
    public void createBook_fileNotImage() throws Exception {
        Book newBook = newBookRequestBody.toBook();
        newBook.setAuthor(AUTHOR_2);

        MockMultipartFile newBookJson = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(newBookRequestBody).getBytes());

        MockMultipartFile mockTextFile = new MockMultipartFile("image", "textFile.txt",
                "text/plain", "random text".getBytes());

        Mockito.when(bookService.createBook(newBookRequestBody, mockTextFile))
                .thenThrow(new FileIsNotImageException("image", "File must be of type JPG/JPEG/PNG"));

        mockMvc.perform(multipart("/api/store/books").file(mockTextFile).file(newBookJson)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.image", is("File must be of type JPG/JPEG/PNG")));
    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"update:books"})
    public void updateBook_success() throws Exception {
        Book updatedBook = updatedBookRequestBody.toBook();
        updatedBook.setAuthor(AUTHOR_1);

        MockMultipartFile updatedBookJSON = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(updatedBookRequestBody).getBytes());
        Mockito.when(bookService.updateBook(BOOK_3.getId(), updatedBookRequestBody, mockImage))
                .thenReturn(ResponseEntity.of(Optional.of(updatedBook)));

        mockMvc.perform(multipart("/api/store/books/3").file(mockImage).file(updatedBookJSON)
                        .with(csrf()).with(patchMultipartPostProcessor)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Updated book Test")))
                .andExpect(jsonPath("$.description", is("This description was successfully updated while testing")))
                .andExpect(jsonPath("$.coverArtURL", emptyOrNullString()))
                .andExpect(jsonPath("$.price", is(2099)))
                .andExpect(jsonPath("$.yearOfRelease", is(2010)))
                .andExpect(jsonPath("$.forSale", is(true)))
                .andExpect(jsonPath("$.author.name", is("Author 1")));
    }

    @Test
    public void updateBook_isUnauthorized() throws Exception {
        Book updatedBook = updatedBookRequestBody.toBook();
        updatedBook.setAuthor(AUTHOR_1);

        MockMultipartFile updatedBookJSON = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(updatedBookRequestBody).getBytes());


        Mockito.when(bookService.updateBook(BOOK_3.getId(), updatedBookRequestBody, mockImage))
                .thenReturn(ResponseEntity.of(Optional.of(updatedBook)));


        mockMvc.perform(multipart("/api/store/books/3").file(mockImage).file(updatedBookJSON)
                        .with(csrf()).with(patchMultipartPostProcessor)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser("basic_user")
    public void updateBook_isForbidden() throws Exception {
        Book updatedBook = updatedBookRequestBody.toBook();
        updatedBook.setAuthor(AUTHOR_1);

        MockMultipartFile updatedBookJSON = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(updatedBookRequestBody).getBytes());


        Mockito.when(bookService.updateBook(BOOK_3.getId(), updatedBookRequestBody, mockImage))
                .thenReturn(ResponseEntity.of(Optional.of(updatedBook)));

        mockMvc.perform(multipart("/api/store/books/3").file(mockImage).file(updatedBookJSON)
                        .with(csrf()).with(patchMultipartPostProcessor)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"create:books"})
    public void updateBook_badRequest() throws Exception {
        CreateBookForm requestBody = new CreateBookForm(null,
                "This book should not be updated, because the request is invalid",
                null, 2010, true, 2L);

        Book newBook = requestBody.toBook();
        newBook.setAuthor(AUTHOR_2);

        MockMultipartFile updatedBookJSON = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(requestBody).getBytes());

        Mockito.when(bookService.updateBook(2L, requestBody, mockImage))
                .thenReturn(ResponseEntity.of(Optional.of(newBook)));


        mockMvc.perform(multipart("/api/store/books/2").file(mockImage).file(updatedBookJSON)
                        .with(csrf()).with(patchMultipartPostProcessor)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title", is("Book must have a title")))
                .andExpect(jsonPath("$.price", is("Book must have a price")));
    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"create:books"})
    public void updateBook_fileNotImage() throws Exception {
        Book newBook = updatedBookRequestBody.toBook();
        newBook.setAuthor(AUTHOR_2);

        MockMultipartFile updatedBookJson = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(updatedBookRequestBody).getBytes());

        MockMultipartFile mockTextFile = new MockMultipartFile("image", "textFile.txt",
                "text/plain", "random text".getBytes());

        Mockito.when(bookService.createBook(updatedBookRequestBody, mockTextFile))
                .thenThrow(new FileIsNotImageException("image", "File must be of type JPG/JPEG/PNG"));

        mockMvc.perform(multipart("/api/store/books").file(mockTextFile).file(updatedBookJson)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.image", is("File must be of type JPG/JPEG/PNG")));
    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"update:books"})
    public void updateBook_invalidBookID() throws Exception {
        Book newBook = updatedBookRequestBody.toBook();
        newBook.setAuthor(AUTHOR_2);

        MockMultipartFile updatedBookJSON = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(updatedBookRequestBody).getBytes());


        Mockito.when(bookService.updateBook(4L, updatedBookRequestBody, mockImage))
                .thenReturn(ResponseEntity.of(Optional.empty()));


        mockMvc.perform(multipart("/api/store/books/4").file(mockImage).file(updatedBookJSON)
                        .with(csrf()).with(patchMultipartPostProcessor)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"update:books"})
    public void updateBook_invalidAuthorID() throws Exception {
        CreateBookForm requestBody = new CreateBookForm("Invalid ID Book",
                "This book should not be updated, because the provided author ID is invalid",
                599, 2010, true, 4L);

        Book newBook = requestBody.toBook();
        newBook.setAuthor(AUTHOR_2);

        MockMultipartFile updatedBookJSON = new MockMultipartFile("book", "book.txt",
                "application/json", mapper.writeValueAsString(requestBody).getBytes());


        Mockito.when(bookService.updateBook(BOOK_2.getId(), requestBody, mockImage))
                .thenThrow(new ResourceNotFoundException("authorId", "There is no author with this ID"));


        mockMvc.perform(multipart("/api/store/books/2").file(mockImage).file(updatedBookJSON)
                        .with(csrf()).with(patchMultipartPostProcessor)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.authorId", is("There is no author with this ID")));
    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"delete:books"})
    public void deleteBook_success() throws Exception {

        Mockito.when(bookService.deleteBook(2L)).thenReturn(ResponseEntity.noContent().build());

        mockMvc.perform(delete("/api/store/books/2")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @Test
    public void deleteBook_isUnauthorized() throws Exception {
        mockMvc.perform(delete("/api/store/books/2")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser("user_test")
    public void deleteBook_isForbidden() throws Exception {
        mockMvc.perform(delete("/api/store/books/2")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

}