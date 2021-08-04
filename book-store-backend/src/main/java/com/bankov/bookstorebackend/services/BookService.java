package com.bankov.bookstorebackend.services;


import com.bankov.bookstorebackend.DTOs.CreateBookForm;
import com.bankov.bookstorebackend.exceptions.FileIsNotImageException;
import com.bankov.bookstorebackend.exceptions.ResourceNotFoundException;
import com.bankov.bookstorebackend.models.Author;
import com.bankov.bookstorebackend.models.Book;
import com.bankov.bookstorebackend.repositories.AuthorRepository;
import com.bankov.bookstorebackend.repositories.BookRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
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
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

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
    public ResponseEntity<Book> createBook(CreateBookForm book, MultipartFile file) {
        if (file != null && isNotImageFile(file))
            throw new FileIsNotImageException("image", "File must be of type JPG/JPEG/PNG");
        Book newBook = create(book, file);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newBook.getId()).toUri();
        return ResponseEntity.created(location).body(newBook);
    }

    private Book create(CreateBookForm book, MultipartFile image) throws IOException {
        Long authorId = book.getAuthorId();
        Book newBook = book.toBook();
        if (authorId != null) {
            Author bookAuthor = authorRepository.findById(authorId)
                    .orElseThrow(() -> new ResourceNotFoundException("authorId", "There is no author with this ID"));
            newBook.setAuthor(bookAuthor);
        }

        if (image != null) {
            Cloudinary cloudinary = new Cloudinary(cloudinaryURL);

            File imageFile = File.createTempFile("image", image.getOriginalFilename());
            image.transferTo(imageFile);

            @SuppressWarnings("rawtypes")
            Map imageResponse = cloudinary.uploader().upload(imageFile, ObjectUtils.asMap("folder", "book_covers"));

            newBook.setCoverArtURL(imageResponse.get("url").toString());
        }
        bookRepository.save(newBook);
        return newBook;
    }

    @SneakyThrows
    public ResponseEntity<Book> updateBook(Long id, CreateBookForm newBook, MultipartFile image) {
        if (image != null && isNotImageFile(image))
            throw new FileIsNotImageException("image", "File must be of type JPG/JPEG/PNG");
        return ResponseEntity.of(update(id, newBook, image));
    }

    private Optional<Book> update(Long id, CreateBookForm newBook, MultipartFile image) throws IOException {

        Optional<Book> optionalBook = bookRepository.findById(id);


        if (optionalBook.isPresent()) {
            Book bookObj = optionalBook.get();
            String oldCoverArtURL = bookObj.getCoverArtURL();
            if (!Objects.equals(newBook.getAuthorId(), bookObj.getAuthor().getId())) {
                Author bookAuthor = authorRepository.findById(newBook.getAuthorId())
                        .orElseThrow(() -> new ResourceNotFoundException("authorId", "There is no author with this ID"));
                bookObj.setAuthor(bookAuthor);
            }
            bookObj.updateWith(newBook.toBook());


            //!!!!Have to manually set the old URL again since the request DTO
            //does not include a field for the coverArtURL and creates a book object without it
            bookObj.setCoverArtURL(oldCoverArtURL);


            if (image != null) {
                Cloudinary cloudinary = new Cloudinary(cloudinaryURL);

                if (oldCoverArtURL != null) {
                    try {
                        cloudinary.api().deleteAllResources(ObjectUtils.asMap("url", bookObj.getCoverArtURL()));
                    } catch (Exception e) {
                        throw new IOException(e.getMessage());
                    }
                }

                File imageFile = File.createTempFile("image", image.getOriginalFilename());
                image.transferTo(imageFile);

                @SuppressWarnings("rawtypes")
                Map imageResponse = cloudinary.uploader().upload(imageFile, ObjectUtils.asMap("folder", "book_covers"));
                bookObj.setCoverArtURL(imageResponse.get("url").toString());
            }

            bookRepository.save(bookObj);
        }

        return optionalBook;
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
