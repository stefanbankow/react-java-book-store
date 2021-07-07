package com.bankov.bookstorebackend.repositories;

import com.bankov.bookstorebackend.models.Author;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Qualifier("authors")
@Repository
public interface AuthorRepository extends PagingAndSortingRepository<Author, Long> {
    Page<Author> findAllByNameContainsIgnoreCase(String query, Pageable page);
}
