package com.bankov.bookstorebackend.controllers;

import com.bankov.bookstorebackend.DTOs.CreateBookForm;
import com.bankov.bookstorebackend.exceptions.ResourceNotFoundException;
import com.bankov.bookstorebackend.models.Book;
import com.bankov.bookstorebackend.services.BookService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.AbstractMap;
import java.util.Map;

@RestController
@RequestMapping("api/store/books")
public class BookController {
    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Page<Book>> findBooksPaginated(@RequestParam(required = false, defaultValue = "0") int page,
                                                         @RequestParam(required = false, defaultValue = "24") int size,
                                                         @RequestParam(required = false, defaultValue = "id") String sortBy,
                                                         @RequestParam(required = false, defaultValue = "false") boolean asc,
                                                         @RequestParam(required = false) String search) {
        return service.getAllBooksPaginated(search, page, size, sortBy, asc);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> findBookById(@PathVariable("id") Long id) {
        return service.getBookById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('create:books')")
    public ResponseEntity<Book> createBook(@Valid @RequestPart CreateBookForm book,
                                           @RequestPart(required = false) MultipartFile image) {
        return service.createBook(book, image);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('update:books')")
    public ResponseEntity<Book> updateBook(@PathVariable("id") Long id,
                                           @Valid @RequestPart CreateBookForm book,
                                           @RequestPart(required = false) MultipartFile image) {
        return service.updateBook(id, book, image);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('delete:books')")
    public ResponseEntity<Book> deleteBook(@PathVariable("id") Long id) {
        return service.deleteBook(id);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map.Entry<String, String>> handleResourceNotFoundExceptions(ResourceNotFoundException ex) {
        Map.Entry<String, String> response = new AbstractMap.SimpleEntry<>(ex.getResourceField(), ex.getMessage());
        return ResponseEntity.badRequest().body(response);
    }
}
