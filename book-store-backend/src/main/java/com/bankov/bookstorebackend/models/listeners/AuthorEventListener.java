package com.bankov.bookstorebackend.models.listeners;

import com.bankov.bookstorebackend.models.Author;
import com.bankov.bookstorebackend.util.images.uploaders.AuthorImageUploader;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.PreRemove;
import java.io.IOException;


public class AuthorEventListener {
    @Value("${CLOUDINARY_URL}")
    private String cloudinaryURL;

    @PreRemove
    private void beforeAuthorDeletion(Author author) throws IOException {
        if (author.getImageURL() != null) {
            AuthorImageUploader imageUploader = new AuthorImageUploader(cloudinaryURL);
            imageUploader.deleteImage(author.getImageURL());
        }
    }
}
