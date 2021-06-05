package com.bankov.bookstorebackend.models;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull(message = "Author must have a name")
    @Length(min = 1, message = "Author's name must not be empty")
    private String name;
    private String description;
    private Long yearBorn;
    private Long yearOfDeath;

    protected Author() {}

    public Author(String name, String description, Long yearBorn, Long yearOfDeath) {
        this.name = name;
        this.description = description;
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

    public Long getYearBorn() {
        return yearBorn;
    }

    public Long getYearOfDeath() {
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
        this.yearBorn = author.yearBorn;
        this.yearOfDeath = author.yearOfDeath;
    }
}
