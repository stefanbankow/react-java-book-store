package com.bankov.bookstorebackend.models.listeners;

import com.bankov.bookstorebackend.models.Book;
import com.bankov.bookstorebackend.util.images.uploaders.BookImageUploader;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.PreRemove;
import java.io.IOException;

public class BookEventListener {

    @Value("${CLOUDINARY_URL}")
    private String cloudinaryURL;

    @PreRemove
    private void beforeBookDeletion(Book book) throws IOException {
        if (book.getCoverArtURL() != null) {
            BookImageUploader imageUploader = new BookImageUploader(cloudinaryURL);
            imageUploader.deleteImage(book.getCoverArtURL());
        }
    }
}
