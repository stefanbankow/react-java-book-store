package com.bankov.bookstorebackend.models.listeners;

import com.bankov.bookstorebackend.models.Book;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.PreRemove;
import java.io.IOException;

public class BookEventListener {

    @Value("${CLOUDINARY_URL}")
    private String cloudinaryURL;

    @PreRemove
    private void beforeBookDeletion(Book book) throws IOException {
        if (book.getCoverArtURL() != null) {
            Cloudinary cloudinary = new Cloudinary(cloudinaryURL);

            if (book.getCoverArtURL() != null) {
                try {
                    cloudinary.api().deleteAllResources(ObjectUtils.asMap("url", book.getCoverArtURL()));
                } catch (Exception e) {
                    throw new IOException(e.getMessage());
                }
            }
        }
    }
}
