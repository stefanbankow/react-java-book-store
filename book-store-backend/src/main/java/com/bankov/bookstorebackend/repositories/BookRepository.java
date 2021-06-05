package com.bankov.bookstorebackend.repositories;

import com.bankov.bookstorebackend.models.Book;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {
}
