package com.bankov.bookstorebackend.controllers;

import com.bankov.bookstorebackend.models.Book;
import com.bankov.bookstorebackend.services.AuthorService;
import com.bankov.bookstorebackend.models.Author;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/store/authors")
public class AuthorController {

    private final AuthorService service;

    public AuthorController(AuthorService authorService) {
        this.service = authorService;
    }

    @GetMapping
    public ResponseEntity<Page<Author>> getAuthorsPaginated(@RequestParam(required = false, defaultValue = "0") int page,
                                                            @RequestParam(required = false, defaultValue = "24") int size,
                                                            @RequestParam(required = false, defaultValue = "id") String sortBy,
                                                            @RequestParam(required = false, defaultValue = "false") boolean asc,
                                                            @RequestParam(required = false, defaultValue = "") String search) {
        Page<Author> authors;
        if (!search.equals("")) authors = service.searchPaginated(search, page, size, sortBy, asc);
        else
            authors = service.findPaginated(page, size, sortBy, asc);

        return ResponseEntity.ok().body(authors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable("id") Long id) {
        return ResponseEntity.of(service.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('create:authors')")
    public ResponseEntity<Author> createAuthor(@Valid @RequestBody Author newAuthor) {
        Author author = service.create(newAuthor);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(author.getId()).toUri();

        return ResponseEntity.created(location).body(author);
    }


    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('update:authors')")
    public ResponseEntity<Author> updateAuthor(@PathVariable("id") Long id, @Valid @RequestBody Author updatedAuthor) {
        return ResponseEntity.of(service.update(id, updatedAuthor));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('delete:authors')")
    public ResponseEntity<Author> deleteAuthor(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
