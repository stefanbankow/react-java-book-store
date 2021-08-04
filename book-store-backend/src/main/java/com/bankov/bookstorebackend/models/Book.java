package com.bankov.bookstorebackend.models;

import com.bankov.bookstorebackend.models.listeners.BookEventListener;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@EntityListeners(BookEventListener.class)
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

    public void updateWith(Book book) {
        this.title = book.title;
        this.description = book.description;
        this.coverArtURL = book.coverArtURL;
        this.price = book.price;
        this.yearOfRelease = book.yearOfRelease;
        this.forSale = book.forSale;
    }
}
