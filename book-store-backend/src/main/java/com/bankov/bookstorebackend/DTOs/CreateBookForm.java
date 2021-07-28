package com.bankov.bookstorebackend.DTOs;

import com.bankov.bookstorebackend.models.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
public class CreateBookForm {
    @NotNull(message = "Book must have a title")
    @Size(min = 1, max = 255, message = "Title be between 1 and 255 characters")
    private final String title;
    @Size(min = 1, max = 2000, message = "Description must be between 1 and 2000 characters")
    private final String description;
    @URL(message = "You must provide a valid url to an image")
    @Size(min = 1, max = 1000, message = "URL must be between 1 and 1000 characters")
    private final String coverArtURL;
    @NotNull(message = "Book must have a price")
    private final Integer price;
    private final Integer yearOfRelease;
    private final boolean forSale;
    private final Long authorId;

    public Book toBook() {
        return new Book(this.title, this.description, this.coverArtURL, this.price, this.yearOfRelease, this.forSale);
    }
}
