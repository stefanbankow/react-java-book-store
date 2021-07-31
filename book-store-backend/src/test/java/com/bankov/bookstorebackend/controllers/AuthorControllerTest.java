package com.bankov.bookstorebackend.controllers;

import com.bankov.bookstorebackend.models.Author;
import com.bankov.bookstorebackend.services.AuthorService;
import com.bankov.bookstorebackend.services.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthorController.class)
public class AuthorControllerTest {
    Author AUTHOR_1 = new Author(1L, "Author 1", "Description of Author 1",
            null, 1990, null);
    Author AUTHOR_2 = new Author(2L, "Author 2", "This description is longer",
            null, 1870, 1944);

    Author newAuthor = Author.builder().id(3L)
            .name("New Author")
            .description("Description of author created with POST request")
            .imageURL(null)
            .yearBorn(1984)
            .yearOfDeath(null)
            .build();

    Author updatedAuthor = Author.builder().id(2L)
            .name("Updated Author")
            .description("Updated desc")
            .imageURL(null)
            .yearBorn(2000)
            .yearOfDeath(null)
            .build();
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper mapper;
    @MockBean
    private AuthorService authorService;
    @MockBean
    @SuppressWarnings("unused")
    //This is required in order to generate the right context
    private BookService bookService;

    @Test
    public void getAuthorsSortedById_success() throws Exception {
        List<Author> authors = new ArrayList<>(Arrays.asList(AUTHOR_1, AUTHOR_2));
        ResponseEntity<Page<Author>> authorsPage = ResponseEntity.ok().body(new PageImpl<>(authors));

        Mockito
                .when(authorService.getAllAuthorsPaginated(null, 0, 24, "id", false))
                .thenReturn(authorsPage);

        mockMvc.perform(get("/api/store/authors")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[1].name", is("Author 2")))
                .andExpect(jsonPath("$.content[1].description", is("This description is longer")))
                .andExpect(jsonPath("$.content[0].imageURL", emptyOrNullString()))
                .andExpect(jsonPath("$.content[0].yearBorn", is(1990)))
                .andExpect(jsonPath("$.content[0].yearOfDeath", emptyOrNullString()))
                .andExpect(jsonPath("$.content[0].*", hasSize(6)));
    }

    @Test
    public void searchAuthorsSortedById_success() throws Exception {
        List<Author> authors = new ArrayList<>(List.of(AUTHOR_2));
        ResponseEntity<Page<Author>> authorsPage = ResponseEntity.ok().body(new PageImpl<>(authors));

        Mockito.when(authorService.getAllAuthorsPaginated("Author 2", 0, 24, "id", false))
                .thenReturn(authorsPage);

        mockMvc.perform(get("/api/store/authors/?search=Author 2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(1)))
                .andExpect(jsonPath("$.content[0].name", is("Author 2")))
                .andExpect(jsonPath("$.content[0].description", is("This description is longer")));

    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"create:authors"})
    public void createAuthor_success() throws Exception {
        Mockito.when(authorService.createAuthor(newAuthor))
                .thenReturn(ResponseEntity.created(URI.create("/api/store/authors/3")).body(newAuthor));

        mockMvc.perform(post("/api/store/authors")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(newAuthor)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name", is("New Author")))
                .andExpect(jsonPath("$.description", is("Description of author created with POST request")))
                .andExpect(jsonPath("$.imageURL", emptyOrNullString()))
                .andExpect(jsonPath("$.yearBorn", is(1984)))
                .andExpect(jsonPath("$.yearOfDeath", emptyOrNullString()))
                .andExpect(jsonPath("$.*", hasSize(6)));
    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"create:authors"})
    public void createAuthor_badRequest() throws Exception {
        Author badRequestAuthor = newAuthor;
        badRequestAuthor.setName(null);
        Mockito.when(authorService.createAuthor(badRequestAuthor))
                .thenReturn(ResponseEntity.created(URI.create("api/store/authors/3")).body(badRequestAuthor));

        mockMvc.perform(post("/api/store/authors")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(badRequestAuthor)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.name", is("Author must have a name")));
    }

    @Test
    public void createAuthor_isUnauthorized() throws Exception {
        Mockito.when(authorService.createAuthor(newAuthor))
                .thenReturn(ResponseEntity.created(URI.create("api/store/authors/3")).body(newAuthor));

        mockMvc.perform(post("/api/store/authors")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(newAuthor)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser("user_test")
    public void createAuthor_isForbidden() throws Exception {
        Mockito.when(authorService.createAuthor(newAuthor))
                .thenReturn(ResponseEntity.created(URI.create("api/store/authors/3")).body(newAuthor));

        mockMvc.perform(post("/api/store/authors")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(newAuthor)))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"update:authors"})
    public void updateAuthor_success() throws Exception {
        Mockito.when(authorService.updateAuthor(2L, updatedAuthor))
                .thenReturn(ResponseEntity.of(Optional.of(updatedAuthor)));

        mockMvc.perform(patch("/api/store/authors/2")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(updatedAuthor)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Updated Author")))
                .andExpect(jsonPath("$.description", is("Updated desc")))
                .andExpect(jsonPath("$.imageURL", emptyOrNullString()))
                .andExpect(jsonPath("$.yearBorn", is(2000)))
                .andExpect(jsonPath("$.yearOfDeath", emptyOrNullString()))
                .andExpect(jsonPath("$.*", hasSize(6)));


    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"update:authors"})
    public void updateAuthor_badRequest() throws Exception {
        Author badRequestAuthor = updatedAuthor;
        badRequestAuthor.setName(null);
        Mockito.when(authorService.updateAuthor(2L, updatedAuthor))
                .thenReturn(ResponseEntity.of(Optional.of(updatedAuthor)));

        mockMvc.perform(patch("/api/store/authors/2")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(updatedAuthor)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.name", is("Author must have a name")));
    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"update:authors"})
    public void updateAuthor_invalidId() throws Exception {
        Mockito.when(authorService.updateAuthor(4L, updatedAuthor))
                .thenReturn(ResponseEntity.of(Optional.empty()));

        mockMvc.perform(patch("/api/store/authors/4")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(updatedAuthor)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser("user_test")
    public void updateAuthor_isForbidden() throws Exception {
        Mockito.when(authorService.updateAuthor(2L, updatedAuthor))
                .thenReturn(ResponseEntity.of(Optional.of(updatedAuthor)));

        mockMvc.perform(patch("/api/store/authors/2")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(updatedAuthor)))
                .andExpect(status().isForbidden());
    }

    @Test
    public void updateAuthor_isUnauthorized() throws Exception {
        Mockito.when(authorService.updateAuthor(2L, updatedAuthor))
                .thenReturn(ResponseEntity.of(Optional.of(updatedAuthor)));

        mockMvc.perform(patch("/api/store/authors/2")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(updatedAuthor)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "admin_test", authorities = {"delete:authors"})
    public void deleteAuthor_success() throws Exception {

        Mockito.when(authorService.deleteAuthor(2L)).thenReturn(ResponseEntity.noContent().build());

        mockMvc.perform(delete("/api/store/authors/2")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @Test
    public void deleteAuthor_isUnauthorized() throws Exception {
        mockMvc.perform(delete("/api/store/authors/2")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser("user_test")
    public void deleteAuthor_isForbidden() throws Exception {
        mockMvc.perform(delete("/api/store/authors/2")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isForbidden());
    }
}
