package com.bankov.bookstorebackend.services;

import com.bankov.bookstorebackend.models.Author;
import com.bankov.bookstorebackend.repositories.AuthorRepository;
import com.bankov.bookstorebackend.repositories.BookRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.Optional;

@Service
@Transactional
public class AuthorService {
    AuthorRepository repository;
    BookRepository bookRepository;

    public AuthorService(AuthorRepository repository, BookRepository bookRepository) {
        this.repository = repository;
        this.bookRepository = bookRepository;
    }

    public ResponseEntity<Page<Author>> getAllBooksPaginated(String searchQuery, int page, int size, String sortBy, boolean ascending) {
        Page<Author> authors;

        if (searchQuery.equals(""))
            return ResponseEntity.ok().body(findAllPaginated(page, size, sortBy, ascending));
        else
            return ResponseEntity.ok().body(searchAllPaginated(searchQuery, page, size, sortBy, ascending));
    }

    private Page<Author> findAllPaginated(int page, int size, String sortBy, boolean ascending) {
        if (ascending) {
            return repository.findAll(PageRequest.of(page, size, Sort.by(sortBy).ascending()));
        } else {
            return repository.findAll(PageRequest.of(page, size, Sort.by(sortBy).descending()));
        }
    }

    private Page<Author> searchAllPaginated(String query, int page, int size, String sortBy, boolean ascending) {
        if (ascending) {
            return repository.findAllByNameContainsIgnoreCase(
                    query, PageRequest.of(page, size, Sort.by(sortBy).ascending()));
        } else {
            return repository.findAllByNameContainsIgnoreCase(
                    query, PageRequest.of(page, size, Sort.by(sortBy).descending()));
        }

    }

    public ResponseEntity<Author> findAuthorById(Long id) {
        return ResponseEntity.of(findById(id));
    }

    private Optional<Author> findById(Long id) {
        return repository.findById(id);
    }

    public ResponseEntity<Author> createAuthor(Author author) {
        Author newAuthor = create(author);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(author.getId()).toUri();

        return ResponseEntity.created(location).body(newAuthor);
    }

    private Author create(Author author) {
        return repository.save(author);
    }

    public ResponseEntity<Author> updateAuthor(Long id, Author updatedAuthor) {
        return ResponseEntity.of(update(id, updatedAuthor));
    }

    private Optional<Author> update(Long id, Author updatedAuthor) {
        return repository.findById(id).map(author -> {
            author.updateWith(updatedAuthor);
            return repository.save(author);
        });
    }

    public ResponseEntity<Author> deleteAuthor(Long id) {
        try {
            delete(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    private void delete(Long id) {

        repository.findById(id).map(author -> {
            bookRepository.deleteAllByAuthor(author);
            repository.delete(author);
            return author;
        }).orElseThrow(() -> new IllegalArgumentException("No author with this ID"));
    }
}
