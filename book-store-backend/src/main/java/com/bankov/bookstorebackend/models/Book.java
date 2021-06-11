package com.bankov.bookstorebackend.models;

import javax.persistence.*;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Long price;
    private String coverArtURL;


    private Long yearOfRelease;
    private Boolean forSale;


    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    protected Book() {
    }

    public Book(String title, String description, Long price, Long yearOfRelease, Boolean forSale, String coverArtURL) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.yearOfRelease = yearOfRelease;
        this.forSale = forSale;
        this.coverArtURL = coverArtURL;
    }

    public Long getId() {
        return id;
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
    public String getCoverArtURL() {
        return coverArtURL;
    }
    public Long getYearOfRelease() {
        return yearOfRelease;
    }

    public Boolean isForSale() {
        return forSale;
    }

    public Author getAuthor() {
        return author;
    }


    public void setAuthor(Author author) {
        this.author = author;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", yearOfRelease=" + yearOfRelease +
                ", isForSale=" + forSale +
                '}';
    }

    public void partialUpdateWith(Book book) {
        if(book.title != null) {
            this.title = book.title;
        }
        if(book.description != null) {
            this.description = book.description;
        }

        if(book.price != null) {
            this.price = book.price;
        }

        if(book.yearOfRelease != null) {
            this.yearOfRelease = book.yearOfRelease;
        }
        if(book.forSale != null) {
            this.forSale = book.forSale;
        }
    }
}
