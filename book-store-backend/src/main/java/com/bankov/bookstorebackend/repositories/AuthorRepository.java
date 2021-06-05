package com.bankov.bookstorebackend.repositories;

import com.bankov.bookstorebackend.models.Author;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends PagingAndSortingRepository<Author, Long> {
}
