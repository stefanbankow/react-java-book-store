package com.bankov.bookstorebackend.controllers;

import com.bankov.bookstorebackend.DTOs.CreateBookForm;
import com.bankov.bookstorebackend.exceptions.ResourceNotFoundException;
import com.bankov.bookstorebackend.services.BookService;
import com.bankov.bookstorebackend.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("api/store/books")
public class BookController {
    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Page<Book>> findBooksPaginated(@RequestParam(required = false, defaultValue = "0") int page,
                                                         @RequestParam(required = false, defaultValue = "10") int size,
                                                         @RequestParam(required = false, defaultValue = "id") String sortBy,
                                                         @RequestParam(required = false, defaultValue = "false") boolean asc) {
        
        Page<Book> books;
        if (sortBy.equals("title") || sortBy.equals("price") || sortBy.equals("yearOfRelease")) {
            books = service.findPaginated(page, size, sortBy, asc);

        } else {
            books = service.findPaginated(page, size, "id", asc);
        }
        return ResponseEntity.ok().body(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> findBookById(@PathVariable("id") Long id) {
        Optional<Book> book = service.findById(id);
        return ResponseEntity.of(book);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('create:books')")
    public ResponseEntity<Book> createBook(@Valid @RequestBody CreateBookForm book) {
        Book newBook = service.create(book);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newBook.getId()).toUri();
        return ResponseEntity.created(location).body(newBook);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('update:books')")
    public ResponseEntity<Book> updateBook(@PathVariable("id") Long id, @Valid @RequestBody CreateBookForm newBook) {
        return ResponseEntity.of(service.update(id, newBook));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('delete:books')")
    public ResponseEntity<Book> deleteBook(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map.Entry<String, String>> handleResourceNotFoundExceptions(ResourceNotFoundException ex) {
        Map.Entry<String, String> response = new AbstractMap.SimpleEntry<>(ex.getResourceField(), ex.getMessage());
        return ResponseEntity.badRequest().body(response);
    }
}
