package com.bankov.bookstorebackend.controllers;

import com.bankov.bookstorebackend.models.Author;
import com.bankov.bookstorebackend.services.AuthorService;
import com.bankov.bookstorebackend.services.BookService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/store/authors")
public class AuthorController {

    private final AuthorService service;

    public AuthorController(AuthorService authorService, BookService bookService) {
        this.service = authorService;
    }

    @GetMapping
    public ResponseEntity<Page<Author>> getAuthorsPaginated(@RequestParam(required = false, defaultValue = "0") int page,
                                                            @RequestParam(required = false, defaultValue = "24") int size,
                                                            @RequestParam(required = false, defaultValue = "id") String sortBy,
                                                            @RequestParam(required = false, defaultValue = "false") boolean asc,
                                                            @RequestParam(required = false) String search) {
        return service.getAllAuthorsPaginated(search, page, size, sortBy, asc);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable("id") Long id) {
        return service.findAuthorById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('create:authors')")
    public ResponseEntity<Author> createAuthor(@Valid @RequestBody Author newAuthor) {
        return service.createAuthor(newAuthor);
    }


    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('update:authors')")
    public ResponseEntity<Author> updateAuthor(@PathVariable("id") Long id, @Valid @RequestBody Author updatedAuthor) {
        return service.updateAuthor(id, updatedAuthor);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('delete:authors')")
    public ResponseEntity<Author> deleteAuthor(@PathVariable("id") Long id) {
        return service.deleteAuthor(id);
    }

}
