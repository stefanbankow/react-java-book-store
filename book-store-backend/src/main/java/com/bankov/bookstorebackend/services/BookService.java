package com.bankov.bookstorebackend.services;


import com.bankov.bookstorebackend.DTOs.CreateBookForm;
import com.bankov.bookstorebackend.exceptions.ResourceNotFoundException;
import com.bankov.bookstorebackend.models.Author;
import com.bankov.bookstorebackend.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final PagingAndSortingRepository<Book, Long> bookRepository;
    private final PagingAndSortingRepository<Author, Long> authorRepository;

    public BookService(PagingAndSortingRepository<Book, Long> bookRepository, PagingAndSortingRepository<Author, Long> authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    public Page<Book> findPaginated(int page, int size, String sortBy, boolean ascending) {
        if(ascending) {
            return bookRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy).ascending()));
        }
        else {
            return bookRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy).descending()));
        }

    }

    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    public Book create(CreateBookForm book) {
        Long authorId = book.getAuthorId();
        Book newBook = book.toBook();
        if(authorId != null) {
            Author bookAuthor = authorRepository.findById(authorId)
                    .orElseThrow(() -> new ResourceNotFoundException("author", "AuthorId not found"));
            newBook.setAuthor(bookAuthor);
        }
        bookRepository.save(newBook);
        return newBook;
    }

    public Optional<Book> update(Long id, CreateBookForm newBook) {
        return bookRepository.findById(id).map(book -> {
            book.updateWith(newBook.toBook());
            return bookRepository.save(book);
        });
    }

    public void delete(Long id) {
        bookRepository.deleteById(id);
    }
}
