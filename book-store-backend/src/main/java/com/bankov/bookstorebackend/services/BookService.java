package com.bankov.bookstorebackend.services;


import com.bankov.bookstorebackend.DTOs.BookRequestDTO;
import com.bankov.bookstorebackend.exceptions.FileIsNotImageException;
import com.bankov.bookstorebackend.exceptions.ResourceNotFoundException;
import com.bankov.bookstorebackend.models.Author;
import com.bankov.bookstorebackend.models.Book;
import com.bankov.bookstorebackend.repositories.AuthorRepository;
import com.bankov.bookstorebackend.repositories.BookRepository;
import com.bankov.bookstorebackend.util.images.uploaders.BookImageUploader;
import lombok.SneakyThrows;
import org.jetbrains.annotations.NotNull;
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
import java.util.Objects;
import java.util.Optional;

import static com.bankov.bookstorebackend.util.images.ImageUtils.isImageFileBasedOnServletContext;

@Service
@Transactional
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    private final ServletContext servletContext;

    @Value("${CLOUDINARY_URL}")
    private String cloudinaryURL;

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository, ServletContext servletContext) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.servletContext = servletContext;
    }

    public ResponseEntity<Page<Book>> getAllBooksPaginated(String searchQuery, int page, int size, String sortBy, boolean ascending) {
        if (searchQuery == null || searchQuery.equals("")) {
            return ResponseEntity.ok().body(findAllPaginated(page, size, sortBy, ascending));
        } else {
            return ResponseEntity.ok().body(searchAllPaginated(searchQuery, page, size, sortBy, ascending));
        }
    }

    private Page<Book> findAllPaginated(int page, int size, String sortBy, boolean ascending) {
        if (ascending) {
            return bookRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy).ascending()));
        } else {
            return bookRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy).descending()));
        }

    }

    private Page<Book> searchAllPaginated(String searchQuery, int page, int size, String sortBy, boolean ascending) {
        if (ascending) {
            return bookRepository.findAllByTitleContainsIgnoreCaseOrAuthor_NameContainsIgnoreCase(
                    searchQuery, searchQuery, PageRequest.of(page, size, Sort.by(sortBy).ascending()));
        } else {
            return bookRepository.findAllByTitleContainsIgnoreCaseOrAuthor_NameContainsIgnoreCase(
                    searchQuery, searchQuery, PageRequest.of(page, size, Sort.by(sortBy).descending()));
        }
    }

    public ResponseEntity<Book> getBookById(Long id) {
        return ResponseEntity.of(findById(id));
    }

    private Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    @SneakyThrows(IOException.class)
    public ResponseEntity<Book> createBook(BookRequestDTO book, MultipartFile file) {
        if (file != null && !isImageFileBasedOnServletContext(file, servletContext))
            throw new FileIsNotImageException("image", "File must be of type JPG/JPEG/PNG");

        Book newBook = create(book, file);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newBook.getId()).toUri();
        return ResponseEntity.created(location).body(newBook);
    }

    private Book create(BookRequestDTO book, MultipartFile image) throws IOException {
        Long authorId = book.getAuthorId();
        Book newBook = book.toBook();
        if (authorId != null) {
            Author bookAuthor = authorRepository.findById(authorId)
                    .orElseThrow(() -> new ResourceNotFoundException("authorId", "There is no author with this ID"));
            newBook.setAuthor(bookAuthor);
        }

        if (image != null) {
            BookImageUploader imageUploader = new BookImageUploader(cloudinaryURL);
            String uploadedImageUrl = imageUploader.uploadNewImage(image);
            newBook.setCoverArtURL(uploadedImageUrl);

        }
        bookRepository.save(newBook);
        return newBook;
    }

    @SneakyThrows(IOException.class)
    public ResponseEntity<Book> updateBook(Long id, BookRequestDTO newBook, MultipartFile image) {
        if (image != null && !isImageFileBasedOnServletContext(image, servletContext))
            throw new FileIsNotImageException("image", "File must be of type JPG/JPEG/PNG");
        return ResponseEntity.of(update(id, newBook, image));
    }

    private Optional<Book> update(Long id, BookRequestDTO newBook, MultipartFile image) throws IOException {

        Optional<Book> optionalBook = bookRepository.findById(id);

        if (optionalBook.isPresent()) {
            Book updatedBook = updateBookFieldsWithBookDTO(newBook, optionalBook.get());

            if (image != null) {
                BookImageUploader imageUploader = new BookImageUploader(cloudinaryURL);
                String uploadedImageUrl = imageUploader.updateImage(image, updatedBook.getCoverArtURL());
                updatedBook.setCoverArtURL(uploadedImageUrl);
            }

            bookRepository.save(updatedBook);
        }

        return optionalBook;
    }

    @NotNull
    private Book updateBookFieldsWithBookDTO(BookRequestDTO newBook, Book currentBook) {
        if (!Objects.equals(newBook.getAuthorId(), currentBook.getAuthor().getId())) {
            Author bookAuthor = authorRepository.findById(newBook.getAuthorId())
                    .orElseThrow(() -> new ResourceNotFoundException("authorId", "There is no author with this ID"));
            currentBook.setAuthor(bookAuthor);
        }
        currentBook.replaceWithButKeepCoverArt(newBook.toBook());

        return currentBook;
    }

    public ResponseEntity<Book> deleteBook(Long id) {
        delete(id);
        return ResponseEntity.noContent().build();
    }

    private void delete(Long id) {
        bookRepository.deleteById(id);
    }

    private boolean isNotImageFile(MultipartFile file) {
        return !servletContext.getMimeType(file.getOriginalFilename()).startsWith("image/");
    }
}
