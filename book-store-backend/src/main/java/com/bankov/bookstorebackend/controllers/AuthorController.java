package com.bankov.bookstorebackend.controllers;

import com.bankov.bookstorebackend.services.AuthorService;
import com.bankov.bookstorebackend.models.Author;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/store/authors")
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping
    public ResponseEntity<List<Author>> getAuthors() {
        List<Author> authors = this.authorService.findAll();
        return ResponseEntity.ok(authors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable("id") Long id) {
        return ResponseEntity.of(authorService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Author> createAuthor(@Valid @RequestBody Author newAuthor) {
        Author author = authorService.create(newAuthor);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(author.getId()).toUri();

        return ResponseEntity.created(location).body(author);
    }


    @PatchMapping("/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable("id") Long id, @Valid @RequestBody Author updatedAuthor) {
        return ResponseEntity.of(authorService.update(id, updatedAuthor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Author> deleteAuthor(@PathVariable("id") Long id) {
        authorService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
