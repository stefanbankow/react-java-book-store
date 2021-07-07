package com.bankov.bookstorebackend.repositories;

import com.bankov.bookstorebackend.models.Book;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Qualifier("books")
@Repository
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {
    Page<Book> findAllByTitleContainsIgnoreCaseOrAuthor_NameContainsIgnoreCase(String query, String query2, Pageable page);
}
