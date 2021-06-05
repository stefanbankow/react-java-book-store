package com.bankov.bookstorebackend.DTOs;

public class UpdateBookForm {
    private final String title;
    private final String description;
    private final Long price;
    private final Long yearOfRelease;
    private final boolean forSale;
    private final Long authorId;

    public UpdateBookForm(String title, String description, Long price, Long yearOfRelease, boolean forSale, Long authorId) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.yearOfRelease = yearOfRelease;
        this.forSale = forSale;
        this.authorId = authorId;
    }
}
