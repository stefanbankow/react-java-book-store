package com.bankov.bookstorebackend.controllers;

import com.bankov.bookstorebackend.DTOs.CreateBookForm;
import com.bankov.bookstorebackend.exceptions.ResourceNotFoundException;
import com.bankov.bookstorebackend.services.BookService;
import com.bankov.bookstorebackend.models.Book;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
    public ResponseEntity<List<Book>> findAllBooks() {
        List<Book> books = service.findAll();
        return ResponseEntity.ok().body(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> findBookById(@PathVariable("id") Long id) {
        Optional<Book> book = service.findById(id);
        return ResponseEntity.of(book);
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@Valid @RequestBody CreateBookForm book) {
            Book newBook = service.create(book);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(newBook.getId()).toUri();
            return ResponseEntity.created(location).body(newBook);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") Long id, @Valid @RequestBody CreateBookForm newBook) {
        return ResponseEntity.of(service.update(id, newBook));
    }

    @DeleteMapping("/{id}")
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
