package com.bankov.bookstorebackend.models;

import javax.persistence.*;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @Column(length = 2000)
    private String description;
    @Column(length = 1000)
    private String coverArtURL;

    private Integer price;
    private Integer yearOfRelease;
    private Boolean forSale;


    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    protected Book() {
    }

    public Book(String title, String description,String coverArtURL, Integer price, Integer yearOfRelease, Boolean forSale ) {
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

    public Integer getPrice() {
        return price;
    }

    public String getCoverArtURL() {
        return coverArtURL;
    }

    public Integer getYearOfRelease() {
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

    public void updateWith(Book book) {

        this.title = book.title;
        this.description = book.description;
        this.coverArtURL = book.coverArtURL;
        this.price = book.price;
        this.yearOfRelease = book.yearOfRelease;
        this.forSale = book.forSale;

    }
}
