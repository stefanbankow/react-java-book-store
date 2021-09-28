package com.bankov.bookstorebackend.DTOs;

import com.bankov.bookstorebackend.models.Book;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
public class BookRequestDTO {
    @NotNull(message = "Book must have a title")
    @Size(min = 1, max = 255, message = "Title be between 1 and 255 characters")
    private final String title;
    @Size(min = 1, max = 2000, message = "Description must be between 1 and 2000 characters")
    private final String description;
    @NotNull(message = "Book must have a price")
    private final Integer price;
    private final Integer yearOfRelease;
    private final boolean forSale;
    private final Long authorId;

    public Book toBook() {
        return Book.builder()
                .title(title)
                .description(description)
                .price(price)
                .yearOfRelease(yearOfRelease)
                .forSale(forSale)
                .build();
    }
}
