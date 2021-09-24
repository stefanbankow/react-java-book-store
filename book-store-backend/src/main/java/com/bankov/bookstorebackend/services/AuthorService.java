package com.bankov.bookstorebackend.services;

import com.bankov.bookstorebackend.exceptions.FileIsNotImageException;
import com.bankov.bookstorebackend.models.Author;
import com.bankov.bookstorebackend.repositories.AuthorRepository;
import com.bankov.bookstorebackend.repositories.BookRepository;
import com.bankov.bookstorebackend.util.images.ImageUtils;
import com.bankov.bookstorebackend.util.images.uploaders.AuthorImageUploader;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.ServletContext;
import javax.transaction.Transactional;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

@Service
@Transactional
public class AuthorService {
    private final AuthorRepository repository;
    private final BookRepository bookRepository;
    private final ServletContext servletContext;

    @Value("${CLOUDINARY_URL}")
    private String cloudinaryURL;


    public AuthorService(AuthorRepository repository, BookRepository bookRepository, ServletContext servletContext) {
        this.repository = repository;
        this.bookRepository = bookRepository;
        this.servletContext = servletContext;
    }

    public ResponseEntity<Page<Author>> getAllAuthorsPaginated(String searchQuery, int page, int size, String sortBy, boolean ascending) {

        if (searchQuery == null || searchQuery.equals(""))
            return ResponseEntity.ok().body(findAllPaginated(page, size, sortBy, ascending));
        else
            return ResponseEntity.ok().body(searchAllPaginated(searchQuery, page, size, sortBy, ascending));
    }

    private Page<Author> findAllPaginated(int page, int size, String sortBy, boolean ascending) {
        if (ascending) {
            return repository.findAll(PageRequest.of(page, size, Sort.by(sortBy).ascending()));
        } else {
            return repository.findAll(PageRequest.of(page, size, Sort.by(sortBy).descending()));
        }
    }

    private Page<Author> searchAllPaginated(String query, int page, int size, String sortBy, boolean ascending) {
        if (ascending) {
            return repository.findAllByNameContainsIgnoreCase(
                    query, PageRequest.of(page, size, Sort.by(sortBy).ascending()));
        } else {
            return repository.findAllByNameContainsIgnoreCase(
                    query, PageRequest.of(page, size, Sort.by(sortBy).descending()));
        }

    }

    public ResponseEntity<Author> findAuthorById(Long id) {
        return ResponseEntity.of(findById(id));
    }

    private Optional<Author> findById(Long id) {
        return repository.findById(id);
    }

    @SneakyThrows(IOException.class)
    public ResponseEntity<Author> createAuthor(Author author, MultipartFile file) {
        if (file != null && !ImageUtils.isImageFileBasedOnServletContext(file, servletContext)) {
            throw new FileIsNotImageException("image", "File must be of type JPG/JPEG/PNG");
        }

        Author newAuthor = create(author, file);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(author.getId()).toUri();

        return ResponseEntity.created(location).body(newAuthor);
    }

    private Author create(Author author, MultipartFile image) throws IOException {
        if (image != null) {
            AuthorImageUploader imageUploader = new AuthorImageUploader(cloudinaryURL);
            String uploadedImageUrl = imageUploader.uploadNewImage(image);
            author.setImageURL(uploadedImageUrl);

        }
        return repository.save(author);
    }

    @SneakyThrows(IOException.class)
    public ResponseEntity<Author> updateAuthor(Long id, Author updatedAuthor, MultipartFile file) {
        if (file != null && !ImageUtils.isImageFileBasedOnServletContext(file, servletContext)) {
            throw new FileIsNotImageException("image", "File must be of type JPG/JPEG/PNG");
        }

        return ResponseEntity.of(update(id, updatedAuthor, file));
    }

    private Optional<Author> update(Long id, Author updatedAuthor, MultipartFile image) throws IOException {

        Optional<Author> optionalAuthor = repository.findById(id);

        if (optionalAuthor.isPresent()) {
            Author currentAuthor = optionalAuthor.get();
            currentAuthor.replaceWithButKeepAuthorImage(updatedAuthor);

            if (image != null) {
                AuthorImageUploader authorImageUploader = new AuthorImageUploader(cloudinaryURL);
                String uploadedImageURL = authorImageUploader.updateImage(image, currentAuthor.getImageURL());
                currentAuthor.setImageURL(uploadedImageURL);
            }

            repository.save(currentAuthor);

        }

        return optionalAuthor;
    }

    public ResponseEntity<Author> deleteAuthor(Long id) {
        try {
            delete(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    private void delete(Long id) {
        repository.findById(id).map(author -> {
            bookRepository.deleteAllByAuthor(author);
            repository.delete(author);
            return author;
        }).orElseThrow(() -> new IllegalArgumentException("No author with this ID"));
    }
}
