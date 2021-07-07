package com.bankov.bookstorebackend.services;

import com.bankov.bookstorebackend.models.Author;
import com.bankov.bookstorebackend.models.Book;
import com.bankov.bookstorebackend.repositories.AuthorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {
    AuthorRepository repository;

    public AuthorService(AuthorRepository repository) {
        this.repository = repository;
    }

    public Page<Author> findPaginated(int page, int size, String sortBy, boolean ascending) {
        if (ascending) {
            return repository.findAll(PageRequest.of(page, size, Sort.by(sortBy).ascending()));
        } else {
            return repository.findAll(PageRequest.of(page, size, Sort.by(sortBy).descending()));
        }
    }

    public Page<Author> searchPaginated(String query, int page, int size, String sortBy, boolean ascending) {
        if (ascending) {
            return repository.findAllByNameContainsIgnoreCase(
                    query, PageRequest.of(page, size, Sort.by(sortBy).ascending()));
        } else {
            return repository.findAllByNameContainsIgnoreCase(
                    query, PageRequest.of(page, size, Sort.by(sortBy).descending()));
        }

    }

    public Optional<Author> findById(Long id) {
        return repository.findById(id);
    }

    public Author create(Author author) {
        return repository.save(author);
    }

    public Optional<Author> update(Long id, Author updatedAuthor) {
        return repository.findById(id).map(author -> {
            author.updateWith(updatedAuthor);
            return repository.save(author);
        });
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
