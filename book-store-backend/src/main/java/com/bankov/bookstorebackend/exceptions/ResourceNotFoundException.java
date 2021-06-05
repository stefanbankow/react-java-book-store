package com.bankov.bookstorebackend.exceptions;

import org.springframework.validation.BindException;

public class ResourceNotFoundException extends RuntimeException {

    private final String resourceField;

    public ResourceNotFoundException() {
        super();
        resourceField = null;
    }

    public ResourceNotFoundException(String resourceField, String message) {
        super(message);
        this.resourceField = resourceField;
    }

    public ResourceNotFoundException(String resourceField, String message, Throwable cause) {
        super(message, cause);
        this.resourceField = resourceField;
    }

    public String getResourceField() {
        return resourceField;
    }
}
