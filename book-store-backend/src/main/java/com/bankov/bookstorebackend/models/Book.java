package com.bankov.bookstorebackend.models;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    public Book(String title, String description, String coverArtURL, Integer price, Integer yearOfRelease, Boolean forSale) {
        this.title = title;
        this.description = description;
        this.coverArtURL = coverArtURL;
        this.price = price;
        this.yearOfRelease = yearOfRelease;
        this.forSale = forSale;
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
