package com.bankov.bookstorebackend.services;

import com.bankov.bookstorebackend.models.Author;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {
    CrudRepository<Author, Long> repository;

    public AuthorService(CrudRepository<Author, Long> repository) {
        this.repository = repository;
    }

    public List<Author> findAll() {
        List<Author> list = new ArrayList<>();
        Iterable<Author> authors = repository.findAll();
        authors.forEach(list::add);
        return list;
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
