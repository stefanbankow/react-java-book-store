package com.bankov.bookstorebackend.DTOs;

import com.bankov.bookstorebackend.models.Book;
import org.hibernate.validator.constraints.UniqueElements;

import javax.validation.constraints.NotNull;

public class CreateBookForm {
    @NotNull(message = "Book must have a title")
    private final String title;
    @NotNull(message = "Book must have a description")
    private final String description;
    @NotNull(message = "Book must have a price")
    private final Long price;
    private final Long yearOfRelease;
    private final boolean forSale;
    private final Long authorId;

    public CreateBookForm(String title, String description, Long price, Long yearOfRelease, boolean forSale, Long authorId) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.yearOfRelease = yearOfRelease;
        this.forSale = forSale;
        this.authorId = authorId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Long getPrice() {
        return price;
    }

    public Long getYearOfRelease() {
        return yearOfRelease;
    }

    public boolean isForSale() {
        return forSale;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public Book toBook() {
        return new Book(this.title, this.description, this.price, this.yearOfRelease, this.forSale);
    }
}
