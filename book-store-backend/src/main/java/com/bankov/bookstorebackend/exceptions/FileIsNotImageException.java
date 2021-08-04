package com.bankov.bookstorebackend.exceptions;

public class FileIsNotImageException extends RuntimeException {
    private final String field;

    public FileIsNotImageException(String field) {
        this.field = field;
    }

    public FileIsNotImageException(String field, String message) {
        super(message);
        this.field = field;
    }

    public String getField() {
        return field;
    }
}
