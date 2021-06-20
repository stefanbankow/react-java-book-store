package com.bankov.bookstorebackend.models;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Author must have a name")
    @Length(min = 1, message = "Author's name must not be empty")
    private String name;

    @Column(length = 1000)
    private String description;


    @URL(message = "You must provide a valid link to an image")
    @Column(length = 1000)
    private String imageURL;

    private Integer yearBorn;
    private Integer yearOfDeath;

    protected Author() {}

    public Author(String name, String description, String imageURL, Integer yearBorn, Integer yearOfDeath) {
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.yearBorn = yearBorn;
        this.yearOfDeath = yearOfDeath;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getImageURL() {
        return imageURL;
    }

    public Integer getYearBorn() {
        return yearBorn;
    }

    public Integer getYearOfDeath() {
        return yearOfDeath;
    }



    @Override
    public String toString() {
        return "Author{" +
                "id=" + id +
                ", firstName='" + name + '\'' +
                ", description='" + description + '\'' +
                ", yearBorn=" + yearBorn +
                ", yearOfDeath=" + yearOfDeath +
                '}';
    }

    public void updateWith(Author author) {
        this.name = author.name;
        this.description = author.description;
        this.imageURL = author.imageURL;
        this.yearBorn = author.yearBorn;
        this.yearOfDeath = author.yearOfDeath;
    }
}
