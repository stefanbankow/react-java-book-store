package com.bankov.bookstorebackend.models;

import com.bankov.bookstorebackend.models.listeners.AuthorEventListener;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@EntityListeners(AuthorEventListener.class)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Author must have a name")
    @Length(min = 1, message = "Author's name must not be empty")
    private String name;
    @Column(length = 2000)
    private String description;
    @URL(message = "You must provide a valid link to an image")
    @Column(length = 1000)
    private String imageURL;
    private Integer yearBorn;
    private Integer yearOfDeath;


    public void replaceWith(Author author) {
        this.name = author.name;
        this.description = author.description;
        this.imageURL = author.imageURL;
        this.yearBorn = author.yearBorn;
        this.yearOfDeath = author.yearOfDeath;
    }

    public void replaceWithButKeepAuthorImage(Author author) {
        this.name = author.name;
        this.description = author.description;
        this.yearBorn = author.yearBorn;
        this.yearOfDeath = author.yearOfDeath;
    }
}
