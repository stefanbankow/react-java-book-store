package com.bankov.bookstorebackend.services;


import com.bankov.bookstorebackend.DTOs.CreateBookForm;
import com.bankov.bookstorebackend.exceptions.ResourceNotFoundException;
import com.bankov.bookstorebackend.models.Author;
import com.bankov.bookstorebackend.models.Book;
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
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    public ResponseEntity<Page<Book>> getAllBooksPaginated(String searchQuery, int page, int size, String sortBy, boolean ascending) {
        if (searchQuery.equals("")) {
            return ResponseEntity.ok().body(findAllPaginated(page, size, sortBy, ascending));
        } else {
            return ResponseEntity.ok().body(searchAllPaginated(searchQuery, page, size, sortBy, ascending));
        }
    }

    private Page<Book> findAllPaginated(int page, int size, String sortBy, boolean ascending) {
        if (ascending) {
            return bookRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy).ascending()));
        } else {
            return bookRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy).descending()));
        }

    }

    private Page<Book> searchAllPaginated(String searchQuery, int page, int size, String sortBy, boolean ascending) {
        if (ascending) {
            return bookRepository.findAllByTitleContainsIgnoreCaseOrAuthor_NameContainsIgnoreCase(
                    searchQuery, searchQuery, PageRequest.of(page, size, Sort.by(sortBy).ascending()));
        } else {
            return bookRepository.findAllByTitleContainsIgnoreCaseOrAuthor_NameContainsIgnoreCase(
                    searchQuery, searchQuery, PageRequest.of(page, size, Sort.by(sortBy).descending()));
        }
    }

    public ResponseEntity<Book> getBookById(Long id) {
        return ResponseEntity.of(findById(id));
    }

    private Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    public ResponseEntity<Book> postBook(CreateBookForm book) {
        Book newBook = create(book);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newBook.getId()).toUri();
        return ResponseEntity.created(location).body(newBook);
    }

    private Book create(CreateBookForm book) {
        Long authorId = book.getAuthorId();
        Book newBook = book.toBook();
        if (authorId != null) {
            Author bookAuthor = authorRepository.findById(authorId)
                    .orElseThrow(() -> new ResourceNotFoundException("authorId", "There is no author with this ID"));
            newBook.setAuthor(bookAuthor);
        }
        bookRepository.save(newBook);
        return newBook;
    }

    public ResponseEntity<Book> updateBook(Long id, CreateBookForm newBook) {
        return ResponseEntity.of(update(id, newBook));
    }

    private Optional<Book> update(Long id, CreateBookForm newBook) {
        return bookRepository.findById(id).map(book -> {
            if (newBook.getAuthorId() != book.getAuthor().getId()) {
                Author bookAuthor = authorRepository.findById(newBook.getAuthorId())
                        .orElseThrow(() -> new ResourceNotFoundException("authorId", "There is no author with this ID"));
                book.setAuthor(bookAuthor);
            }
            book.updateWith(newBook.toBook());
            return bookRepository.save(book);
        });
    }

    public ResponseEntity<Book> deleteBook(Long id) {
        delete(id);
        return ResponseEntity.noContent().build();
    }

    private void delete(Long id) {
        bookRepository.deleteById(id);
    }
}
